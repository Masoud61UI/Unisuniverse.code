document.addEventListener("DOMContentLoaded", function () {
  // valid inputs
  const form = document.getElementById("signup-form");
  if (!form) return;

  const submitBtn = form.querySelector("#submit-button");
  const modalCont = document.querySelector(".modal-cont");
  if (modalCont) modalCont.style.display = "none";

  const checkbox = form.querySelector("#readterms");
  const passwordInput = form.querySelector("#password");
  const confirmPasswordInput = form.querySelector("#confirm-password");

  function showErrorModal(message) {
    const errorModal = document.getElementById("error-modal");
    if (!errorModal) return;

    const modalMessage = errorModal.querySelector("#modal-message");
    if (modalMessage) modalMessage.textContent = message;

    errorModal.style.display = "block";

    setTimeout(() => {
      if (errorModal.style.display === "block") {
        errorModal.style.display = "none";
      }
    }, 4000);
  }

  function hideErrorModal() {
    const errorModal = document.getElementById("error-modal");
    if (errorModal) errorModal.style.display = "none";
  }

  function showSuccessModal() {
    if (modalCont) {
      modalCont.style.display = "block";
      modalCont.classList.remove("fade-out");
    }
  }

  document
    .querySelector(".modal-button")
    ?.addEventListener("click", hideErrorModal);

  const passwordRegex = /.{8,}/;

  submitBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    let isValid = true;
    let errorMessage = "";

    form.querySelectorAll("input").forEach((input) => {
      input.style.borderColor = "#dcdcdc";
    });

    for (const input of form.elements) {
      if (
        (input.type === "text" ||
          input.type === "email" ||
          input.type === "password") &&
        input.required &&
        input.value === ""
      ) {
        input.style.borderColor = "red";
        isValid = false;
      }
    }

    if (!isValid) {
      errorMessage = "Please fill in all required fields";
    } else if (checkbox && checkbox.required && !checkbox.checked) {
      errorMessage = "You must accept the terms and conditions to proceed";
      isValid = false;
    } else if (passwordInput && confirmPasswordInput) {
      if (!passwordRegex.test(passwordInput.value)) {
        errorMessage = "Password must be at least 8 characters";
        passwordInput.style.borderColor = "red";
        isValid = false;
      } else if (passwordInput.value !== confirmPasswordInput.value) {
        errorMessage = "The password and its confirmation do not match";
        passwordInput.style.borderColor = "red";
        confirmPasswordInput.style.borderColor = "red";
        isValid = false;
      }
    }

    if (!isValid) {
      showErrorModal(errorMessage);

      const firstErrorField = document.querySelector(
        '[style*="border-color: red"]'
      );
      if (firstErrorField) {
        firstErrorField.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    } else {
      showSuccessModal();
    }
  });

  form.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", function () {
      if (this.value.trim() !== "") {
        this.style.borderColor = "#dcdcdc";
      }
    });
  });

  // notice modal
  const noticeModal = document.querySelector(".modal-notice");
  if (noticeModal && localStorage.getItem("modalRead") === "true") {
    noticeModal.style.display = "none";
  }

  const noticeButton = document.getElementById("read-notice-button");
  noticeButton?.addEventListener("click", function () {
    const modal = document.querySelector(".modal-notice");
    if (modal) {
      modal.classList.add("fade-out");
      setTimeout(() => {
        modal.style.display = "none";
        localStorage.setItem("modalRead", "true");
      }, 400);
    }
  });

  const modalContBtn = document.getElementById("modal-cont-btn");
  modalContBtn?.addEventListener("click", function () {
    if (modalCont) {
      modalCont.classList.add("fade-out");
      setTimeout(() => {
        modalCont.style.display = "none";
      }, 400);
    }
  });
});
