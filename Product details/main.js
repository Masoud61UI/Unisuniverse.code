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

// show more details

(function () {
  const togglerEls = document.querySelectorAll(".toggler");

  for (const togglerEl of togglerEls) {
    togglerEl.addEventListener("click", function () {
      const parentEl = togglerEl.parentNode;
      const childrenEls = parentEl.children;

      for (const childEl of childrenEls) {
        childEl.style.display =
          childEl.style.display === "none" ? "flex" : "none";
      }

      const showpanelEl = parentEl.parentNode.querySelector(".showpanel");
      showpanelEl.style.display =
        showpanelEl.style.display === "flex" ? "none" : "flex";
    });
  }
})();

// stars

const stars = document.querySelectorAll(".reviews-field-items-rate svg");

stars.forEach((star, index1) => {
  star.addEventListener("click", () => {
    stars.forEach((star, index2) => {
      index1 >= index2
        ? star.classList.add("active-star")
        : star.classList.remove("active-star");
    });
  });
});

// img replace

document.addEventListener("DOMContentLoaded", function () {
  const thumbnailImages = document.querySelectorAll(".product-img-wrapper img");
  console.log(thumbnailImages);

  thumbnailImages.forEach(function (thumbnailImage) {
    thumbnailImage.addEventListener("click", function () {
      const imageSource = this.getAttribute("src");
      const largeImage = document.getElementById("grote_image");
      largeImage.setAttribute("src", imageSource);
    });
  });
});

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

// gallery

document.addEventListener("DOMContentLoaded", function () {
  const slidesContainer = document.querySelector(".gallery-slides");
  const slides = document.querySelectorAll(".gallery-slide");
  const prevBtn = document.querySelector(".gallery-prev");
  const nextBtn = document.querySelector(".gallery-next");
  const counter = document.querySelector(".gallery-counter");

  const allImages = [
    {
      src: "images/preview-img2.png",
      alt: "Image 1",
    },
    {
      src: "images/preview-img1.png",
      alt: "Image 2",
    },
    {
      src: "images/preview-img2.png",
      alt: "Image 3",
    },
    {
      src: "images/preview-img1.png",
      alt: "Image 4",
    },
    {
      src: "images/preview-img2.png",
      alt: "Image 5",
    },
    {
      src: "images/preview-img1.png",
      alt: "Image 6",
    },
    {
      src: "images/preview-img2.png",
      alt: "Image 7",
    },
    {
      src: "images/preview-img1.png",
      alt: "Image 8",
    },
    {
      src: "images/preview-img2.png",
      alt: "Image 9",
    },
    {
      src: "images/preview-img1.png",
      alt: "Image 10",
    },
  ];

  let currentCenterIndex = 1;
  const totalSlides = allImages.length;

  function updateGallery() {
    const prevIndex = (currentCenterIndex - 1 + totalSlides) % totalSlides;
    const nextIndex = (currentCenterIndex + 1) % totalSlides;

    slides[0].querySelector("img").src = allImages[prevIndex].src;
    slides[0].querySelector("img").alt = allImages[prevIndex].alt;
    slides[0].setAttribute("data-index", prevIndex + 1);

    slides[1].querySelector("img").src = allImages[currentCenterIndex].src;
    slides[1].querySelector("img").alt = allImages[currentCenterIndex].alt;
    slides[1].setAttribute("data-index", currentCenterIndex + 1);

    slides[2].querySelector("img").src = allImages[nextIndex].src;
    slides[2].querySelector("img").alt = allImages[nextIndex].alt;
    slides[2].setAttribute("data-index", nextIndex + 1);

    counter.textContent = `${currentCenterIndex + 1} / ${totalSlides}`;

    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === 1);
    });
  }

  function slideTo(direction) {
    slidesContainer.style.transform = `translateX(${direction * 33.333}%)`;
    slidesContainer.style.transition = "transform 0.5s ease-in-out";

    setTimeout(() => {
      slidesContainer.style.transition = "none";

      currentCenterIndex =
        (currentCenterIndex + direction + totalSlides) % totalSlides;

      slidesContainer.style.transform = "translateX(0)";

      updateGallery();

      setTimeout(() => {
        slidesContainer.style.transition = "transform 0.5s ease-in-out";
      }, 10);
    }, 500);
  }

  prevBtn.addEventListener("click", function () {
    slideTo(-1);
  });

  nextBtn.addEventListener("click", function () {
    slideTo(1);
  });

  updateGallery();
});
