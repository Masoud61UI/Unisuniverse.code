// submenu

document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".side-menu-item");

  menuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      if (
        e.target.closest(".sub-menu-wrapper") ||
        e.target.closest(".sub-menu")
      ) {
        return;
      }

      menuItems.forEach((menuItem) => {
        menuItem
          .querySelector(".side-menu-item-profile")
          .classList.remove("checked-tab");
      });

      item
        .querySelector(".side-menu-item-profile")
        .classList.add("checked-tab");

      document.querySelectorAll(".sub-menu-wrapper").forEach((subMenu) => {
        subMenu.classList.remove("show");
        subMenu.style.display = "none";
      });

      const subMenu = item.querySelector(".sub-menu-wrapper");
      if (subMenu) {
        subMenu.classList.add("show");
        subMenu.style.display = "block";
      }
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
