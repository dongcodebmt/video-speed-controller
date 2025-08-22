// ==UserScript==
// @name         Video Speed Controller
// @namespace    https://dongdev.com/
// @version      1.0.1
// @description  Adjust and remember video speed using keyboard shortcuts
// @author       github@dongcodebmt
// @match        *://*/*
// @exclude      *://*.twitch.tv/*
// @run-at       document-start
// @icon         https://raw.githubusercontent.com/dongcodebmt/video-speed-controller/main/docs/icon.png
// @license      MIT
// @supportURL   https://github.com/dongcodebmt/video-speed-controller/issues
// @updateURL    https://raw.githubusercontent.com/dongcodebmt/video-speed-controller/main/script.meta.js
// @downloadURL  https://raw.githubusercontent.com/dongcodebmt/video-speed-controller/main/script.user.js
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';

  GM_addStyle(`
      .dd_video_speed_overlay {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 9999;
        background: rgba(0,0,0,0.6);
        color: white;
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 13px;
        font-family: monospace;
        opacity: 0;
        transition: 1s;
      }

      .dd_video_speed_overlay:hover {
        opacity: 1;
      }

      .dd_video_speed_overlay_active {
        opacity: 1;
      }

      .dd_video_speed_wrapper {
        position: relative;
        height: 100%;
        width: auto;
      }
  `);

  const config = {
    delta: 0.5,
    key: {
      decrease: 's',
      increase: 'd',
      reset: 'r'
    },
    storageKey: 'dd_video_speed',
    currentSpeed: null
  };
  let videoEl = null;

  document.addEventListener('playing', handlePlaying, { capture: true });
  document.addEventListener('play', handlePlay, true);
  document.addEventListener('keydown', handleKeydown);

  function handlePlaying() {
    const el = videoEl;
    const rate = getRate();
    setPlaybackRate(el, rate);
  }

  function handlePlay(e) {
    videoEl = e.target;
  }

  function handleKeydown(e) {
    const tag = e.target.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
    const key = e.key.toLowerCase();
    const el = videoEl;
    let rate = 1.0;

    switch (key) {
      case config.key.decrease:
        rate = getPlaybackRate(el, -1 * config.delta);
        break;
      case config.key.increase:
        rate = getPlaybackRate(el, config.delta);
        break;
      case config.key.reset:
        rate = 1.0;
        break;
      default:
        return;
    }
    setPlaybackRate(el, rate);
  }

  function setPlaybackRate(el, rate) {
    if (!el) return;
    if (el.playbackRate === rate) return;
    el.playbackRate = rate;
    setRate(rate);
    updateOverlay(el, rate);
  }

  function getPlaybackRate(el, delta) {
    if (!el) 1.0;
    return Math.max(0.1, Math.min(el.playbackRate + delta, 16));
  }

  function setRate(rate) {
    config.currentSpeed = rate;
    localStorage.setItem(config.storageKey, rate.toString());
  }

  function getRate() {
    if (config.currentSpeed) return config.currentSpeed;
    const saved = parseFloat(localStorage.getItem(config.storageKey));
    return isNaN(saved) ? 1.0 : saved;
  }

  function updateOverlay(el, rate) {
    const overlay = createOverlay(el);
    overlay.textContent = `🚀 ${rate.toFixed(1)}x`;
    overlay.classList.add('dd_video_speed_overlay_active');

    clearTimeout(overlay._timeout);
    overlay._timeout = setTimeout(() => {
      overlay.classList.remove('dd_video_speed_overlay_active');
    }, 2000);
  }

  function createOverlay(el) {
    if (el._overlay) return el._overlay;

    const overlay = document.createElement('div');
    overlay.classList.add('dd_video_speed_overlay');

    const wrapper = document.createElement('div');
    wrapper.classList.add('dd_video_speed_wrapper');

    const parent = el.parentElement;
    if (!parent) return overlay;
    parent.insertBefore(wrapper, el);
    wrapper.appendChild(el);
    wrapper.appendChild(overlay);

    el._overlay = overlay;
    return overlay;
  }
})();