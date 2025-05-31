document.addEventListener("DOMContentLoaded", function () {
  // Navigation
  const initNavigation = () => {
    const navbarMenu = document.getElementById("navbar");
    const burgerMenu = document.getElementById("burger");
    const overlayMenu = document.querySelector(".overlay");

    if (!navbarMenu || !burgerMenu || !overlayMenu) return;

    const toggleMenu = () => {
      navbarMenu.classList.toggle("active");
      overlayMenu.classList.toggle("active");
    };

    const collapseSubMenu = () => {
      navbarMenu
        .querySelector(".menu-dropdown.active .submenu")
        .removeAttribute("style");
      navbarMenu
        .querySelector(".menu-dropdown.active")
        .classList.remove("active");
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
  };

  // Format
  const initFormat = () => {
    function toggleDropdown(input) {
      const parent = input.closest(".search-content-items-box-wrapper");
      const dropdown = parent.querySelector(".format-input-clicked-wrapper");

      document
        .querySelectorAll(".format-input-clicked-wrapper")
        .forEach((d) => {
          if (d !== dropdown) d.style.display = "none";
        });

      dropdown.style.display =
        dropdown.style.display === "flex" ? "none" : "flex";
    }

    function getTextWidth(text, font) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      context.font = font || "16px Arial";
      return context.measureText(text).width;
    }

    document.querySelectorAll(".items-box-input").forEach((input) => {
      input.addEventListener("click", function (e) {
        e.stopPropagation();
        toggleDropdown(this);
      });
    });

    document.querySelectorAll(".checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        const dropdown = this.closest(".format-input-clicked-wrapper");
        const input =
          dropdown.previousElementSibling.querySelector(".items-box-input");
        const placeholder = input.querySelector(".items-box-input-placeholder");
        const checkboxes = dropdown.querySelectorAll(".checkbox");

        const selectedItems = Array.from(checkboxes)
          .filter((cb) => cb.checked)
          .map((cb) => cb.value || cb.nextElementSibling.textContent.trim());

        updatePlaceholderText(input, placeholder, selectedItems);
      });
    });

    function updatePlaceholderText(input, placeholder, items) {
      if (items.length === 0) {
        placeholder.textContent = "Select options";
        placeholder.style.color = "#dcdcdc";
        return;
      }

      const maxWidth = input.offsetWidth - 48;
      let displayText = "";
      let currentWidth = 0;
      const ellipsisWidth = getTextWidth("...");
      const separatorWidth = getTextWidth(", ");

      for (let i = 0; i < items.length; i++) {
        const itemWidth = getTextWidth(items[i]);
        const neededWidth = (i > 0 ? separatorWidth : 0) + itemWidth;

        if (
          currentWidth + neededWidth <=
          maxWidth - (i === items.length - 1 ? 0 : ellipsisWidth)
        ) {
          displayText += (i > 0 ? ", " : "") + items[i];
          currentWidth += neededWidth;
        } else {
          if (displayText.length > 0) {
            displayText += ", ...";
          } else {
            displayText = items[i].substring(0, 5) + "...";
          }
          break;
        }
      }

      placeholder.textContent = displayText;
      placeholder.style.color = "#333333";
    }

    document.addEventListener("click", function () {
      document
        .querySelectorAll(".format-input-clicked-wrapper")
        .forEach((d) => {
          d.style.display = "none";
        });
    });

    document
      .querySelectorAll(".format-input-clicked-wrapper")
      .forEach((dropdown) => {
        dropdown.addEventListener("click", function (e) {
          e.stopPropagation();
        });
      });
  };

  // Upload File
  const initUpload = () => {
    const forms = document.querySelectorAll(".photo-upld");
    forms.forEach((form) => {
      const fileInput = form.querySelector(".file-input");
      if (!fileInput) return;

      form.addEventListener("click", () => {
        fileInput.click();
      });

      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
      });
    });
  };

  // Author
  const initAuthor = () => {
    const authorsContainer = document.getElementById("authors-container");
    if (!authorsContainer) return;

    const addAuthor = (parentElement, event) => {
      if (event) event.preventDefault();

      const newUserDetails = document.createElement("div");
      newUserDetails.classList.add("new-author-wrapper");
      newUserDetails.innerHTML = `
        <div class="new-author-top-contents">
          <span>Next Author Info</span>
          <button class="remove-author">Remove</button>
        </div>
        <div class="user_details">
          <div class="input_pox">
            <label class="datails">Full Name :</label>
            <input type="text" placeholder="Anderson Cooper" required />
          </div>
          <div class="input_pox">
            <label class="datails">Affiliation :</label>
            <input type="text" required />
          </div>
          <div class="input_pox">
            <label class="datails">Email <span>(Optional)</span> :</label>
            <input type="text" placeholder="Enter ISBN (if available)" />
          </div>
          <div class="input_pox">
            <label class="datails">Role :</label>
            <input type="text" placeholder="Eg: Corresponding Author" required />
          </div>
          <button class="text-btn">+ Add Next Author</button>
        </div>
      `;

      authorsContainer.appendChild(newUserDetails);
      if (parentElement) {
        parentElement.querySelector("button").style.display = "none";
      }

      const removeButton = newUserDetails.querySelector(".remove-author");
      removeButton.addEventListener("click", function () {
        newUserDetails.remove();
        if (parentElement) {
          parentElement.querySelector("button").style.display = "flex";
        }
      });

      const addButton = newUserDetails.querySelector(".text-btn");
      addButton.addEventListener("click", function (e) {
        addAuthor(this.parentNode, e);
      });
    };

    const initialAddButton = document.querySelector(".text-btn");
    if (initialAddButton) {
      initialAddButton.addEventListener("click", function (e) {
        addAuthor(this.parentNode, e);
      });
    }
  };

  const initSizeUpload = () => {
    const fileInputSize = document.querySelector(".file-input");
    const fileInputReq = document.querySelector("#file-input-req");

    if (!fileInputSize && !fileInputReq ) return;

    if (fileInputSize) {
      fileInputSize.addEventListener("change", function (event) {
        const file = event.target.files[0];
        const maxSize = 20 * 1024 * 1024;

        if (file && file.size > maxSize) {
          alert(
            "The selected file size is larger than 20MB. Please select a smaller file"
          );
          event.target.value = "";
        }
      });
    }

    if (fileInputReq) {
      fileInputReq.addEventListener("change", function (event) {
        const file = event.target.files[0];
        const maxSizeMB =
          parseInt(event.target.getAttribute("data-max-size")) || 500;
        const maxSize = maxSizeMB * 1024 * 1024;

        if (file && file.size > maxSize) {
          alert(
            `The selected file size is larger than ${maxSizeMB}. Please select a smaller file`
          );
          event.target.value = "";
        }
      });
    }
  };

  // Clicked Tags
  const initClickedTags = () => {
    const inputTags = document.querySelectorAll(".input-tag");
    const keywordInput = document.getElementById("keywordInput");
    if (!inputTags.length || !keywordInput) return;

    inputTags.forEach((tag) => {
      let isSelected = false;

      tag.addEventListener("click", () => {
        isSelected = !isSelected;
        tag.classList.toggle("input-tag-clicked");

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
        const event = new Event("input", {
          bubbles: true,
          cancelable: true,
        });
        keywordInput.dispatchEvent(event);
      });
    });
  };

  // Submenu
  const initSubmenu = () => {
    const menuItems = document.querySelectorAll(".side-menu-item");
    if (menuItems.length === 0) return;

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
  };

  // Other Types Checkbox
  const initOtherTypesCheckbox = () => {
    const otherTypesCheckbox = document.getElementById("otherTypesCheckbox");
    const otherCategoryInputFormat = document.getElementById(
      "otherCategoryInputFormat"
    );

    if (!otherTypesCheckbox || !otherCategoryInputFormat) return;

    otherTypesCheckbox.addEventListener("change", function () {
      otherCategoryInputFormat.style.display = this.checked ? "block" : "none";
    });

    otherCategoryInputFormat.style.display = otherTypesCheckbox.checked
      ? "block"
      : "none";
  };

  // Calendar
  const initCalendar = () => {
    const yearOfPublication = document.getElementById("yearOfPublication");
    if (!yearOfPublication) return;

    yearOfPublication.addEventListener("focus", function () {
      this.showPicker();
    });
  };

  // Validation
  const initValidation = () => {
    const form = document.getElementById("forms-wrapper");
    const submitButton = document.getElementById("submit-button");

    function isKeywordsFieldValid() {
      const keywordInput = document.getElementById("keywordInput");
      return keywordInput && keywordInput.value.trim() !== "";
    }

    function resetKeywordsFieldStyle() {
      const keywordInput = document.getElementById("keywordInput");
      if (keywordInput) {
        keywordInput.style.borderColor = "#dcdcdc";
      }
    }

    window.showOtherInput = function (value) {
      const otherCategoryInput = document.getElementById("otherCategoryInput");
      const subcategoriesDiv = document.getElementById("subcategories");
      const subcategorySelect = document.getElementById("category2");

      if (otherCategoryInput) {
        if (value === "other") {
          otherCategoryInput.style.display = "block";
        } else {
          otherCategoryInput.style.display = "none";
          const otherInput = otherCategoryInput.querySelector("input");
          if (otherInput) {
            otherInput.value = "";
            if (typeof resetInputStyle === "function") {
              resetInputStyle(otherInput);
            }
          }
        }
      }

      if (subcategoriesDiv) {
        if (value === "other") {
          subcategoriesDiv.style.display = "none";
        } else {
          subcategoriesDiv.style.display = "block";
        }
      }

      if (subcategorySelect) {
        if (value === "other") {
          subcategorySelect.removeAttribute("required");
        } else {
          subcategorySelect.setAttribute("required", "");
        }

        if (typeof updateSubcategories === "function") {
          updateSubcategories(value);
        }
      }
    };

    window.showOtherInputLanguage = function (value) {
      const otherLanguageInput = document.getElementById(
        "otherCategoryInputLanguage"
      );

      if (otherLanguageInput) {
        if (value === "other") {
          otherLanguageInput.style.display = "block";
        } else {
          otherLanguageInput.style.display = "none";
          const otherInput = otherLanguageInput.querySelector("input");
          if (otherInput) {
            otherInput.value = "";
            resetInputStyle(otherInput);
          }
        }
      }
    };

    function updateSubcategories(mainCategory) {
      const subcategorySelect = document.getElementById("category2");
      subcategorySelect.innerHTML =
        '<option value="">Select a subcategory</option>';

      if (!mainCategory) {
        subcategorySelect.disabled = true;
        return;
      }

      const subcategories = {
        programmingAndTechnology: [
          "Programming Languages (Python, Java, C++)",
          "Web Development",
          "Data Science",
          "Artificial Intelligence",
          "Cybersecurity",
          "Cloud Computing",
          "Game Development",
        ],
        businessAndManagement: [
          "Business Administration",
          "Project Management",
          "Marketing",
          "Entrepreneurship",
          "Human Resources",
          "Finance and Accounting",
          "Leadership and Strategy",
        ],
        foreignLanguages: [
          "English as a Second Language (ESL)",
          "Spanish",
          "French",
          "German",
          "Mandarin Chinese",
          "Japanese",
          "Italian",
        ],
        creativeArtsAndMedia: [
          "Graphic Design",
          "Photography",
          "Film and Video Production",
          "Music Composition and Production",
          "Painting and Drawing",
          "Creative Writing",
        ],
        scienceAndMathematics: [
          "Physics",
          "Chemistry",
          "Biology",
          "Mathematics",
          "Environmental Science",
          "Astronomy",
          "Statistics",
        ],
        healthAndMedicine: [
          "Nursing",
          "Public Health",
          "Nutrition and Dietetics",
          "Psychology",
          "First Aid and Emergency Care",
          "Physical Therapy",
        ],
        socialSciencesAndHumanities: [
          "History",
          "Sociology",
          "Political Science",
          "Philosophy",
          "Anthropology",
          "Cultural Studies",
        ],
        engineeringAndTechnology: [
          "Mechanical Engineering",
          "Civil Engineering",
          "Electrical Engineering",
          "Robotics",
          "Renewable Energy",
        ],
        educationAndTeaching: [
          "Teacher Training",
          "Curriculum Development",
          "Special Education",
          "Early Childhood Education",
          "Instructional Design",
        ],
        personalDevelopment: [
          "Time Management",
          "Communication Skills",
          "Emotional Intelligence",
          "Public Speaking",
          "Personal Finance",
        ],
        lawAndLegalStudies: [
          "Criminal Law",
          "Corporate Law",
          "International Law",
          "Legal Research",
        ],
        lifestyleAndWellness: [
          "Yoga and Meditation",
          "Fitness Training",
          "Cooking and Culinary Arts",
          "Interior Design",
        ],
      };

      if (subcategories[mainCategory]) {
        subcategories[mainCategory].forEach((sub) => {
          const option = document.createElement("option");
          option.value = sub.toLowerCase().replace(/\s+/g, "-");
          option.textContent = sub;
          subcategorySelect.appendChild(option);
        });
        subcategorySelect.disabled = false;
      } else {
        subcategorySelect.disabled = true;
      }
    }

    function resetInputStyle(element) {
      element.style.border = "1px solid #dcdcdc";
      const photoUploadDiv = element.closest(".photo-upld");
      if (photoUploadDiv) {
        photoUploadDiv.style.border = "";
      }
    }

    function isItemsBoxFilled(box) {
      const targetId = box.id;
      const checkboxes = document.querySelectorAll(
        `.format-input-clicked-wrapper[data-target="${targetId}"] .checkbox`
      );

      let atLeastOneChecked = false;
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          atLeastOneChecked = true;
        }
      });

      return atLeastOneChecked;
    }

    function setupInputListeners() {
      const requiredInputs = form.querySelectorAll("[required]");

      requiredInputs.forEach((input) => {
        input.addEventListener("input", function () {
          if (this.value.trim() !== "") {
            resetInputStyle(this);
          }
        });

        input.addEventListener("change", function () {
          if (this.value.trim() !== "") {
            resetInputStyle(this);
          }
        });
      });

      const keywordInput = document.getElementById("keywordInput");
      if (keywordInput) {
        keywordInput.addEventListener("input", function () {
          if (this.value.trim() !== "") {
            resetInputStyle(this);
          }
        });

        const observer = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            if (
              mutation.type === "attributes" &&
              mutation.attributeName === "value"
            ) {
              if (keywordInput.value.trim() !== "") {
                resetInputStyle(keywordInput);
              }
            }
          });
        });

        observer.observe(keywordInput, {
          attributes: true,
          attributeFilter: ["value"],
        });
      }

      const itemsBoxInputs = form.querySelectorAll(
        ".items-box-input[required]"
      );

      if (itemsBoxInputs.length === 0) return;

      itemsBoxInputs.forEach((box) => {
        const targetId = box.id;
        const checkboxes = document.querySelectorAll(
          `.format-input-clicked-wrapper[data-target="${targetId}"] .checkbox`
        );

        checkboxes.forEach((checkbox) => {
          checkbox.addEventListener("change", function () {
            if (isItemsBoxFilled(box)) {
              resetInputStyle(box);
            } else {
              box.style.border = "1px solid red";
            }
          });
        });

        box.addEventListener("click", function () {
          if (isItemsBoxFilled(box)) {
            resetInputStyle(box);
          }
        });
      });
    }

    setupInputListeners();

    function showErrorModal(message) {
      const modal = document.getElementById("error-modal");
      const modalMessage = document.getElementById("modal-message");

      modalMessage.textContent = message;

      modal.style.display = "block";

      setTimeout(() => {
        if (modal.style.display === "block") {
          hideErrorModal();
        }
      }, 4000);
    }

    function hideErrorModal() {
      document.getElementById("error-modal").style.display = "none";
    }

    document
      .querySelector(".close-modal")
      ?.addEventListener("click", hideErrorModal);
    document
      .querySelector(".modal-button")
      ?.addEventListener("click", hideErrorModal);

    submitButton.addEventListener("click", function (event) {
      event.preventDefault();
      let isValid = true;
      let termsError = false;

      const requiredItemsBoxes = form.querySelectorAll(
        ".items-box-input[required]"
      );
      requiredItemsBoxes.forEach((box) => {
        if (!isItemsBoxFilled(box)) {
          isValid = false;
          box.style.border = "1px solid red";
        } else {
          resetInputStyle(box);
        }
      });

      const requiredInputs = form.querySelectorAll("[required]");
      requiredInputs.forEach((input) => {
        if (input.type === "file") {
          if (input.files.length === 0) {
            isValid = false;
            const photoUploadDiv = input.closest(".photo-upld");
            if (photoUploadDiv) {
              photoUploadDiv.style.border = "1px solid red";
            }
          }
        } else if (input.type === "checkbox") {
          if (!input.checked) {
            if (input.id === "terms" || input.id === "copyright") {
              termsError = true;
            }
            isValid = false;
          }
        } else {
          const value = input.value;
          if (!value || (typeof value === "string" && !value.trim())) {
            isValid = false;
            input.style.borderColor = "red";
          } else {
            input.style.borderColor = "#dcdcdc";
            const photoUploadDiv = input.closest(".photo-upld");
            if (photoUploadDiv) {
              photoUploadDiv.style.border = "";
            }
          }
        }
      });

      const category1 = document.getElementById("category1");
      const subCategory = document.getElementById("category2");

      if (category1 && subCategory) {
        const mainCategory = category1.value;
        if (mainCategory && !subCategory.disabled && !subCategory.value) {
          isValid = false;
          subCategory.style.borderColor = "red";
        }
      }

      const keywordInput = document.getElementById("keywordInput");
      if (keywordInput && keywordInput.required && !isKeywordsFieldValid()) {
        isValid = false;
        keywordInput.style.borderColor = "red";
      } else {
        resetKeywordsFieldStyle();
      }

      const fileInputsReq = form.querySelectorAll(
        'input[type="file"][required]'
      );
      fileInputsReq.forEach((fileInput) => {
        if (fileInput.files.length === 0) {
          isValid = false;
          const photoUploadDiv = fileInput.closest(".photo-upld");
          if (photoUploadDiv) {
            photoUploadDiv.style.border = "1px solid red";
          }
        } else {
          const photoUploadDiv = fileInput.closest(".photo-upld");
          if (photoUploadDiv) {
            photoUploadDiv.style.border = "";
          }
        }
      });

      const termsCheckbox = document.getElementById("terms");
      if (termsCheckbox?.required && !termsCheckbox?.checked) {
        termsError = true;
        isValid = false;
      }

      if (!isValid) {
        if (
          termsError &&
          !document.querySelector(
            '[style*="border: 1px solid red"], [style*="border-color: red"]'
          )
        ) {
          showErrorModal("You must accept the terms and conditions to proceed");
        } else {
          showErrorModal("Please fill in all required fields");
        }

        const firstErrorField = document.querySelector(
          '[style*="border: 1px solid red"], [style*="border-color: red"]'
        );
        if (firstErrorField) {
          firstErrorField.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      } else {
        form.submit();
      }
    });
  };

  const initFunctions = [
    initNavigation,
    initFormat,
    initUpload,
    initAuthor,
    initSizeUpload,
    initClickedTags,
    initSubmenu,
    initOtherTypesCheckbox,
    initCalendar,
    initValidation,
  ];

  initFunctions.forEach((init) => init());
});
