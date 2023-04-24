import candidatesItems from "./../libs/candidadesItems.mjs";

// Создание блоков с вакансиями:
// const candidatesItems = [{}, {} ..., {}]; массив объектов (находится в другом файле)

// ================= Исходные данные =================
const refs = {
  menuBtn: document.querySelector(".nav__btn-toggle"), // Кнопка гамбургер меню
  menuIcon: document.querySelector(".menu-icon"), // Элементы гамбургер меню
  nav: document.querySelector(".nav"), // Навигация
  navList: document.querySelector(".nav__list"), // Элементы навигации
  headerBlur: document.querySelector(".header__blur"), // Blur элемент на header
  navActiveBlur: document.querySelector(".nav__blur"), // Blur при открытии меню
  navBtnUp: document.querySelector(".nav-btn-up"), // Кнопка UP
  candidatesFilter: document.querySelector(".candidates__filter"), // Cекция candidates__filter
  candidatesFilterBtn: document.querySelectorAll(".candidates__filter-title span"), // Кнопка открытия фильтров в candidates__filter-title
  candidatesLabel: document.querySelectorAll(".candidates__filter label"), // Все блоки теги label в секции candidates__filter
  candidatesInputs: document.querySelectorAll(".candidates__filter input"), // Инпуты секции candidates__filter
  candidatesRow: document.querySelector(".result-candidates__row"), // Вывод отмеченных инпуты в секции candidates__row
  searchContainer: document.querySelector(".search-container"), // Контейнер поиска вакансий
  candidatesCards: document.querySelector(".candidates__cards"), // Контейнер с карточками
  filteBtnReset: document.querySelector(".result-candidates__reset-btn"), // Кнопка сброса всех фильтров
  menuIconBtn: document.querySelector(".candidates__hidden-menu"), // Кнопка открытия меню фильтров:
};

const {
  menuBtn,
  menuIcon,
  nav,
  navList,
  headerBlur,
  navBtnUp,
  navActiveBlur,
  candidatesFilter,
  candidatesFilterBtn,
  candidatesLabel,
  candidatesInputs,
  candidatesRow,
  searchContainer,
  candidatesCards,
  filteBtnReset,
  menuIconBtn,
} = refs;

const searchIcon = searchContainer.querySelector("img"); // Иконка поиска в поисковой строке
const searchInput = searchContainer.querySelector("input"); // Инпут в поисковой строке

const activeInputs = []; // массив содержащий активные чекбоксы
let typeDevice = ""; // Тип устройства (определяется функцией typeOfDevice() при загрузке страницы)

// ================= MENU BTN ================= //
// ============= кнопка menu btn toggle ================ //
// const menuBtn = document.querySelector(".nav__btn-toggle"), // Кнопка гамбургер меню
// const menuIcon = document.querySelector(".menu-icon") // Элементы гамбургер меню
// const nav = document.querySelector(".nav"), // Навигация
// const navList = document.querySelector(".nav__list"), // Элементы навигации
// const headerBlur = document.querySelector(".header__blur"), // Blur элемент на header
// const navActiveBlur = document.querySelector(".nav__blur"), // Blur при открытии меню
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

// ================= РЕШЕНИЕ ПРОБЛЕМЫ СО СКРОЛЛОМ ================= //
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

// ================= Оформления закрытия меню ================= //
// const menuIcon = document.querySelector(".menu-icon") // Элементы гамбургер меню
// const nav = document.querySelector(".nav"), // Навигация
// const navList = document.querySelector(".nav__list"), // Элементы навигации
// const headerBlur = document.querySelector(".header__blur"), // Blur элемент на header
// const navActiveBlur = document.querySelector(".nav__blur"), // Blur при открытии меню
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

// ================= Скрытие кнопки вверх: ================= //
window.addEventListener("scroll", () => {
  if (window.pageYOffset < 946) {
    navBtnUp.classList.add("none");
  } else {
    navBtnUp.classList.remove("none");
  }
});

// ================= Подключение слайдера ================= //
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

// ================= Секция Candidates ================= //
// ================= Секция candidates__filter (аккордион) ================= //
// const candidatesFilter = document.querySelector(".candidates__filter"); // секция candidates__filter
candidatesFilter.addEventListener("click", (event) => {
  // if (event.target.tagName !== "SPAN" || !event.target.closest(".candidates__filter-title")) return; // нажатие только на span (+ -)
  if (event.target.matches("[class$='.candidates__filter-title']")) return;
  if (event.target.closest(".candidates__settings")) return; // Чтобы не срабатывало на
  // console.log(event.target);
  if (event.target.closest(".candidates__filter-locations")) return candidatesToggle("locations");
  if (event.target.closest(".candidates__filter-directions")) return candidatesToggle("directions");
  if (event.target.closest(".candidates__filter-tech-levels")) return candidatesToggle("tech-levels");
  if (event.target.closest(".candidates__filter-work-type")) return candidatesToggle("work-type");
});

const candidatesToggle = (element) => {
  const candidatesFilterSections = document.querySelector(`.candidates__filter-${element}`);
  const candidatesSettings = candidatesFilterSections.querySelector(".candidates__settings");
  const candidatesFilterTitle = candidatesFilterSections.querySelector(".candidates__filter-title");

  const elements = Array.from(candidatesFilter.children);
  elements.forEach((elem) => {
    const pverElemSet = elem.firstElementChild;
    const prevElemTit = elem.lastElementChild;
    if (pverElemSet.classList.contains("active") && !prevElemTit.hasAttribute("hidden")) {
      pverElemSet.classList.remove("active");
      prevElemTit.setAttribute("hidden", "");
    } else if (pverElemSet === candidatesFilterTitle) {
      candidatesSettings.hidden = !candidatesSettings.hidden;
      candidatesFilterTitle.classList.toggle("active");
    }
  });
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

// ================= Работа фильтра ================= //
// const candidatesFilter = document.querySelector(".candidates__filter"); // Cекция candidates__filter
// const candidatesInputs = document.querySelectorAll(".candidates__filter input"); // Инпуты секции candidates__filter
// const candidatesRow = document.querySelector(".result-candidates__row"); // Вывод отмеченных инпуты в секции candidates__row
// let activeInputs = [];

// ================= Начальный рендеринг инпутов: ================= //
function firstRenderCheckes() {
  candidatesRow.innerHTML = [...candidatesInputs]
    .map((elem) => {
      if (!elem.checked) return;

      activeInputs.push(elem);
      return `
      <div class="result-candidates__box box-result">
        <h3 class="box-result__name">${elem.parentElement.textContent}</h3>
        <button class="box-result__btn">✕</button>
      </div>
    `;
    })
    .join("");
}
firstRenderCheckes();

// ================= Последующий рендеринг инпутов: ================= //
function nextRenderCheckes() {
  candidatesRow.innerHTML = activeInputs
    .map((elem) => {
      return `
        <div class="result-candidates__box box-result">
          <h3 class="box-result__name">${elem.parentElement.textContent}</h3>
          <button class="box-result__btn">✕</button>
        </div>
      `;
    })
    .join("");

  showCandidatesCards();
}

// ================= Событие при нажатии на инпуты: ================= //
// const candidatesFilter = document.querySelector(".candidates__filter"); // Cекция candidates__filter
// const searchContainer = document.querySelector(".search-container"); // Контейнер поиска вакансий
candidatesFilter.addEventListener("click", (event) => {
  if (!event.target.matches("label") && !event.target.matches("input")) return;

  // Убрать выделение текста при нажатии на пункты:
  candidatesFilter.addEventListener("mousedown", (event) => {
    event.preventDefault();
  });

  // снять выделение с инпута по поиску названия вакансий при установки фильтров:
  const input = searchContainer.querySelector("input");
  input.blur();

  if (!event.target.matches("input")) return;
  if (event.target.checked) {
    activeInputs.push(event.target);
    nextRenderCheckes();
  } else {
    deleteElement(event.target);
  }
});

// ================= Удалить снятый инпут-элемент из массива activeInputs: ================= //
function deleteElement(delElem) {
  const deleteElem = activeInputs.findIndex((elem) => {
    return delElem.value === elem.value;
    // return delElem.dataset.index === elem.dataset.index;
  });
  activeInputs.splice(deleteElem, 1);

  nextRenderCheckes();
}

// ================= Удаление блока с candidatesRow: ================= //
// const candidatesRow = document.querySelector(".result-candidates__row"), // Вывод отмеченных инпуты в секции candidates__row
candidatesRow.addEventListener("click", (event) => {
  event.preventDefault();
  if (!event.target.matches("[class$='box-result__btn']")) return;
  const box = event.target.parentElement;
  const nameOfBtn = box.getElementsByClassName("box-result__name")[0].textContent;

  const findElem = activeInputs.find((elem) => {
    return elem.value.toLowerCase() === nameOfBtn.toLowerCase();
  });

  findElem.checked = !findElem.checked;

  if (!event.target.checked) {
    deleteElement(findElem);
  }

  // корректная работа инпута:
  const label = findElem.parentElement;
  const span = label.querySelector("span");
  span.classList.remove("check-active");
});

// ================= HTML код для отображения карточек: ================= //
function htmlCodeOfSearch(elem) {
  return `    
    <div class="candidates__card ${typeDevice === "desktop" ? "hover" : ""}">
      <a class="candidates__link" href="./jobVacancy_id-${elem.id}.html" target="_blunk">
        <div class="candidates__card-row">
          <div class="candidates__card-direction">
            <h4 class="candidates__card-subtitle">Directions</h4>
            <h3 class="candidates__card-title">${elem.speciality}</h3>
            <h4 class="candidates__card-text">${elem.direction}</h4>
          </div>
          <div class="candidates__card-other-info-block">
            <div class="candidates__card-tech-level">
              <h4 class="candidates__card-subtitle">Tech level</h4>
              <h3 class="candidates__card-title">${elem.techLevel}</h3>
            </div>
            <div class="candidates__card-location">
              <h4 class="candidates__card-subtitle">Location</h4>
              <h3 class="candidates__card-title">${elem.location}</h3>
            </div>
            <div class="candidates__card-work-type">
              <h4 class="candidates__card-subtitle">Work type</h4>
              <h3 class="candidates__card-title">${elem.workType}</h3>
            </div>
          </div>
        </div>
      </a>
    </div>
  `;
}

// ================= Отображение количества найденных карточек с вакансиями: ================= //
function displayQtyJobVacancies(array) {
  const searchContainerOutput = document.querySelector(".search-container__output span");
  return (searchContainerOutput.textContent = array.length ? array.length : candidatesItems.length);
}

// ================= Создает объект с отмеченными инпутами в каждой категории: ================= //
function showActiveInputs() {
  const location = [];
  const direction = [];
  const techLevel = [];
  const workType = [];

  activeInputs.forEach((elem) => {
    if (elem.closest(".candidates__filter-locations")) location.push(elem.value);
    if (elem.closest(".candidates__filter-directions")) direction.push(elem.value);
    if (elem.closest(".candidates__filter-tech-levels")) techLevel.push(elem.value);
    if (elem.closest(".candidates__filter-work-type")) workType.push(elem.value);
  });

  return {
    location: location,
    direction: direction,
    techLevel: techLevel,
    workType: workType,
  };
}

// ================= Показанные карточки: ================= //
// const searchContainer = document.querySelector(".search-container"); // Контейнер поиска вакансий
// const candidatesCards = document.querySelector(".candidates__cards"); // Контейнер с карточками
// const searchInput = searchContainer.querySelector("input"); // Инпут в поисковой строке
function showCandidatesCards() {
  // Убрать input.value с инпута во время установки фильстров:
  searchInput.value = "";

  const selectedInputs = showActiveInputs();
  const keys = Object.keys(selectedInputs);

  const locationKey = keys[0];
  const directionsKey = keys[1];
  const levelsKey = keys[2];
  const typeKey = keys[3];

  let searchArray = [];

  // Условие, чтобы при начальном рендеринге не отображалось никакой надписи
  if (
    !selectedInputs[locationKey].length &&
    !selectedInputs[directionsKey].length &&
    !selectedInputs[levelsKey].length &&
    !selectedInputs[typeKey].length
  ) {
    // Отображение надписи при очистке всех фильтров:
    displayQtyJobVacancies(searchArray);
    return (candidatesCards.innerHTML = `<h3 class="candidates__notFound">
    Set the desired filters or use the search.</h3>`);
  }

  // Последовательная работа фильтров:
  if (selectedInputs[locationKey].length) {
    searchArray = (searchArray.length ? searchArray : candidatesItems).filter((elem) => {
      return selectedInputs[locationKey].find((location) => {
        return location === elem[locationKey].toLowerCase();
      });
    });
    // console.log(searchArray.length);
  }

  if (selectedInputs[directionsKey].length) {
    searchArray = (searchArray.length ? searchArray : candidatesItems).filter((elem) => {
      return selectedInputs[directionsKey].find((direction) => {
        return direction === elem[directionsKey].toLowerCase();
      });
    });
    // console.log(searchArray.length);
  }

  if (selectedInputs[levelsKey].length) {
    searchArray = (searchArray.length ? searchArray : candidatesItems).filter((elem) => {
      return selectedInputs[levelsKey].find((techLevel) => {
        return techLevel === elem[levelsKey].toLowerCase();
      });
    });
    // console.log(searchArray.length);
  }

  if (selectedInputs[typeKey].length) {
    searchArray = (searchArray.length ? searchArray : candidatesItems).filter((elem) => {
      return selectedInputs[typeKey].find((workType) => {
        return workType === elem[typeKey].toLowerCase();
      });
    });
    // console.log(searchArray.length);
  }

  // Отображение карточек согласно фильтрам:
  candidatesCards.innerHTML =
    (searchArray.length ? searchArray : [])
      .map((elem) => {
        return htmlCodeOfSearch(elem);
      })
      .join("") ||
    `<h3 class="candidates__notFound">
      Nothing was found according to your request.</h3>`;

  // количество найденных вакансий в строке поиска:
  displayQtyJobVacancies(searchArray);
}
showCandidatesCards();

// ================= Поиск по инпуту: ================= //
// const searchContainer = document.querySelector(".search-container"); // Контейнер поиска вакансий
// const searchIcon = searchContainer.querySelector("img"); // Иконка поиска в поисковой строке
// const searchInput = searchContainer.querySelector("input"); // Инпут в поисковой строке
function inputSearch() {
  searchIcon.addEventListener("click", (event) => {
    if (event.target.tagName !== "IMG") return;
    const inputText = searchInput.value;
    // условие по вводу количества символов:
    if (inputText.length < 1 || inputText.startsWith(" ")) return;

    searchInput.blur(); // Убрать фокус после ввода

    searchTitle(inputText);
    candidatesRow.innerHTML = "";
  });

  document.body.addEventListener("keydown", (event) => {
    if (event.code !== "Enter" || !searchInput.value) return;
    const inputText = event.target.value;
    // условие по вводу количества символов:
    if (inputText.length < 1 || inputText.startsWith(" ")) return;

    searchInput.blur(); // Убрать фокус после ввода

    searchTitle(inputText);
    candidatesRow.innerHTML = "";
  });
}
inputSearch();

// ================= Функция по поиску названия вакансии: ================= //
// const candidatesCards = document.querySelector(".candidates__cards"); // Контейнер с карточками
function searchTitle(intupText) {
  const findedSpecialities = candidatesItems.filter((item) => {
    return item.speciality.toLowerCase().includes(intupText.toLowerCase());
  });

  // Убрать отмеченные фильтры:
  resetAllFilters();

  // Отображение карточек согласно поиска:
  candidatesCards.innerHTML =
    (findedSpecialities.length ? findedSpecialities : [])
      .map((elem) => {
        return htmlCodeOfSearch(elem);
      })
      .join("") ||
    `<h3 class="candidates__notFound">
      Nothing was found according to your request.</h3>`;

  // Отображение количества карточек:
  displayQtyJobVacancies(findedSpecialities);
}

// ================= Сброс всех фильтров: ================= //
// const filteBtnReset = document.querySelector(".result-candidates__reset-btn"); // Кнопка сброса всех фильтров
// const candidatesInputs = document.querySelectorAll(".candidates__filter input"); // Инпуты секции candidates__filter
// const candidatesCards = document.querySelector(".candidates__cards"); // Контейнер с карточками
// const searchContainer = document.querySelector(".search-container"); // Контейнер поиска вакансий
// const searchInput = searchContainer.querySelector("input"); // Инпут в поисковой строке
filteBtnReset.addEventListener("click", resetAllFilters);

function resetAllFilters() {
  // Убрать отмеченные фильтры:
  candidatesInputs.forEach((elem) => {
    if (elem.checked) {
      elem.checked = !elem.checked;
    }
    // корректная работа инпута:
    const label = elem.parentElement;
    const span = label.querySelector("span");
    span.classList.remove("check-active");
  });
  activeInputs.splice(0, activeInputs.length);

  // Отображение надписи:
  candidatesCards.innerHTML = `<h3 class="candidates__notFound">Set the desired filters or use the search.</h3>`;

  // Сброс показанных инпутов
  candidatesRow.innerHTML = "";

  // Убрать input.value с инпута во время установки фильстров:
  if (event.target.matches("[class$='result-candidates__reset-btn']")) {
    searchInput.value = "";
  }

  displayQtyJobVacancies(candidatesCards);
}

// ================= Кнопка меню фильтров на планшете и мобильном: ================= //
// const menuIconBtn = document.querySelector(".candidates__hidden-menu img"); // Кнопка открытия меню фильтров:
// const candidatesFilter = document.querySelector(".candidates__filter"); // секция candidates__filter

// открытия меню фильтров:
menuIconBtn.addEventListener("click", menuIconBtnClick);
function menuIconBtnClick() {
  candidatesFilter.classList.toggle("dblock");
}

// Закрытие меню фильтров при нажатии по экрану:
document.addEventListener("click", (event) => {
  if (event.target.closest(".candidates__hidden-menu")) return;
  if (event.target.closest(".candidates__filter")) return;
  candidatesFilter.classList.remove("dblock");
});

// Закрытие меню фильтров при нажатии на кнопку ESC:
document.addEventListener("keydown", (event) => {
  if (!candidatesFilter.classList.contains("dblock") || event.code !== "Escape") return;
  candidatesFilter.classList.remove("dblock");
});

// ============================================================================== //
// ================= Cекция по снятию ховера с мобильной версии ================= //

function typeOfDevice() {
  if ("ontouchstart" in window || (window.DocumentTouch && document instanceof DocumentTouch)) {
    console.log("this is a touch device");
    typeDevice = "mobile";
  } else {
    console.log("this is not a touch device");
    typeDevice = "desktop";

    // снятие ховера с кнопки UP на мобильной версии
    navBtnUp.firstChild.classList.add("no-touch");
    navBtnUp.classList.add("no-touch");

    // снятие ховера с кнопки в секции candidates__filter-title на мобильной версии
    candidatesFilterBtn.forEach((elem) => {
      elem.classList.add("no-touch-filter-title");
    });

    // снятие ховера с наведение на инпуты candidates__settings на мобильной версии
    candidatesLabel.forEach((label) => {
      label.classList.add("input-hover");
    });

    // снятие ховера с карточек в секции candidates__cards на мобильной версии
    showCandidatesCards(); // функция htmlCodeOfSearch считывает значение переменной typeDevice
  }
}
typeOfDevice();
// =============================================== //
