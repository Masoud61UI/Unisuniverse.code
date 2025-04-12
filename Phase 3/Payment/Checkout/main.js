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

// Price Qty

const productPriceElements = document.querySelectorAll(".order-price");
const quantitySelects = document.querySelectorAll(".select-input");

productPriceElements.forEach((priceElement) => {
  const initialPrice = parseFloat(
    priceElement.textContent.replace(/\$|\,/g, "")
  );
  priceElement.dataset.initialPrice = initialPrice;
});

quantitySelects.forEach((select, index) => {
  select.addEventListener("change", () => {
    const priceElement = productPriceElements[index];
    const initialPrice = parseFloat(priceElement.dataset.initialPrice);
    const quantity = parseInt(select.value);

    const newPrice = quantity > 1 ? initialPrice * quantity : initialPrice;

    priceElement.textContent = `$${newPrice.toFixed(2)}`;
  });
});
