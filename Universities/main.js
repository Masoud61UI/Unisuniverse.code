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
