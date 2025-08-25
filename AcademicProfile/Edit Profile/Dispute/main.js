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

// Upload File
function initFileUploader() {
  const uploadAreas = document.querySelectorAll(".photo-upld");

  if (!uploadAreas.length) return false;

  uploadAreas.forEach((area) => {
    const fileInput = area.querySelector('input[type="file"]');
    if (!fileInput) return;

    area.addEventListener(
      "click",
      (e) => {
        if (e.target !== fileInput) {
          e.preventDefault();
          e.stopPropagation();
          fileInput.click();
        }
      },
      true
    );
  });

  return true;
}

document.addEventListener("DOMContentLoaded", () => {
  initFileUploader();
});
