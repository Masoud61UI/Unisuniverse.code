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

// gallery

document.addEventListener("DOMContentLoaded", function () {
  const slidesContainer = document.querySelector(".gallery-slides");
  const slides = document.querySelectorAll(".gallery-slide");
  const prevBtn = document.querySelector(".gallery-prev");
  const nextBtn = document.querySelector(".gallery-next");
  const counter = document.querySelector(".gallery-counter");

  let currentIndex = 1;
  const totalSlides = slides.length;
  let isAnimating = false;

  function updateSlider() {
    counter.textContent = `${currentIndex} / ${totalSlides}`;

    slides.forEach((slide) => {
      slide.classList.remove("active", "leaving", "entering");
      slide.style.opacity = "0";
      slide.style.transform = "scale(0.85)";
      slide.style.display = "none";
    });

    const prevIndex = currentIndex - 1 <= 0 ? totalSlides : currentIndex - 1;
    const nextIndex = currentIndex + 1 > totalSlides ? 1 : currentIndex + 1;

    const prevSlide = document.querySelector(
      `.gallery-slide[data-index="${prevIndex}"]`
    );
    const currentSlide = document.querySelector(
      `.gallery-slide[data-index="${currentIndex}"]`
    );
    const nextSlide = document.querySelector(
      `.gallery-slide[data-index="${nextIndex}"]`
    );

    if (prevSlide) {
      prevSlide.style.display = "block";
      setTimeout(() => {
        prevSlide.style.opacity = "0.6";
        prevSlide.style.transform = "scale(0.85)";
      }, 10);
    }

    if (currentSlide) {
      currentSlide.classList.add("active");
      currentSlide.style.display = "block";
      setTimeout(() => {
        currentSlide.style.opacity = "1";
        currentSlide.style.transform = "scale(1)";
      }, 10);
    }

    if (nextSlide) {
      nextSlide.style.display = "block";
      setTimeout(() => {
        nextSlide.style.opacity = "0.6";
        nextSlide.style.transform = "scale(0.85)";
      }, 10);
    }
  }

  function goToSlide(newIndex) {
    if (isAnimating) return;
    isAnimating = true;

    if (newIndex < 1) newIndex = totalSlides;
    if (newIndex > totalSlides) newIndex = 1;

    slides.forEach((slide) => {
      if (slide.style.display === "block") {
        slide.classList.add("leaving");
        slide.style.opacity = "0";
        slide.style.transform = "scale(0.8)";
      }
    });

    setTimeout(() => {
      currentIndex = newIndex;
      updateSlider();

      setTimeout(() => {
        isAnimating = false;
      }, 410);
    }, 410);
  }

  prevBtn.addEventListener("click", function () {
    goToSlide(currentIndex - 1);
  });

  nextBtn.addEventListener("click", function () {
    goToSlide(currentIndex + 1);
  });

  updateSlider();
});
