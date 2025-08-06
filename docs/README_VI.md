[English](README.md) | **Tiếng Việt**

# 🎬 Video Speed Controller

Một script giúp bạn **tăng/giảm tốc độ phát video** trên bất kỳ trang web nào chỉ bằng phím tắt.

## ✨ Tính năng

- ⏩ Tăng/Giảm tốc độ phát video bằng phím `D` / `S`
- 🔁 Đặt lại tốc độ về mặc định (1.0x) bằng phím `R`
- 💾 **Tự động lưu tốc độ hiện tại** vào `localStorage`
- 📺 **Hiển thị tốc độ video** dưới dạng overlay mờ đẹp mắt
- ⚙️ Hỗ trợ tất cả các website có sử dụng tag `<video>`, bao gồm YouTube, Facebook...

## ⌨️ Phím tắt

| Phím  | Chức năng              |
|-------|------------------------|
| `D`   | Tăng tốc độ +0.5x      |
| `S`   | Giảm tốc độ -0.5x      |
| `R`   | Đặt lại tốc độ = 1.0x  |

> **Lưu ý**: Không hoạt động nếu bạn đang gõ trong input/textarea.

## 🧠 Lưu tốc độ thông minh

- Mỗi khi bạn thay đổi tốc độ, script sẽ **lưu vào localStorage**.
- Khi bạn **tải lại trang**, tốc độ đã lưu sẽ **tự động được áp dụng** cho tất cả video trên trang.

## 🖼 Overlay trên video

- Hiển thị tốc độ hiện tại ở góc trên bên trái video.
- Tự động ẩn sau 2 giây để không làm phiền trải nghiệm xem.

## 🛠 Cài đặt

1. Cài extension [ScriptCat](https://docs.scriptcat.org/) hoặc [Tampermonkey](https://www.tampermonkey.net/) cho trình duyệt.
2. Tạo một script mới.
3. Dán toàn bộ mã từ [script.user.js](https://raw.githubusercontent.com/dongcodebmt/video-speed-controller/main/script.user.js) vào.
4. Lưu lại và thử mở một video bất kỳ để trải nghiệm.

## 📦 Tương thích

- ✅ YouTube
- ✅ Facebook
- ✅ Các trang có tag `<video>`

## 📝 License

MIT License – dùng thoải mái, nhớ giữ credit nếu chia sẻ lại 💖

---

### © 2025 - Script by dongcodebmt ✨
