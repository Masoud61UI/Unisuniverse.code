document.addEventListener("DOMContentLoaded", function () {
  // Navigation
  const initNavigation = () => {
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

  // Validation
  const initValidation = () => {
    const form = document.getElementById("forms-wrapper");
    const submitButton = document.getElementById("submit-button");

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

      const requiredInputs = form.querySelectorAll(
        "input[required]:not(.items-box-input), textarea[required], select[required]"
      );
      requiredInputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = "red";
        } else {
          input.style.borderColor = "#dcdcdc";
        }
      });

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
    initSubmenu,
    initOtherTypesCheckbox,
    initValidation,
  ];

  initFunctions.forEach((init) => init());
});
