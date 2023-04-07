// ================= menu btn =================
const refs = {
  menuBtn: document.querySelector(".nav__btn-toggle"),
  menuIcon: document.querySelector(".menu-icon"),
  nav: document.querySelector(".nav"),
  navList: document.querySelector(".nav__list"),
  headerBlur: document.querySelector(".header__blur"),
  navBtnUp: document.querySelector(".nav-btn-up"),
  navActiveBlur: document.querySelector(".nav__blur"),
};
const { menuBtn, menuIcon, nav, navList, headerBlur, headerTitle, navBtnUp, navActiveBlur } = refs;

if ("ontouchstart" in window || (window.DocumentTouch && document instanceof DocumentTouch)) {
  console.log("this is a touch device");
} else {
  console.log("this is not a touch device");
  navBtnUp.firstChild.classList.add("no-touch");
  navBtnUp.classList.add("no-touch");
}

// ============= кнопка menu btn toggle ================ //
menuBtn.addEventListener("click", () => {
  menuIcon.classList.toggle("js-menu-icon-active");
  nav.classList.toggle("nav--mobile");
  navList.classList.toggle("nav__list-active");
  if (navList.classList.contains("nav__list-active")) {
    navList.lastElementChild.style.marginBottom = "25px";
  } else {
    navList.lastElementChild.style.marginBottom = "";
  }
  headerBlur.classList.toggle("none");
  navActiveBlur.classList.toggle("none");
  document.body.classList.toggle("no-scroll");
});
// 1 вариант оформления закрытия меню (предпочтительный):
document.body.addEventListener("click", (event) => {
  if (
    event.target.matches("[class$='nav__blur']") ||
    (event.target.tagName === "A" && navList.classList.contains("nav__list-active"))
  ) {
    menuIcon.classList.toggle("js-menu-icon-active");
    nav.classList.toggle("nav--mobile");
    navList.classList.toggle("nav__list-active");
    navList.lastElementChild.style.marginBottom = "";
    headerBlur.classList.toggle("none");
    navActiveBlur.classList.toggle("none");
    document.body.classList.toggle("no-scroll");
  }
});

// Подключение слайдера
const slider = tns({
  container: ".rewies__slider",
  items: 3,
  slideBy: "page",
  autoplay: true,
  gutter: 20, // отступы между блоками
  autoplayButtonOutput: false, // скрыть кнопку autoplay
  navPosition: "bottom", // расположение навигации сназу
  controls: false, // Убрать кнопки переключения
  controlsPosition: "bottom", // расположение кнопок переключения
  controlsText: ["Prev", "Next"],
  mouseDrag: true,
  responsive: {
    100: {
      items: 1,
      edgePadding: 40,
    },
    320: {
      items: 1,
      edgePadding: 80,
    },
    550: {
      items: 2,
      edgePadding: 80,
    },
    767: {
      items: 3,
      edgePadding: 0,
    },
  },
});

const controls = document.querySelector(".tns-controls");
controls.classList.add("rewies__buttons");
Array.from(controls.children).forEach((btn, index) => {
  btn.classList.add(`rewies__btn-${index + 1}`);
});

// ======================================================= //

// window.addEventListener("scroll", (event) => {
//   console.log(event);
// });

// console.log(navBtnUp.getBoundingClientRect().top + window.pageYOffset);

// Перенос текста на новую строку
// if (document.documentElement.clientWidth < 1109) {
//   const brElem = document.createElement("br");
//   headerTitle.firstElementChild.prepend(brElem);
// }
