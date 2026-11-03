/**
 * =========================================================================
 * BÀI THI THỰC HÀNH GIỮA KỲ - HỌC PHẦN LẬP TRÌNH WEB (14113015)
 * Sinh viên: Đinh Trọng (cutrong236@gmail.com)
 * File: js/script.js
 * =========================================================================
 */

"use strict";

/* =========================================================================
 * PHẦN 3: JAVASCRIPT CƠ BẢN
 * ========================================================================= */

// 4.9. MẢNG OBJECT DỮ LIỆU TĨNH
// Khai báo danh sách kỹ năng chuyên môn cá nhân
const skills = [
  {
    ten: "HTML5 & Semantic Web",
    mucDo: "Thành thạo",
    nhom: "Frontend"
  },
  {
    ten: "CSS3 / SCSS & Flexbox/Grid",
    mucDo: "Thành thạo",
    nhom: "Frontend"
  },
  {
    ten: "JavaScript (ES6+ Vanilla)",
    mucDo: "Khá",
    nhom: "Programming"
  },
  {
    ten: "Responsive Web Design",
    mucDo: "Thành thạo",
    nhom: "Frontend"
  },
  {
    ten: "Git & GitHub Version Control",
    mucDo: "Khá",
    nhom: "Tools"
  },
  {
    ten: "VS Code & Live Server",
    mucDo: "Thành thạo",
    nhom: "Tools"
  }
];

/**
 * 4.10. SỬ DỤNG filter() VÀ map()
 * 4.11. THAO TÁC DOM & 4.13. ARROW FUNCTION
 * Hàm render danh sách kỹ năng ra DOM bằng createElement và textContent an toàn.
 * @param {string} filterGroup - Nhóm kỹ năng cần lọc ("all", "Frontend", "Programming", "Tools")
 */
const renderSkills = (filterGroup = "all") => {
  const container = document.getElementById("skills-container");
  if (!container) return;

  // Xóa nội dung cũ trong container
  container.innerHTML = "";

  // 1. Áp dụng filter(): Lọc kỹ năng theo nhóm được chọn
  const filteredSkills = filterGroup === "all"
    ? skills
    : skills.filter((item) => item.nhom.toLowerCase() === filterGroup.toLowerCase());

  // Xử lý trường hợp danh sách rỗng (Empty State)
  if (!filteredSkills || filteredSkills.length === 0) {
    const emptyDiv = document.createElement("div");
    emptyDiv.className = "empty-state";
    const emptyText = document.createElement("p");
    emptyText.textContent = "Không có kỹ năng nào thuộc nhóm này.";
    emptyDiv.appendChild(emptyText);
    container.appendChild(emptyDiv);
    return;
  }

  // 2. Áp dụng map(): Chuẩn hóa và chuyển đổi dữ liệu hiển thị
  const skillCards = filteredSkills.map((skill) => {
    // Tạo thẻ card cha
    const card = document.createElement("div");
    card.className = "skill-card";

    // Khối thông tin bên trái (Tên kỹ năng + Tag nhóm)
    const infoDiv = document.createElement("div");
    infoDiv.className = "skill-info";

    const nameElem = document.createElement("h3");
    nameElem.className = "skill-name";
    nameElem.textContent = skill.ten; // Sử dụng textContent an toàn chống XSS

    const tagElem = document.createElement("span");
    tagElem.className = "skill-tag";
    tagElem.textContent = skill.nhom;

    infoDiv.appendChild(nameElem);
    infoDiv.appendChild(tagElem);

    // Khối badge mức độ thành thạo bên phải
    const badgeElem = document.createElement("span");
    badgeElem.className = "skill-badge";
    badgeElem.textContent = skill.mucDo;

    card.appendChild(infoDiv);
    card.appendChild(badgeElem);

    return card;
  });

  // Đưa tất cả card đã tạo vào DOM container
  skillCards.forEach((card) => container.appendChild(card));
};

/**
 * Khởi tạo sự kiện cho các nút tab lọc kỹ năng
 */
const initSkillFilters = () => {
  const filterButtons = document.querySelectorAll(".skills-filter .filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Cập nhật trạng thái active của nút
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Lấy nhóm cần lọc từ data-filter và render lại
      const group = btn.getAttribute("data-filter") || "all";
      renderSkills(group);
    });
  });
};

/**
 * 4.12. XỬ LÝ FORM LIÊN HỆ BẰNG addEventListener("submit", ...)
 * Kiểm tra tính hợp lệ của dữ liệu kết hợp HTML5 và JS, hiển thị thông báo.
 */
const initContactForm = () => {
  const form = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  if (!form) return;

  // Các trường input cần kiểm tra
  const fullnameInput = document.getElementById("fullname");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const dateInput = document.getElementById("contact-date");
  const messageInput = document.getElementById("message");

  // Thiết lập ngày tối thiểu cho input date là ngày hôm nay
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
  }

  // Hàm hiển thị lỗi cho từng trường
  const showError = (input, errorId, message) => {
    input.classList.add("invalid");
    const errorElem = document.getElementById(errorId);
    if (errorElem) {
      errorElem.textContent = message;
    }
  };

  // Hàm xóa lỗi của từng trường
  const clearError = (input, errorId) => {
    input.classList.remove("invalid");
    const errorElem = document.getElementById(errorId);
    if (errorElem) {
      errorElem.textContent = "";
    }
  };

  // Lắng nghe sự kiện input để xóa lỗi ngay khi người dùng chỉnh sửa
  const inputs = [
    { input: fullnameInput, id: "fullname-error" },
    { input: emailInput, id: "email-error" },
    { input: phoneInput, id: "phone-error" },
    { input: dateInput, id: "date-error" },
    { input: messageInput, id: "message-error" }
  ];

  inputs.forEach(({ input, id }) => {
    if (input) {
      input.addEventListener("input", () => clearError(input, id));
    }
  });

  // Lắng nghe sự kiện submit của form
  form.addEventListener("submit", (event) => {
    // 1. Ngăn chặn hành vi submit mặc định làm tải lại trang
    event.preventDefault();

    let isValid = true;

    // Reset thông báo tổng
    formMessage.className = "form-message";
    formMessage.textContent = "";

    // 2. Kiểm tra Họ và tên (Bắt buộc, tối thiểu 2 ký tự)
    const fullnameValue = fullnameInput.value.trim();
    if (fullnameValue.length === 0) {
      showError(fullnameInput, "fullname-error", "Vui lòng nhập họ và tên của bạn.");
      isValid = false;
    } else if (fullnameValue.length < 2) {
      showError(fullnameInput, "fullname-error", "Họ và tên phải có ít nhất 2 ký tự.");
      isValid = false;
    } else {
      clearError(fullnameInput, "fullname-error");
    }

    // 3. Kiểm tra Email (Bắt buộc, đúng định dạng)
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue.length === 0) {
      showError(emailInput, "email-error", "Vui lòng nhập địa chỉ email.");
      isValid = false;
    } else if (!emailRegex.test(emailValue)) {
      showError(emailInput, "email-error", "Email không đúng định dạng (Ví dụ: name@example.com).");
      isValid = false;
    } else {
      clearError(emailInput, "email-error");
    }

    // 4. Kiểm tra Số điện thoại (Bắt buộc, chuẩn SĐT Việt Nam)
    const phoneValue = phoneInput.value.trim();
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    if (phoneValue.length === 0) {
      showError(phoneInput, "phone-error", "Vui lòng nhập số điện thoại liên hệ.");
      isValid = false;
    } else if (!phoneRegex.test(phoneValue)) {
      showError(phoneInput, "phone-error", "Số điện thoại không hợp lệ (10 số, đầu số VN: 03, 05, 07, 08, 09).");
      isValid = false;
    } else {
      clearError(phoneInput, "phone-error");
    }

    // 5. Kiểm tra Ngày liên hệ mong muốn
    const dateValue = dateInput.value.trim();
    if (!dateValue) {
      showError(dateInput, "date-error", "Vui lòng chọn ngày bạn mong muốn được liên hệ.");
      isValid = false;
    } else {
      clearError(dateInput, "date-error");
    }

    // 6. Kiểm tra Nội dung tin nhắn (Bắt buộc, tối thiểu 10 ký tự)
    const messageValue = messageInput.value.trim();
    if (messageValue.length === 0) {
      showError(messageInput, "message-error", "Vui lòng nhập nội dung liên hệ.");
      isValid = false;
    } else if (messageValue.length < 10) {
      showError(messageInput, "message-error", "Nội dung liên hệ cần chi tiết hơn (tối thiểu 10 ký tự).");
      isValid = false;
    } else {
      clearError(messageInput, "message-error");
    }

    // 7. Xử lý phản hồi kết quả
    if (isValid) {
      // Hiển thị thông báo thành công (Ghi rõ là Demo Frontend theo yêu cầu đề bài)
      formMessage.className = "form-message success";
      formMessage.textContent = "✓ Gửi thông tin thành công! Cảm ơn bạn " + fullnameValue +
        ", thông tin đã được ghi nhận (Phiên bản Demo Frontend - Bài thi Lập trình Web).";

      // Reset form về trạng thái ban đầu
      form.reset();

      // Cuộn nhẹ tới thông báo phản hồi
      formMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else {
      // Hiển thị thông báo lỗi tổng quát
      formMessage.className = "form-message error";
      formMessage.textContent = "✗ Dữ liệu chưa hợp lệ. Vui lòng kiểm tra lại các trường báo đỏ bên dưới.";
    }
  });
};

/**
 * Xử lý menu responsive trên thiết bị di động (Hamburger Menu)
 */
const initMobileNav = () => {
  const navToggle = document.getElementById("nav-toggle");
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".navbar .nav-link");

  if (!navToggle || !navbar) return;

  // Bật/tắt menu di động
  navToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("nav-open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Tự động đóng menu khi bấm vào một liên kết điều hướng
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("nav-open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
};

// Khởi chạy khi DOM hoàn tất nạp
document.addEventListener("DOMContentLoaded", () => {
  // Render kỹ năng ban đầu
  renderSkills("all");
  // Khởi tạo bộ lọc kỹ năng
  initSkillFilters();
  // Khởi tạo xử lý form
  initContactForm();
  // Khởi tạo menu di động
  initMobileNav();
});
