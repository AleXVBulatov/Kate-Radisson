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
  slideBy: 1,
  autoplay: "page",
  gutter: 20, // отступы между блоками
  autoplayButtonOutput: false, // скрыть кнопку autoplay
  navPosition: "bottom", // расположение навигации сназу
  controlsPosition: "bottom", // расположение кнопок переключения
  controlsText: ["", ""],
  mouseDrag: true, // перелистывание по касанию
  responsive: {
    100: {
      items: 1,
      edgePadding: 40,
      controls: true, // Убрать кнопки переключения
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
    768: {
      controls: false, // Убрать кнопки переключения
    },
  },
});

const controls = document.querySelector(".tns-controls");
controls.classList.add("rewies__buttons");
Array.from(controls.children).forEach((btn, index) => {
  btn.classList.add(`rewies__btn-${index + 1}`);
});

// ======================================================= //
// ============= Candidates ================ //
const candidates = document.querySelector(".candidates__filter");

candidates.addEventListener("click", (event) => {
  if (event.target.tagName !== "SPAN" || !event.target.closest(".candidates__filter-title")) return;
  if (event.target.closest(".candidates__filter-locations")) return candidatesToggle("locations");
  if (event.target.closest(".candidates__filter-directions")) return candidatesToggle("directions");
  if (event.target.closest(".candidates__filter-tech-levels")) return candidatesToggle("tech-levels");
  if (event.target.closest(".candidates__filter-work-type")) return candidatesToggle("work-type");
});

const candidatesToggle = (elem) => {
  const candidatesFilter = document.querySelector(`.candidates__filter-${elem}`);
  const candidatesSettings = candidatesFilter.querySelector(".candidates__settings");
  const candidatesFilterTitle = candidatesFilter.querySelector(".candidates__filter-title");

  if (candidatesSettings.closest(`.candidates__filter-${elem}`)) {
    candidatesSettings.hidden = !candidatesSettings.hidden;
    // candidatesSettings.classList.toggle("none");
  }
  if (candidatesFilterTitle.closest(`.candidates__filter-${elem}`)) {
    candidatesFilterTitle.classList.toggle("active");
  }
};

// Программирование чекбокса:
document.addEventListener("click", (event) => {
  if (!event.target.matches("[type$='checkbox']")) return;
  // добавление атрибута checked
  event.target.hasAttribute("checked") ? event.target.removeAttribute("checked") : event.target.setAttribute("checked", "");
  // добавление class check-active на чекбокс
  const check = event.target.nextElementSibling;
  check.classList.toggle("check-active");
});
