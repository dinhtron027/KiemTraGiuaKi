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

/* =========================================================================
 * PHẦN 4: JAVASCRIPT NÂNG CAO
 * ========================================================================= */

/**
 * 4.14 & 4.15 & 4.16. FETCH API, ASYNC/AWAIT VÀ TRY/CATCH
 * Đọc dữ liệu từ file js/data.json và hiển thị danh sách dự án lên DOM.
 * Xử lý lỗi đầy đủ, ghi console.error và hiển thị thông báo lỗi trên UI.
 */
const loadProjects = async () => {
  const container = document.getElementById("projects-container");
  if (!container) return;

  try {
    // 1. Gọi fetch() kết hợp await để đọc dữ liệu từ file js/data.json
    const response = await fetch("js/data.json");

    // 2. Kiểm tra response.ok trước khi xử lý JSON
    if (!response.ok) {
      throw new Error(`Không thể nạp dữ liệu! Mã trạng thái HTTP: ${response.status} (${response.statusText})`);
    }

    // 3. Phân tích dữ liệu JSON trả về
    const projects = await response.json();

    // Xóa thông báo loading
    container.innerHTML = "";

    // Kiểm tra nếu mảng dự án rỗng
    if (!Array.isArray(projects) || projects.length === 0) {
      const emptyDiv = document.createElement("div");
      emptyDiv.className = "empty-state";
      const emptyText = document.createElement("p");
      emptyText.textContent = "Hiện chưa có dự án nào trong danh sách.";
      emptyDiv.appendChild(emptyText);
      container.appendChild(emptyDiv);
      return;
    }

    // 4. Render từng dự án thành một card DOM an toàn
    projects.forEach((project) => {
      // Thẻ card cha
      const card = document.createElement("article");
      card.className = "project-card";

      // Header của card (Năm hoàn thành)
      const headerDiv = document.createElement("div");
      headerDiv.className = "project-header";

      const yearBadge = document.createElement("span");
      yearBadge.className = "project-year";
      yearBadge.textContent = `Năm: ${project.namHoanThanh}`;
      headerDiv.appendChild(yearBadge);

      // Tiêu đề dự án
      const titleElem = document.createElement("h3");
      titleElem.className = "project-title";
      titleElem.textContent = project.ten; // DOM an toàn với textContent

      // Mô tả dự án
      const descElem = document.createElement("p");
      descElem.className = "project-desc";
      descElem.textContent = project.moTa || "Dự án phát triển web ứng dụng kiến thức lập trình.";

      // Công nghệ sử dụng
      const techElem = document.createElement("p");
      techElem.className = "project-tech";
      techElem.textContent = project.congNghe;

      // Footer của card (Liên kết xem chi tiết / demo)
      const footerDiv = document.createElement("div");
      footerDiv.className = "project-footer";

      const linkElem = document.createElement("a");
      linkElem.className = "project-link";
      linkElem.href = "#";
      linkElem.textContent = "Xem mã nguồn & chi tiết →";
      linkElem.setAttribute("aria-label", `Xem chi tiết dự án ${project.ten}`);
      footerDiv.appendChild(linkElem);

      // Ghép nối các phần tử vào card
      card.appendChild(headerDiv);
      card.appendChild(titleElem);
      card.appendChild(descElem);
      card.appendChild(techElem);
      card.appendChild(footerDiv);

      // Thêm card vào container
      container.appendChild(card);
    });

  } catch (error) {
    // 4.16. Xử lý lỗi try/catch:
    // Log lỗi chi tiết ra console
    console.error("Lỗi khi tải dữ liệu dự án (loadProjects):", error);

    // Hiển thị thông báo thân thiện trên giao diện để trang không bị crash
    container.innerHTML = "";
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-state";

    const errorTitle = document.createElement("p");
    errorTitle.className = "error-title";
    errorTitle.textContent = "⚠️ Không thể tải danh sách dự án!";

    const errorDesc = document.createElement("p");
    errorDesc.textContent = "Vui lòng đảm bảo website được mở bằng Live Server (giao thức HTTP) thay vì file:// để tránh lỗi CORS khi đọc file data.json.";

    errorDiv.appendChild(errorTitle);
    errorDiv.appendChild(errorDesc);
    container.appendChild(errorDiv);
  }
};

/**
 * 4.17. LOCALSTORAGE VÀ DARK MODE
 * Quản lý chuyển đổi giao diện Sáng / Tối và lưu trạng thái bền vững.
 */
const initDarkMode = () => {
  const THEME_KEY = "portfolio-theme";
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (!themeToggleBtn) return;

  const themeIcon = themeToggleBtn.querySelector(".theme-icon");
  const themeText = themeToggleBtn.querySelector(".theme-text");

  // Hàm cập nhật trạng thái giao diện và nội dung nút bấm
  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      if (themeIcon) themeIcon.textContent = "☀️";
      if (themeText) themeText.textContent = "Light Mode";
      themeToggleBtn.setAttribute("title", "Chuyển sang giao diện Sáng (Light Mode)");
    } else {
      document.body.classList.remove("dark-theme");
      if (themeIcon) themeIcon.textContent = "🌙";
      if (themeText) themeText.textContent = "Dark Mode";
      themeToggleBtn.setAttribute("title", "Chuyển sang giao diện Tối (Dark Mode)");
    }
  };

  // 1. Đọc trạng thái đã lưu trong LocalStorage khi tải trang
  let savedTheme = "light";
  try {
    savedTheme = localStorage.getItem(THEME_KEY) || "light";
  } catch (err) {
    console.warn("Không thể truy cập LocalStorage:", err);
  }

  // Áp dụng chủ đề ngay khi khởi tạo
  applyTheme(savedTheme);

  // 2. Lắng nghe sự kiện click nút chuyển đổi
  themeToggleBtn.addEventListener("click", () => {
    const isCurrentlyDark = document.body.classList.contains("dark-theme");
    const newTheme = isCurrentlyDark ? "light" : "dark";

    // Cập nhật giao diện
    applyTheme(newTheme);

    // 3. Lưu trạng thái mới vào LocalStorage
    try {
      localStorage.setItem(THEME_KEY, newTheme);
    } catch (err) {
      console.warn("Không thể lưu chủ đề vào LocalStorage:", err);
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

// Khởi chạy toàn bộ module khi DOM hoàn tất nạp
document.addEventListener("DOMContentLoaded", () => {
  // 1. Khởi tạo Dark Mode từ LocalStorage
  initDarkMode();

  // 2. Render danh sách kỹ năng ban đầu (Phần 3)
  renderSkills("all");
  initSkillFilters();

  // 3. Tải và hiển thị danh sách dự án từ data.json qua Fetch API (Phần 4)
  loadProjects();

  // 4. Khởi tạo xử lý Form liên hệ & validate (Phần 3)
  initContactForm();

  // 5. Khởi tạo điều hướng menu di động
  initMobileNav();
});
