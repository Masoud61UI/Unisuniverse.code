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
  const thumbnailWrappers = document.querySelectorAll(".product-img-wrapper");
  const largeImage = document.getElementById("grote_image");

  thumbnailWrappers.forEach(function (wrapper) {
    wrapper.addEventListener("click", function () {
      thumbnailWrappers.forEach((w) => w.classList.remove("active-img"));

      this.classList.add("active-img");

      const clickedImage = this.querySelector("img");
      if (clickedImage) {
        largeImage.src = clickedImage.src;
      }
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
