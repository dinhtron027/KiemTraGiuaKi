# BÀI THI THỰC HÀNH GIỮA KỲ – HỌC PHẦN LẬP TRÌNH WEB (020100138304)
## DỰ ÁN: WEBSITE HỒ SƠ CÁ NHÂN / MINI PORTFOLIO

- **Trường:** Đại học Gia Định (GDU) - Khoa Công nghệ Thông tin
- **Học phần:** Lập trình Web (Mã HP: 020100138304)
- **Họ và tên sinh viên:** Đinh Trọng
- **Mã số sinh viên (MSSV):** 25150716
- **Email:** cutrong236@gmail.com
- **Repository GitHub:** [https://github.com/dinhtron027/KiemTraGiuaKi.git](https://github.com/dinhtron027/KiemTraGiuaKi.git)

---

## 1. MỤC TIÊU DỰ ÁN

Xây dựng website **Hồ sơ cá nhân (Personal Portfolio)** hoàn chỉnh, thể hiện đầy đủ các kỹ năng và kiến thức đã tích lũy từ Chương 1 đến Chương 5 của học phần Lập trình Web (14113015):
1. **HTML5 Semantic**: Cấu trúc rõ ràng, chuẩn ngữ nghĩa, đầy đủ accessibility.
2. **CSS3 & SCSS**: Viết mã nguồn bằng SCSS (biến, nesting, mixin, box-model), responsive mobile-first với 2 breakpoint.
3. **JavaScript Cơ bản**: Render danh sách kỹ năng từ mảng object tĩnh (áp dụng `map()`, `filter()`, DOM `createElement`, `textContent`), validate form liên hệ với `addEventListener("submit", ...)`.
4. **JavaScript Nâng cao**: Tải dữ liệu dự án từ `js/data.json` qua `fetch()` kết hợp `async/await`, xử lý lỗi an toàn bằng `try/catch`, chuyển đổi Dark Mode và lưu trạng thái bền vững trên `LocalStorage`.
5. **Quy trình & Trình bày**: Quản lý phiên bản bài bản bằng Git với tối thiểu 4-5 commit rõ ràng, không có lỗi trong Console (F12).

---

## 2. CÔNG NGHỆ SỬ DỤNG

- **HTML5:** Semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<table>`, `<footer>`), Form controls (`text`, `email`, `tel`, `date`, `textarea`).
- **SCSS / CSS3:** SASS Preprocessor, CSS Flexbox, CSS Grid, Media Queries (Mobile-first: 768px, 1024px), CSS Custom Properties / Theme Classes.
- **JavaScript Vanilla (ES6+):** Arrow functions, Template literals, DOM Manipulation (`createElement`, `textContent`), Array methods (`map`, `filter`, `forEach`), Fetch API, `async/await`, `try/catch`, LocalStorage API.
- **Công cụ phát triển & triển khai:** Visual Studio Code, Live Server, Git / GitHub.

---

## 3. CẤU TRÚC THƯ MỤC DỰ ÁN

```text
my-website/ (BaiTapGk/)
│
├── index.html          # Trang chủ chính chuẩn Semantic HTML5
│
├── css/
│   ├── style.scss      # File nguồn SCSS (biến, nesting, mixin, mobile-first)
│   └── style.css       # File CSS đã biên dịch thực tế (liên kết vào index.html)
│
├── js/
│   ├── script.js       # Xử lý toàn bộ logic JS (Render, Form, Fetch, Theme)
│   └── data.json       # File JSON dữ liệu dự án cho Phần 4
│
├── assets/
│   └── avatar.svg      # Ảnh minh họa đại diện lập trình viên
│
├── README.md           # Tài liệu hướng dẫn sử dụng và báo cáo bài làm
│
└── .git/               # Lịch sử commit Git theo từng phần yêu cầu
```

---

## 4. CÁC TÍNH NĂNG NỔI BẬT ĐÃ TRIỂN KHAI

### 4.1. Cấu trúc Semantic & Giao diện Responsive (Chương 1 & 2)
- Khung trang chuẩn: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<table cellpadding>`, `<footer>`.
- Navbar linh hoạt bằng **Flexbox**, tự động chuyển sang menu **Hamburger** mượt mà trên màn hình điện thoại (< 768px).
- Bố cục danh sách kỹ năng và dự án sử dụng **CSS Grid** hiện đại, tự động co giãn từ 1 cột (Mobile) sang 2 cột (Tablet) và 3 cột (Desktop).
- Toàn bộ hình ảnh có thuộc tính `alt` mô tả đầy đủ; các input đều có `label for` tương ứng đảm bảo chuẩn Accessibility.
- Áp dụng `box-sizing: border-box` toàn cục, hiệu ứng hover chuyển động mượt mà.

### 4.2. Xử lý Dữ liệu Kỹ năng & Validate Form (Chương 3)
- Mảng object dữ liệu tĩnh `skills` lưu trữ tên, mức độ và nhóm kỹ năng.
- Sử dụng phương thức `filter()` để lọc kỹ năng theo từng danh mục (Tất cả, Frontend, Programming, Tools) khi nhấn nút tab.
- Sử dụng phương thức `map()` để chuẩn hóa dữ liệu và dùng `document.createElement()` cùng `textContent` để chèn vào DOM (chống tấn công XSS). Không hardcode trong HTML.
- Bắt sự kiện submit form bằng `form.addEventListener("submit", ...)`, ngăn tải lại trang bằng `preventDefault()`.
- Validate đầy đủ:
  - Họ và tên: Tối thiểu 2 ký tự, không rỗng.
  - Email: Chuẩn định dạng email regex.
  - Số điện thoại: Chuẩn đầu số nhà mạng Việt Nam (`03, 05, 07, 08, 09`).
  - Ngày liên hệ: Ràng buộc chọn từ ngày hôm nay trở đi.
  - Nội dung: Tối thiểu 10 ký tự.
- Hiển thị thông báo phản hồi (thành công / lỗi) chi tiết, tự động xóa lỗi khi người dùng nhập lại và reset form khi gửi thành công.

### 4.3. Đọc dữ liệu Fetch API & Dark Mode LocalStorage (Chương 4)
- Viết hàm bất đồng bộ `loadProjects` sử dụng `fetch("js/data.json")` và `async/await`.
- Kiểm tra chặt chẽ `response.ok` trước khi gọi `response.json()`.
- Đọc và render danh sách card dự án động lên DOM.
- Xử lý ngoại lệ toàn diện bằng khối `try/catch`: Ghi nhận lỗi bằng `console.error` và hiển thị cảnh báo thân thiện trên giao diện, giữ cho website không bị crash.
- Chế độ **Dark Mode / Light Mode**:
  - Nút bấm trực quan với biểu tượng 🌙/☀️ và tên chế độ.
  - Lưu trạng thái vào `localStorage` với key `portfolio-theme`.
  - Tự động kiểm tra và áp dụng giao diện đã lưu ngay khi người dùng mở hoặc F5 tải lại trang.

---

## 5. HƯỚNG DẪN KHỞI CHẠY & KIỂM THỬ

### 5.1. Khởi chạy bằng Live Server (Bắt buộc để tránh lỗi CORS)
> **Lưu ý quan trọng:** Không mở file `index.html` trực tiếp bằng cách nhấp đúp chuột (giao thức `file://`), vì trình duyệt sẽ chặn Fetch API đọc file `data.json` theo chính sách bảo mật CORS.

**Các bước thực hiện:**
1. Mở thư mục dự án trong Visual Studio Code.
2. Cài đặt extension **Live Server** (của tác giả Ritwick Dey) nếu chưa có.
3. Nhấp chuột phải vào file `index.html` -> Chọn **"Open with Live Server"** (hoặc tổ hợp phím `Alt + L, Alt + O`).
4. Trình duyệt sẽ tự động mở trang web tại địa chỉ: `http://127.0.0.1:5500/index.html` (hoặc cổng tương ứng).
5. Mở Developer Tools (**F12** hoặc `Ctrl + Shift + I`), kiểm tra tab **Console** để xác nhận không có lỗi màu đỏ.

### 5.2. Hướng dẫn Biên dịch SCSS sang CSS
Nếu bạn muốn chỉnh sửa giao diện trong file `css/style.scss`:

- **Cách 1: Sử dụng Sass CLI (Terminal)**
  ```bash
  sass css/style.scss css/style.css
  ```
  *(Để tự động theo dõi và biên dịch khi lưu file: `sass --watch css/style.scss:css/style.css`)*

- **Cách 2: Sử dụng VS Code Extension**
  - Cài đặt extension **Live Sass Compiler** (Glenn Marks).
  - Mở file `style.scss` và nhấp vào nút **"Watch Sass"** ở thanh trạng thái góc dưới VS Code.

---

## 6. LỊCH SỬ COMMIT GIT THỰC TẾ

Repository đã được khởi tạo và commit đầy đủ theo từng giai đoạn làm bài:
1. `feat: create semantic HTML5 portfolio structure` (Hoàn thiện Phần 1)
2. `style: implement responsive SCSS layout` (Hoàn thiện Phần 2)
3. `feat: render skills and validate contact form` (Hoàn thiện Phần 3)
4. `feat: load projects with fetch and persist dark mode` (Hoàn thiện Phần 4)
5. `docs: add README and finalize submission package` (Hoàn thiện Phần 5)

Kiểm tra lịch sử commit bằng lệnh:
```bash
git log --oneline
```
