// ================= menu btn =================
const refs = {
  menuBtn: document.querySelector(".nav__btn-toggle"),
  menuIcon: document.querySelector(".menu-icon"),
  nav: document.querySelector(".nav"),
  navList: document.querySelector(".nav__list"),
  headerBlur: document.querySelector(".header__blur"),
  navBtnUp: document.querySelector(".nav-btn-up"),
  navActiveBlur: document.querySelector(".nav__blur"),
  candidatesFilterBtn: document.querySelector(".candidates__filter-title span"),
};
const { menuBtn, menuIcon, nav, navList, headerBlur, headerTitle, navBtnUp, navActiveBlur, candidatesFilterBtn } = refs;

// секция по снятию ховера с мобильной версии:
if ("ontouchstart" in window || (window.DocumentTouch && document instanceof DocumentTouch)) {
  console.log("this is a touch device");
} else {
  console.log("this is not a touch device");
  navBtnUp.firstChild.classList.add("no-touch");
  navBtnUp.classList.add("no-touch");
  // снятие ховера с кнопки в секции candidates__filter-title на мобильной версии
  candidatesFilterBtn.classList.add("no-touch-filter");
}

// ============= кнопка menu btn toggle ================ //
menuBtn.addEventListener("click", () => {
  menuIcon.classList.toggle("js-menu-icon-active");
  // nav.classList.toggle("nav--mobile");
  navList.classList.toggle("nav__list-active");
  if (navList.classList.contains("nav__list-active")) {
    navList.lastElementChild.style.marginBottom = "25px";
    removeScroll(window.scrollY);
  } else {
    navList.lastElementChild.style.marginBottom = "";
    document.body.style.position = "static";
    addScroll(window.scrollY);
  }
  headerBlur.classList.toggle("none");
  navActiveBlur.classList.toggle("none");
  document.body.classList.toggle("no-scroll");
});

// убрать скролл при открытии меню:
function removeScroll(topPosition) {
  document.body.style.position = "fixed";
  document.body.style.top = `-${topPosition}px`;
}
// добавить скролл при закрытии меню:
function addScroll() {
  const scroll = document.body.style.top;
  window.scrollTo(0, parseInt(scroll || "0") * -1);
}
// анимация при закрытии меню:

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
    document.body.style.position = "static";
    addScroll();
  }
});

// Подключение слайдера
new Swiper(".rewies-slider", {
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true, // переключение между элементами при нажатии на пагинацию
    dynamicBullets: true, // используется только часть буллетов, останоные не видимые
    type: "bullets", // тип элементов пагинации 'bullets'|'fraction'|'progressbar'|'custom'
  },
  keyboard: {
    enabled: true, // включить/выключить переключения слайдов с стрелками лево/право
    pageUpDown: true, // включить/выключить переключения слайдов с стрелками PageUp/PageDown
  },
  autoplay: {
    delay: 3000, // время задержки слайда
    disableOnInteraction: false, // отключить после ручного переключения
    pauseOnMouseEnter: true, // пауза перелистывания слайдов при наведении мыши на слайд
  },
  grabCursor: true, // курсор перетаскивания (рука)
  slidesPerView: 3, // количество слайдов для показа
  slidesPerGroup: 1, // количество пролистываемых слайдов
  spaceBetween: 20, // расстояние между слайдами
  loop: true, // бесконечно прокручивающийся слайдер
  speed: 500, // скорость переключения слайдов (300ms по умолчанию)
  effect: "slide", // 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'creative' | 'cards'
  breakpoints: {
    200: {
      slidesPerView: 1.5,
      spaceBetween: 20,
      centeredSlides: true,
    },
    390: {
      slidesPerView: 2,
      centeredSlides: true,
    },
    460: {
      slidesPerView: 2,
      spaceBetween: 20,
      centeredSlides: false,
    },
    767: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});

// ======================================================= //
// ============= Candidates ================ //
// Секция candidates__filter (аккордион)
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

// Работа фильтра:
const buttonSearch = document.querySelector("#btn-search");

buttonSearch.addEventListener("click", () => {
  const candidatesFilter = document.querySelectorAll(".candidates__filter input");
  const candidatesRow = document.querySelector(".result-candidates__row");
  // обнуляем список с выбранными фильтрами:
  candidatesRow.innerHTML = "";
  // добавляем новый список с выбранными фильтрами:
  candidatesFilter.forEach((elem) => {
    if (!elem.hasAttribute("checked")) return;
    candidatesRow.innerHTML += `
      <div class="result-candidates__box box-result">
        <h3 class="box-result__name">${elem.parentElement.textContent}</h3>
        <button class="box-result__btn">✕</button>
      </div>
    `;
  });
});

// Создание блоков с вакансиями:
const candidatesItems = [
  { id: 1, direction: "DESIGN", workType: "OFFICE", speciality: "Expert UX Designer", location: "Spain" },
  { id: 2, direction: "PROJECT MANAGEMENT", workType: "REMOTE", speciality: "Project Coordinator", location: "Poland" },
  {
    id: 3,
    direction: "SOFTWARE DEVELOPMENT",
    workType: "OFFICE",
    speciality: "Senior. NET Engineer (+React)",
    location: "Spain",
  },
  { id: 4, direction: "IT", workType: "Freelance", speciality: "Senior. NET Engineer (+React)", location: "Canada" },
];

const candidatesCards = document.querySelector(".candidates__cards");
candidatesCards.innerHTML = "";
candidatesItems
  .filter((elem) => elem.location === "Spain" || elem.location === "Poland")
  .forEach((elem) => {
    candidatesCards.innerHTML += `
    <div class="candidates__card">
      <div class="candidates__card-row">
        <h4 class="candidates__card-direction">${elem.direction}</h4>
        <h4 class="candidates__card-work-type">${elem.workType}</h4>
      </div>
      <h3 class="candidates__card-title">${elem.speciality}</h3>
      <h4 class="candidates__card-location">${elem.location}</h4>
    </div>
  `;
  });

// console.log(candidatesCards.children.length);

// количество найденных вакансий в строке поиска:
const searchContainerOutput = document.querySelector(".search-container__output span");
searchContainerOutput.textContent = candidatesCards.children.length;
