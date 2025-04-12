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

// acordion

const items = document.querySelectorAll(".accordion-item button");

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

// acordion inner

const itemsinner = document.querySelectorAll(".accordion-inner");

function toggleAccordionInner() {
  const itemToggleInner = this.getAttribute("aria-expanded");

  for (i = 0; i < itemsinner.length; i++) {
    itemsinner[i].setAttribute("aria-expanded", "false");
  }

  if (itemToggleInner == "false") {
    this.setAttribute("aria-expanded", "true");
  }
}

itemsinner.forEach((iteminner) =>
  iteminner.addEventListener("click", toggleAccordionInner)
);

// toggle

const mainToggle = document.getElementById("switch");
const innerWrapper = document.querySelector(".inner-toggle-wrapper");

mainToggle.addEventListener("change", () => {
  if (mainToggle.checked) {
    innerWrapper.classList.add("active");
  } else {
    innerWrapper.classList.remove("active");

    const innerToggles = innerWrapper.querySelectorAll(
      'input[type="checkbox"]'
    );
    innerToggles.forEach((toggle) => {
      toggle.checked = false;
    });
  }
});
