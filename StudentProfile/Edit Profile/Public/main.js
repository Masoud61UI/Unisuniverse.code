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

// Click More btn

let moreBtn = document.getElementById("btn-more");
const moreModal = document.getElementsByClassName("btn-sm-more-clicked")[0];

moreBtn.addEventListener("click", function (event) {
  event.stopPropagation();
  moreModal.style.display = "block";
});

window.addEventListener("click", function (event) {
  if (!moreModal.contains(event.target) && event.target !== moreBtn) {
    moreModal.style.display = "none";
  }
});

// search chat

function search_chat() {
  let searchInput = document.getElementById("searchbar").value;
  searchInput = searchInput.toLowerCase();
  let x = document.getElementsByClassName("userchat");
  for (i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(searchInput)) {
      x[i].style.display = "none";
    } else {
      x[i].style.display = "flex";
    }
  }
}

// send pm

const chatMessages = document.getElementById("chat-send");
const userInput = document.getElementById("user-input");

function sendMessage() {
  const userMessage = userInput.value;
  if (userMessage.trim() !== "") {
    displayMessage("You ", userMessage);
    userInput.value = "";
  }
}

function displayMessage(sender, message) {
  const messageElement = document.createElement("p");
  messageElement.classList.add("inner-pm");
  messageElement.textContent = `${sender}: ${message}`;
  chatMessages.appendChild(messageElement);
  scrollToBottom();
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

let chatHistory = document.getElementById("inner-user-chat");
chatHistory.scrollTop = chatHistory.scrollHeight;

function scrollToBottom() {
  let chatHistory = document.getElementById("inner-user-chat");
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

// show hide box

let topBar = document.getElementsByClassName("top-bar")[0];

topBar.addEventListener("click", function () {
  const sendBox = document.getElementsByClassName("send-box")[0];
  sendBox.classList.toggle("toggle-display");
});

// show hide inner chat

let chats = document.getElementById("chats");
let innerChat = document.getElementById("inner-chat");
let userChat = document.querySelectorAll("#userchat");
let backInner = document.getElementsByClassName("back-inner")[0];
let searchForm = document.getElementsByClassName("search-form")[0];
let topBox = document.getElementById("top-bar-box");

document.querySelector(".kapsayici").onclick = function () {
  backInner.classList.toggle("toggle-display");
  if (document.getElementById("check").checked) {
    document.querySelector(".symbol").style.transform = "rotate(-90deg)";
  } else {
    document.querySelector(".symbol").style.transform = "rotate(90deg)";
  }
};

function backchat() {
  innerChat.style.display = "none";
  chats.style.display = "block";
  searchForm.style.display = "block";
}
backInner.addEventListener("click", function () {
  backchat();
});

function chatsFun() {
  chats.style.display = "none";
  searchForm.style.display = "none";
  innerChat.style.display = "block";
}

userChat.forEach((pm) => {
  pm.addEventListener("click", function () {
    chatsFun();
  });
});

// search Product

function search_product() {
  let searchProduct = document.getElementById("searchproduct").value;
  searchProduct = searchProduct.toLowerCase();
  let productsBox = document.querySelectorAll("#products");

  for (i = 0; i < productsBox.length; i++) {
    if (!productsBox[i].innerHTML.toLowerCase().includes(searchProduct)) {
      productsBox[i].style.display = "none";
    } else {
      productsBox[i].style.display = "flex";
    }
  }
}

// search Service

function search_service() {
  let searchService = document.getElementById("search-service").value;
  searchService = searchService.toLowerCase();
  let serviceBox = document.querySelectorAll("#services");

  for (i = 0; i < serviceBox.length; i++) {
    if (!serviceBox[i].innerHTML.toLowerCase().includes(searchService)) {
      serviceBox[i].style.display = "none";
    } else {
      serviceBox[i].style.display = "block";
    }
  }
}

// Grid or List Products

let select = document.getElementById("my-select");
let gridView = document.getElementById("grid-view");
let listView = document.getElementById("list-view");

select.addEventListener("change", (e) => {
  let country = e.target.value;
  if (country === "grid") {
    gridView.style.display = "flex";
    listView.style.display = "none";
  } else {
    gridView.style.display = "none";
    listView.style.display = "flex";
  }
});

// Show Modal People

let closeModal = document.getElementsByClassName("close-people-modal")[0],
  modalPeople = document.getElementsByClassName("modal-people-wrapper")[0],
  showBut = document.getElementsByClassName("user-information-showbtn")[0];

//close Modal People

function closeModal_people() {
  modalPeople.style.display = "none";
}

showBut.onclick = function () {
  modalPeople.style.display = "block";
};

window.onclick = function (e) {
  if (e.target.className === "modal-people-wrapper") {
    e.target.style.display = "none";
  }
};

// Modals Section

function createModal(
  modalId,
  closeButtonId,
  modalWrapperClass,
  modalIndex,
  openModalId,
  innerModalId,
  closeInnerModalId,
  previousModalId
) {
  const closeModalButton = document.getElementById(closeButtonId);
  const modalWrappers = document.querySelectorAll(`.${modalWrapperClass}`);
  const modalWrapper = modalWrappers[modalIndex];
  const modalTrigger = document.getElementById(modalId);

  if (!closeModalButton || !modalWrapper || !modalTrigger) {
    console.error(
      "Missing element for modal:",
      modalId,
      closeButtonId,
      modalWrapperClass
    );
    return;
  }

  function closeModal() {
    modalWrapper.style.display = "none";
  }

  modalTrigger.onclick = () => {
    modalWrapper.style.display = "block";
  };

  closeModalButton.onclick = closeModal;

  modalWrapper.addEventListener("click", (e) => {
    if (e.target === modalWrapper) {
      closeModal();
    }
  });

  if (innerModalId && openModalId && closeInnerModalId && previousModalId) {
    const innerModalOpenTriggers = document.querySelectorAll(openModalId);
    const innerModal = document.getElementById(innerModalId);
    const closeInnerModal = document.getElementById(closeInnerModalId);
    const previousModal = document.querySelectorAll(previousModalId)[0];

    if (!innerModal || !closeInnerModal || !previousModal) {
      console.error(
        "Missing element for inner modal:",
        innerModalId,
        closeInnerModalId,
        previousModalId
      );
      return;
    }

    innerModalOpenTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        innerModal.style.display = "flex";
        previousModal.style.display = "none";
      });
    });

    closeInnerModal.onclick = () => {
      innerModal.style.display = "none";
      previousModal.style.display = "block";
    };
  }
}

createModal(
  "summary-modal",
  "close-modal-summary",
  "modal-user-information-wrapper",
  0
);
createModal(
  "education-modal",
  "close-modal-education",
  "modal-user-information-wrapper",
  1,
  "#open-inner-edit-modal-education",
  "inner-education-modal",
  "close-inner-modal-edit-education",
  "#edit-modal-education"
);
createModal(
  "experience-modal",
  "close-modal-experience",
  "modal-user-information-wrapper",
  2,
  "#open-inner-edit-modal-experience",
  "inner-experience-modal",
  "close-inner-modal-edit-experience",
  "#edit-modal-experience"
);
createModal(
  "skill-modal",
  "close-modal-skill",
  "modal-user-information-wrapper",
  3,
  "#open-inner-edit-modal-skill",
  "inner-skill-modal",
  "close-inner-modal-edit-skill",
  "#edit-modal-skill"
);
createModal(
  "language-modal",
  "close-modal-language",
  "modal-user-information-wrapper",
  4,
  "#open-inner-edit-modal-language",
  "inner-language-modal",
  "close-inner-modal-edit-language",
  "#edit-modal-language"
);
createModal(
  "publication-modal",
  "close-modal-publication",
  "modal-user-information-wrapper",
  5,
  "#open-inner-edit-modal-publication",
  "inner-publication-modal",
  "close-inner-modal-edit-publication",
  "#edit-modal-publication"
);
createModal(
  "certification-modal",
  "close-modal-certification",
  "modal-user-information-wrapper",
  6,
  "#open-inner-edit-modal-certification",
  "inner-certification-modal",
  "close-inner-modal-edit-certification",
  "#edit-modal-certification"
);
createModal(
  "achievements-modal",
  "close-modal-achievements",
  "modal-user-information-wrapper",
  7,
  "#open-inner-edit-modal-achievements",
  "inner-achievements-modal",
  "close-inner-modal-edit-achievements",
  "#edit-modal-achievements"
);

// acordion

const items = document.querySelectorAll(".author-accordions-title-down button");

function toggleAccordion() {
  const itemToggle = this.getAttribute("aria-expanded");

  for (i = 0; i < items.length; i++) {
    items[i].setAttribute("aria-expanded", "false");
  }

  if (itemToggle == "false") {
    this.setAttribute("aria-expanded", "true");
  }
}

items.forEach((item) => item.addEventListener("click", toggleAccordion));
