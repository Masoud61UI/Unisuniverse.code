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

// format

const countryInput = document.querySelector("#format");

const countryClickedWrapper = document.getElementsByClassName(
  "format-input-clicked-wrapper"
)[0];

countryInput.addEventListener("click", function () {
  countryClickedWrapper.classList.toggle("toggle-display");
});

window.addEventListener("click", function (event) {
  if (
    !countryInput.contains(event.target) &&
    !countryClickedWrapper.contains(event.target)
  ) {
    countryClickedWrapper.classList.remove("toggle-display");
  }
});

// selected other

const otherTypesCheckbox = document.getElementById("otherTypesCheckbox");
const otherCategoryInputFormat = document.getElementById(
  "otherCategoryInputFormat"
);

otherTypesCheckbox.addEventListener("change", function () {
  if (this.checked) {
    otherCategoryInputFormat.style.display = "block";
  } else {
    otherCategoryInputFormat.style.display = "none";
  }
});

// upload File

const forms = document.querySelectorAll(".photo-upld");
forms.forEach((form) => {
  const fileInput = form.querySelector(".file-input");
  const progressArea = form.querySelector(".progress-area");
  const uploadedArea = form.querySelector(".uploaded-area");

  form.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.onchange = ({ target }) => {
    let file = target.files[0];
    if (file) {
      let fileName = file.name;
    }
  };
});

// submenu

document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".side-menu-item");

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      menuItems.forEach((menuItem) => {
        menuItem.classList.remove("checked-tab");
      });

      item.classList.add("checked-tab");

      const subMenu = item.querySelector(".sub-menu-wrapper");
      subMenu.classList.add("show");
      subMenu.style.display =
        subMenu.style.display === "block" ? "none" : "block";
    });
  });
});

// Choice other

function showOtherInput(selectedValue) {
  const otherInput = document.getElementById("otherCategoryInput");

  if (selectedValue === "other") {
    otherInput.style.display = "block";
  } else {
    otherInput.style.display = "none";
  }
}

// Size Upload

const fileInputSize = document.querySelector(".file-input");

fileInputSize.addEventListener("change", function (event) {
  const file = event.target.files[0];
  const maxSize = 20 * 1024 * 1024;

  if (file.size > maxSize) {
    alert(
      "The selected file size is larger than 20MB. Please select a smaller file"
    );
    fileInputSize.value = "";
  }
});

// Clicked Tags

const inputTags = document.querySelectorAll(".input-tag");

inputTags.forEach((tag) => {
  tag.addEventListener("click", () => {
    tag.classList.toggle("input-tag-clicked");
  });
});

const keywordInput = document.getElementById("keywordInput");

inputTags.forEach((tag) => {
  let isSelected = false;

  tag.addEventListener("click", () => {
    isSelected = !isSelected;

    const tagText = tag.textContent;
    let keywords = keywordInput.value;

    if (isSelected) {
      keywords += (keywords ? ", " : "") + tagText;
    } else {
      const textToRemove = keywords.includes(", " + tagText)
        ? ", " + tagText
        : tagText;
      keywords = keywords.replace(textToRemove, "");
      keywords = keywords.replace(/^, +/g, "");
      keywords = keywords.replace(/, +$/g, "");
    }
    keywordInput.value = keywords;
  });
});

// Validation of inputs

const form = document.getElementById("forms-wrapper");
const submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  let isValid = true;
  const requiredInputs = form.querySelectorAll("[required]");
  const fileInputsReq = form.querySelectorAll("#file-input-req");
  const checkboxes = form.querySelectorAll(".checkbox");

  requiredInputs.forEach((input) => {
    if (!input.value) {
      isValid = false;
      input.style.borderColor = "red";
    } else {
      input.style.borderColor = "";
    }
  });

  fileInputsReq.forEach((fileInput) => {
    if (fileInput.files.length === 0) {
      isValid = false;
      alert("You must upload a file.");
      return;
    }
  });

  checkboxes.forEach((checkbox) => {
    if (checkbox.required && !checkbox.checked) {
      isValid = false;
    }
  });

  if (!isValid) {
    let uncheckedCheckboxes = Array.from(checkboxes).filter(
      (checkbox) => checkbox.required && !checkbox.checked
    );

    if (uncheckedCheckboxes.length > 0) {
      alert(
        "You must agree to the terms and conditions and confirm your rights to sell the e-book."
      );
    } else {
      alert(
        "Please fill in all the required fields that are highlighted in red."
      );
    }
  } else {
    form.submit();
  }
});
