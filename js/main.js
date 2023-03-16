// ================= menu btn =================
const menuBtn = document.querySelector(".nav__btn-toggle");
const menuIcon = document.querySelector(".menu-icon");
const nav = document.querySelector(".nav");

menuBtn.addEventListener("click", () => {
  menuIcon.classList.toggle("js-menu-icon-active");
  nav.classList.toggle("nav--mobile");
  document.body.classList.toggle("no-scroll");
});
