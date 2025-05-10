const navbarMenu = document.getElementById("navbar");
const burgerMenu = document.getElementById("burger");
const overlayMenu = document.querySelector(".overlay");

const toggleMenu = () => {
  navbarMenu.classList.toggle("active");
  overlayMenu.classList.toggle("active");
};

const collapseSubMenu = () => {
  navbarMenu
    .querySelector(".menu-dropdown.active .submenu")
    .removeAttribute("style");
  navbarMenu.querySelector(".menu-dropdown.active").classList.remove("active");
};

const toggleSubMenu = (e) => {
  if (e.target.hasAttribute("data-toggle") && window.innerWidth <= 992) {
    e.preventDefault();
    const menuDropdown = e.target.parentElement;

    if (menuDropdown.classList.contains("active")) {
      collapseSubMenu();
    } else {
      if (navbarMenu.querySelector(".menu-dropdown.active")) {
        collapseSubMenu();
      }

      menuDropdown.classList.add("active");
      const subMenu = menuDropdown.querySelector(".submenu");
      subMenu.style.maxHeight = subMenu.scrollHeight + "px";
    }
  }
};

const resizeWindow = () => {
  if (window.innerWidth > 992) {
    if (navbarMenu.classList.contains("active")) {
      toggleMenu();
    }
    if (navbarMenu.querySelector(".menu-dropdown.active")) {
      collapseSubMenu();
    }
  }
};

burgerMenu.addEventListener("click", toggleMenu);
overlayMenu.addEventListener("click", toggleMenu);
navbarMenu.addEventListener("click", toggleSubMenu);
window.addEventListener("resize", resizeWindow);

// log in
let closeBut = document.getElementsByClassName("close")[0],
  modal = document.getElementsByClassName("modal-cont")[0],
  loginBut = document.getElementsByClassName("btn-md")[0],
  loginRes = document.querySelector("#btn-md"),
  newAcc = document.getElementsByClassName("new-acc")[0],
  popupBoxs = document.getElementsByClassName("popup-boxs")[0],
  modalBox = document.getElementsByClassName("modal-box")[0];

//close
function x() {
  modal.style.display = "none";
  popupBoxs.style.display = "none";
  modalBox.style.display = "block";
}
closeBut.onclick = x;

loginBut.onclick = function () {
  modal.style.display = "block";
  popupBoxs.style.display = "none";
  modalBox.style.display = "block";
};
loginRes.onclick = function () {
  modal.style.display = "block";
  popupBoxs.style.display = "none";
  modalBox.style.display = "block";
};

window.onclick = function (e) {
  if (e.target.className === "modal-cont") {
    e.target.style.display = "none";
    popupBoxs.style.display = "none";
    modalBox.style.display = "block";
  }
};

// new acc
newAcc.onclick = function () {
  popupBoxs.style.display = "flex";
  modalBox.style.display = "none";
};

// continent

const buttons = document.querySelectorAll(".search-content-items-continent");

for (const button of buttons) {
  button.addEventListener("click", function () {
    this.classList.toggle("active-continent");
  });
}

// Forms Type

function updateSelectedOptions(
  checkboxClass,
  outputElementId,
  placeholderElement
) {
  const checkboxes = document.querySelectorAll(
    `.${checkboxClass} input[type="checkbox"]`
  );
  const selectedItems = [];

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const itemName = checkbox.nextElementSibling.textContent;
      selectedItems.push(itemName);
    }
  });

  const outputElement = document.getElementById(outputElementId);
  const inputWrapper = placeholderElement.parentElement;

  if (selectedItems.length > 0) {
    outputElement.textContent = selectedItems.join(", ");
    inputWrapper.classList.add("has-selection");

    if (outputElement.scrollWidth > outputElement.clientWidth) {
      let text = outputElement.textContent;
      while (
        outputElement.scrollWidth > outputElement.clientWidth &&
        text.length > 0
      ) {
        text = text.slice(0, -1);
        outputElement.textContent = text + "...";
      }
    }
  } else {
    outputElement.textContent = "";
    inputWrapper.classList.remove("has-selection");
  }
}

// Country
const countryInput = document.getElementById("country");
const countryClickedWrapper = document.querySelector(
  ".country-input-clicked-wrapper"
);
const countryPlaceholder = document.querySelector(
  "#country .items-box-input-placeholder"
);

countryInput.addEventListener("click", function () {
  countryClickedWrapper.classList.toggle("toggle-display");
});

// Field
const fieldInput = document.getElementById("field");
const fieldClickedWrapper = document.querySelector(
  ".field-input-clicked-wrapper"
);
const fieldPlaceholder = document.querySelector(
  "#field .items-box-input-placeholder"
);

fieldInput.addEventListener("click", function () {
  fieldClickedWrapper.classList.toggle("toggle-display");
});

document.querySelectorAll(".country .checkbox").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    updateSelectedOptions("country", "selected-countries", countryPlaceholder);
  });
});

document.querySelectorAll(".field .checkbox").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    updateSelectedOptions("field", "selected-fields", fieldPlaceholder);
  });
});

window.addEventListener("click", function (event) {
  if (
    !countryInput.contains(event.target) &&
    !countryClickedWrapper.contains(event.target)
  ) {
    countryClickedWrapper.classList.remove("toggle-display");
  }

  if (
    !fieldInput.contains(event.target) &&
    !fieldClickedWrapper.contains(event.target)
  ) {
    fieldClickedWrapper.classList.remove("toggle-display");
  }
});

// Filter Search box

const filterSearchBox = document.getElementById("filter-searchbox");
const filterSearchBoxClicked = document.getElementsByClassName(
  "filter-btn-clicked-wrapper"
)[0];

filterSearchBox.addEventListener("click", function () {
  filterSearchBoxClicked.classList.toggle("toggle-display");
});

window.addEventListener("click", function (event) {
  if (
    !filterSearchBox.contains(event.target) &&
    !filterSearchBoxClicked.contains(event.target)
  ) {
    filterSearchBoxClicked.classList.remove("toggle-display");
  }
});

// Filter University List

const filterUniversity = document.getElementById("filter-university");
const filterUniversityClicked = document.getElementsByClassName(
  "filter-unibtn-clicked-wrapper"
)[0];

filterUniversity.addEventListener("click", function () {
  filterUniversityClicked.classList.toggle("toggle-display");
});

window.addEventListener("click", function (event) {
  if (
    !filterUniversity.contains(event.target) &&
    !filterUniversityClicked.contains(event.target)
  ) {
    filterUniversityClicked.classList.remove("toggle-display");
  }
});
