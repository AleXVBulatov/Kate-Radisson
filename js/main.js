// ================= menu btn =================
const refs = {
  menuBtn: document.querySelector(".nav__btn-toggle"),
  menuIcon: document.querySelector(".menu-icon"),
  nav: document.querySelector(".nav"),
  navList: document.querySelector(".nav__list"),
  headerBlur: document.querySelector(".header__blur"),
  navBtnUp: document.querySelector(".nav-btn-up"),
  navActiveBlur: document.querySelector(".nav__blur"),
  candidatesFilterBtn: document.querySelectorAll(".candidates__filter-title span"),
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
  candidatesFilterBtn.forEach((elem) => {
    elem.classList.add("no-touch-filter");
  });
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

const candidatesToggle = (element) => {
  const candidatesFilter = document.querySelector(`.candidates__filter-${element}`);
  const candidatesSettings = candidatesFilter.querySelector(".candidates__settings");
  const candidatesFilterTitle = candidatesFilter.querySelector(".candidates__filter-title");

  const elements = Array.from(candidates.children);
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

// Работа фильтра:
// const candidatesFilter = document.querySelector(".candidates__filter");
const candidatesFilter = document.getElementsByClassName("candidates__filter")[0];
const candidatesInputs = document.querySelectorAll(".candidates__filter input");
const candidatesRow = document.querySelector(".result-candidates__row");

let activeInputs = [];

// Начальный рендеринг инпутов:
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

// Последующий рендеринг инпутов:
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

  const list = [...candidatesInputs].filter((elem) => {
    return elem.checked;
  });
  // console.log(list);
  showCandidatesCards();
}

candidatesFilter.addEventListener("click", (event) => {
  if (!event.target.matches("label") && !event.target.matches("input")) return;

  // Убрать выделение текста при нажатии на пункты:
  candidatesFilter.addEventListener("mousedown", (event) => {
    event.preventDefault();
  });

  // снять выделение с инпута по поиску названия вакансий при установки фильтров:
  const searchContainer = document.querySelector(".search-container");
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

function deleteElement(delElem) {
  const deleteElem = activeInputs.findIndex((elem, index) => {
    return delElem.value === elem.value;
    // return delElem.dataset.index === elem.dataset.index;
  });
  activeInputs.splice(deleteElem, 1);

  nextRenderCheckes();
}

// Удаление блока с candidatesRow:
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

// Создание блоков с вакансиями:
const candidatesItems = [
  {
    id: 1,
    direction: "marketing",
    workType: "remote/office",
    speciality: "Digital Marketing Specialist (PR|SMM)",
    location: "Ukraine",
    techLevel: "junior",
  },
  { id: 2, direction: "design", workType: "office", speciality: "Graphic Artist", location: "Poland", techLevel: "middle" },
  { id: 3, direction: "sales", workType: "relocation", speciality: "Sales Manager 1", location: "Bulgaria", techLevel: "senior" },
  {
    id: 4,
    direction: "development",
    workType: "freelance",
    speciality: "PHP Developer",
    location: "USA",
    techLevel: "leader",
  },
  { id: 5, direction: "analytics", workType: "remote/office", speciality: "Analytic 1", location: "Canada", techLevel: "expert" },
  { id: 6, direction: "other", workType: "office", speciality: "QA Engineer", location: "UK", techLevel: "other" },
  {
    id: 7,
    direction: "marketing",
    workType: "relocation",
    speciality: "Digital Marketing Specialist (PR|SMM)",
    location: "Germany",
    techLevel: "junior",
  },
  { id: 8, direction: "design", workType: "freelance", speciality: "Game Designer", location: "Sweden", techLevel: "middle" },
  {
    id: 9,
    direction: "sales",
    workType: "remote/office",
    speciality: "Sales Manager 2",
    location: "Singapore",
    techLevel: "senior",
  },
  { id: 10, direction: "development", workType: "office", speciality: "REACT Developer", location: "Spain", techLevel: "leader" },
  { id: 11, direction: "analytics", workType: "relocation", speciality: "Analytic 2", location: "Ukraine", techLevel: "expert" },
  { id: 12, direction: "other", workType: "freelance", speciality: "Support Manager", location: "Poland", techLevel: "other" },
  {
    id: 13,
    direction: "marketing",
    workType: "remote/office",
    speciality: "Social Media Marketing Manager",
    location: "Bulgaria",
    techLevel: "junior",
  },
  { id: 14, direction: "design", workType: "office", speciality: "UX Designer", location: "USA", techLevel: "middle" },
  { id: 15, direction: "sales", workType: "relocation", speciality: "Sales Manager 3", location: "Canada", techLevel: "senior" },
  {
    id: 16,
    direction: "development",
    workType: "freelance",
    speciality: "Python Developer",
    location: "UK",
    techLevel: "leader",
  },
  {
    id: 17,
    direction: "analytics",
    workType: "remote/office",
    speciality: "Analytic 3",
    location: "Germany",
    techLevel: "expert",
  },
  { id: 18, direction: "other", workType: "office", speciality: "L1 Rust Auditor", location: "Sweden", techLevel: "other" },
  {
    id: 19,
    direction: "marketing",
    workType: "relocation",
    speciality: "SMM Marketing",
    location: "Singapore",
    techLevel: "junior",
  },
  {
    id: 20,
    direction: "design",
    workType: "freelance",
    speciality: "Product Game Designer",
    location: "Spain",
    techLevel: "middle",
  },
];

// HTML код для отображения карточек:
function htmlCodeOfSearch(elem) {
  return `    
    <div class="candidates__card">
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
    </div>
  `;
}

// Отображение количества найденных карточек с вакансиями:
function displayQtyJobVacancies(array) {
  const searchContainerOutput = document.querySelector(".search-container__output span");
  return (searchContainerOutput.textContent = array.length ? array.length : candidatesItems.length);
}

// Показанные все отмеченные инпуты:
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

// Показанные карточки:
function showCandidatesCards() {
  // Убрать input.value с инпута во время установки фильстров:
  const searchContainer = document.querySelector(".search-container");
  const input = searchContainer.querySelector("input");
  input.value = "";

  const candidatesCards = document.querySelector(".candidates__cards");
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
    // Отображение надписи:
    return (candidatesCards.innerHTML = `<h3 class="candidates__notFound">Установите нужные фильтры или воспользуйтесь поиском</h3>`);
  }

  if (selectedInputs[locationKey].length) {
    // const locationSearch = (searchArray.length ? searchArray : candidatesItems).filter((elem) => {
    searchArray = (searchArray.length ? searchArray : candidatesItems).filter((elem) => {
      return selectedInputs[locationKey].find((location) => {
        return location === elem[locationKey].toLowerCase();
      });
    });
    // console.log(searchArray.length);
  }

  if (selectedInputs[directionsKey].length) {
    // const directionsSearch = (searchArray.length ? searchArray : candidatesItems).filter((elem) => {
    searchArray = (searchArray.length ? searchArray : candidatesItems).filter((elem) => {
      return selectedInputs[directionsKey].find((direction) => {
        return direction === elem[directionsKey].toLowerCase();
      });
    });
    // console.log(searchArray.length);
  }

  if (selectedInputs[levelsKey].length) {
    // const levelsSearch = searchArray.filter((elem) => {
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
      .join("") || `<h3 class="candidates__notFound">Ничего не найдено по Вашему запросу.</h3>`;

  // количество найденных вакансий в строке поиска:
  displayQtyJobVacancies(searchArray);
}
showCandidatesCards();

// поиск по инпуту:
function inputSearch() {
  const searchContainer = document.querySelector(".search-container");
  const searchIcon = searchContainer.querySelector("img");
  const input = searchContainer.querySelector("input");

  searchIcon.addEventListener("click", (event) => {
    if (event.target.tagName !== "IMG") return;
    const inputText = input.value;
    // условие по вводу количества символов:
    if (inputText.length < 1 || inputText.startsWith(" ")) return;
    // input.blur();

    searchTitle(inputText);
    candidatesRow.innerHTML = "";
  });

  document.body.addEventListener("keydown", (event) => {
    if (event.code !== "Enter") return;
    const inputText = event.target.value;
    // условие по вводу количества символов:
    if (inputText.length < 1 || inputText.startsWith(" ")) return;
    // input.blur();

    searchTitle(inputText);
    candidatesRow.innerHTML = "";
  });
}
inputSearch();

// функция по поиску названия вакансии:
function searchTitle(intupText) {
  const candidatesCards = document.querySelector(".candidates__cards");
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
      .join("") || `<h3 class="candidates__notFound">Ничего не найдено по Вашему запросу.</h3>`;

  // Отображение количества карточек:
  displayQtyJobVacancies(findedSpecialities);
}

// сброс всех фильтров:
const resetBtn = document.querySelector(".result-candidates__reset-btn");

function resetAllFilters() {
  const candidatesCards = document.querySelector(".candidates__cards");
  // Убрать отмеченные фильтры:
  const inputs = candidatesFilter.querySelectorAll("input");
  inputs.forEach((elem) => {
    if (elem.checked) {
      elem.checked = !elem.checked;
    }
    // корректная работа инпута:
    const label = elem.parentElement;
    const span = label.querySelector("span");
    span.classList.remove("check-active");
  });
  activeInputs = [];

  // Отображение надписи:
  candidatesCards.innerHTML = `<h3 class="candidates__notFound">Установите нужные фильтры или воспользуйтесь поиском</h3>`;

  // Сброс показанных инпутов
  candidatesRow.innerHTML = "";

  // Убрать input.value с инпута во время установки фильстров:
  if (event.target.matches("[class$='result-candidates__reset-btn']")) {
    const searchContainer = document.querySelector(".search-container");
    const input = searchContainer.querySelector("input");
    input.value = "";
  }

  displayQtyJobVacancies(candidatesCards);
}
resetBtn.addEventListener("click", resetAllFilters);

// Кнопка открытия меню фильтров:
const menuIconBtn = document.querySelector(".candidates__hidden-menu img");

function menuIconBtnClick() {
  const candidatesFilter = document.querySelector(".candidates__filter");
  if (candidatesFilter.style.display === "none" || candidatesFilter.style.display === "") {
    candidatesFilter.style.display = "block";
  } else {
    candidatesFilter.style.display = "none";
  }
}
menuIconBtn.addEventListener("click", menuIconBtnClick);

// Закрфтие меню фильтров при нажатии по экрану:
// document.addEventListener("click", (event) => {
//   const candidatesFilter = document.querySelector(".candidates__filter");
//   if (event.target.alt !== "Icon-Settings") {
//     candidatesFilter.style.display = "none";
//   }
// });
