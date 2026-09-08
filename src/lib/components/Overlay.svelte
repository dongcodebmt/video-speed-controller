<script lang="ts">
  import { onMount } from 'svelte';
  import { SpeedLoopIcon, MinusIcon, PlusIcon, ResetIcon } from '$lib/icons';
  import { Action } from '$lib/types';
  import { debounce, styleObjectToString, formatRate } from '$lib/utils';
  import { t } from '$lib/stores';
  import styles from './Overlay.module.css';

  export interface OverlayProps {
    video: HTMLVideoElement;
    handler: (action: Action) => void;
    style: () => Record<string, any>;
  }

  let { video, handler, style }: OverlayProps = $props();

  let rate = $state(1.0);
  let active = $state(false);
  let styleState = $state({});

  /** Deactivate the overlay 1 s after the last rate change. Created once so debounce works correctly. */
  const scheduleDeactivate = debounce(() => {
    active = false;
  }, 1000);

  onMount(() => {
    const handleRateChange = () => {
      rate = video.playbackRate;
      active = true;
      scheduleDeactivate();
    };
    const changeStyle = async () => {
      styleState = await style();
    };

    // Change style on video reszize
    const resizeObserver = new ResizeObserver(changeStyle);
    resizeObserver.observe(video);

    // Change style on video source change
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
          changeStyle();
        }
      }
    });
    observer.observe(video, { attributes: true });

    video.addEventListener('ratechange', handleRateChange);

    return () => {
      resizeObserver.disconnect();
      observer.disconnect();
      video.removeEventListener('ratechange', handleRateChange);
    };
  });



  const stop = (e: MouseEvent): void => {
    e.stopPropagation();
    e.preventDefault();
  };

  const increase = (e: MouseEvent): void => {
    stop(e);
    handler(Action.Increase);
  };
  const decrease = (e: MouseEvent): void => {
    stop(e);
    handler(Action.Decrease);
  };
  const reset = (e: MouseEvent): void => {
    stop(e);
    handler(Action.Reset);
  };
</script>

<div class={styles['overlay-wrapper']}>
  <div 
    class="{styles.overlay} {active ? styles.active : ''}" 
    style={styleObjectToString(styleState)}
  >
    <div class={styles['overlay-text']}>
      <div class={styles['overlay-icon']}>
        <SpeedLoopIcon width={18} height={18} color="white" />
      </div>
      <div class={styles['overlay-rate']}>
        <span>{formatRate(rate)}</span>
      </div>
    </div>

    <div class={styles['overlay-controls']}>
      <button
        class={styles['overlay-button']}
        onclick={decrease}
        ondblclick={stop}
        aria-label={$t('aria.decrease_speed')}
      >
        <MinusIcon width={14} height={14} color="white" />
      </button>

      <button
        class={styles['overlay-button']}
        onclick={reset}
        ondblclick={stop}
        aria-label={$t('aria.reset_speed')}
      >
        <ResetIcon width={14} height={14} color="white" />
      </button>

      <button
        class={styles['overlay-button']}
        onclick={increase}
        ondblclick={stop}
        aria-label={$t('aria.increase_speed')}
      >
        <PlusIcon width={14} height={14} color="white" />
      </button>
    </div>
  </div>
</div>
