// ================= menu btn =================
const refs = {
  menuBtn: document.querySelector(".nav__btn-toggle"),
  menuIcon: document.querySelector(".menu-icon"),
  nav: document.querySelector(".nav"),
  navList: document.querySelector(".nav__list"),
  headerBlur: document.querySelector(".header__blur"),
  navBtnUp: document.querySelector(".nav-btn-up"),
  // headerTitle: document.querySelector(".header__title"),
};
const { menuBtn, menuIcon, nav, navList, headerBlur, headerTitle, navBtnUp } = refs;

if ("ontouchstart" in window || (window.DocumentTouch && document instanceof DocumentTouch)) {
  console.log("this is a touch device");
} else {
  console.log("this is not a touch device");
  navBtnUp.firstChild.classList.add("no-touch");
  navBtnUp.classList.add("no-touch");
}

menuBtn.addEventListener("click", () => {
  menuIcon.classList.toggle("js-menu-icon-active");
  nav.classList.toggle("nav--mobile");
  navList.classList.toggle("nav__list-active");
  headerBlur.classList.toggle("none");
  document.body.classList.toggle("no-scroll");
});

// 1 вариант оформления закрытия меню (предпочтительный):
// navList.addEventListener("click", (event) => {
//   menuIcon.classList.toggle("js-menu-icon-active");
//   nav.classList.toggle("nav--mobile");
//   navList.classList.toggle("nav__list-active");
//   document.body.classList.toggle("no-scroll");
// });
// 2 вариант оформления закрытия меню:
document.body.addEventListener("click", (event) => {
  if (event.target.classList.contains("menu-icon")) return;
  if (navList.classList.contains("nav__list-active") && !event.target.closest("LI")) {
    menuIcon.classList.toggle("js-menu-icon-active");
    nav.classList.toggle("nav--mobile");
    navList.classList.toggle("nav__list-active");
    document.body.classList.toggle("no-scroll");
  }
});

// window.addEventListener("scroll", (event) => {
//   console.log(event);
// });

// console.log(navBtnUp.getBoundingClientRect().top + window.pageYOffset);

// Перенос текста на новую строку
// if (document.documentElement.clientWidth < 1109) {
//   const brElem = document.createElement("br");
//   headerTitle.firstElementChild.prepend(brElem);
// }
