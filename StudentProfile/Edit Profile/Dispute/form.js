document.addEventListener("DOMContentLoaded", function () {
  const form =
    document.forms[0] ||
    document.querySelector("form") ||
    document.querySelector(".dispute-forms-wrapper form");

  if (!form) return;

  const submitBtn =
    document.querySelector(".btn-medium") ||
    form.querySelector('button[type="submit"]');

  const errorModal = document.getElementById("error-modal");
  const successModal = document.getElementById("success-modal");

  const verdictSelect = document.getElementById("verdictSelect");
  const percentageDivision = document.getElementById("percentageDivision");
  const percentageInput = percentageDivision
    ? percentageDivision.querySelector("input")
    : null;

  if (verdictSelect && percentageDivision && percentageInput) {
    togglePercentageField();
    verdictSelect.addEventListener("change", togglePercentageField);

    function togglePercentageField() {
      if (verdictSelect.value === "split") {
        percentageDivision.style.display = "block";
        percentageInput.setAttribute("required", "required");
      } else {
        percentageDivision.style.display = "none";
        percentageInput.removeAttribute("required");
        percentageInput.style.borderColor = "#dcdcdc";
      }
    }
  }

  document
    .querySelector("#error-modal .modal-button")
    ?.addEventListener("click", function () {
      if (errorModal) {
        errorModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });

  const termsCheckbox = document.getElementById("terms");
  if (termsCheckbox) {
    termsCheckbox.addEventListener("change", function () {
      if (this.checked) {
        this.closest(".checkboxContainer").style.border = "none";
      }
    });
  }

  const showModal = (modal) => {
    if (!modal) return;

    modal.style.display = "block";
    modal.setAttribute("data-open", "true");

    if (modal === errorModal) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setTimeout(() => {
        if (modal.style.display === "block") {
          modal.style.display = "none";
        }
      }, 4000);
    }
  };

  const closeSuccessModalBtn = document.getElementById("close-suc-modal");
  if (closeSuccessModalBtn) {
    closeSuccessModalBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const successModal = document.getElementById("success-modal");

      if (successModal) {
        successModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }

  const validate = () => {
    let isValid = true;
    let firstErrorField = null;

    form.querySelectorAll("[required]").forEach((field) => {
      if (
        percentageInput &&
        field === percentageInput &&
        percentageDivision.style.display === "none"
      ) {
        return;
      }

      const isEmpty =
        !field.value ||
        (field.type === "file" && !field.files.length) ||
        (field.type === "checkbox" && !field.checked);

      if (isEmpty) {
        isValid = false;
        if (field.type === "checkbox") {
          field.closest(".checkboxContainer").style.border = "1px solid red";
          field.closest(".checkboxContainer").style.padding = "8px";
          field.closest(".checkboxContainer").style.borderRadius = "4px";
        } else {
          field.style.borderColor = "red";
        }

        if (!firstErrorField) {
          firstErrorField =
            field.type === "checkbox"
              ? field.closest(".checkboxContainer")
              : field;
        }
      } else {
        if (field.type === "checkbox") {
          field.closest(".checkboxContainer").style.border = "none";
        } else {
          field.style.borderColor = "#dcdcdc";
        }
      }
    });

    return { isValid, firstErrorField };
  };

  if (submitBtn) {
    submitBtn.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();

      const { isValid, firstErrorField } = validate();

      if (isValid) {
        showModal(successModal);
      } else {
        showModal(errorModal);

        if (firstErrorField) {
          firstErrorField.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    };
  }

  document.querySelectorAll(".modal-button").forEach((btn) => {
    btn.onclick = () => {
      document.querySelectorAll(".modal-cont").forEach((m) => {
        m.style.display = "none";
      });
    };
  });

  form.querySelectorAll("[required]").forEach((field) => {
    field.addEventListener("input", function () {
      if (this.value.trim()) {
        this.style.borderColor = "#dcdcdc";
      }
    });

    if (field.type === "file") {
      field.addEventListener("change", function () {
        if (this.files.length > 0) {
          this.style.borderColor = "#dcdcdc";
          const uploadDiv = this.closest(".photo-upld");
          if (uploadDiv) uploadDiv.style.border = "";
        }
      });
    }
  });
});
