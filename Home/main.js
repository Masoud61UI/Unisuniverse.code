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

// Typed

document.addEventListener("DOMContentLoaded", function () {
  const textElement = document.querySelector(".hero-text-sm");
  const strings = [
    "Welcome to Unisuniverse!",
    "Live Your Academic Life Better",
  ];
  let stringIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentString = strings[stringIndex];
    if (isDeleting) {
      textElement.textContent = currentString.substring(0, charIndex - 1);
      charIndex--;
    } else {
      textElement.textContent = currentString.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentString.length) {
      isDeleting = true;
      setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      stringIndex = (stringIndex + 1) % strings.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, isDeleting ? 20 : 50);
    }
  }

  type();
});

// Carousel

document.querySelectorAll(".carousel").forEach((carousel) => {
  const nextButton = carousel.querySelector(".next");
  const prevButton = carousel.querySelector(".prev");
  const listHTML = carousel.querySelector(".carousel-list");

  nextButton.onclick = function () {
    showSlider("next", carousel);
  };
  prevButton.onclick = function () {
    showSlider("prev", carousel);
  };

  let unAcceptClick;
  const showSlider = (type, currentCarousel) => {
    nextButton.style.pointerEvents = "none";
    prevButton.style.pointerEvents = "none";

    currentCarousel.classList.remove("next", "prev");
    let items = currentCarousel.querySelectorAll(".carousel-item");
    if (type === "next") {
      listHTML.appendChild(items[0]);
      currentCarousel.classList.add("next");
    } else {
      listHTML.prepend(items[items.length - 1]);
      currentCarousel.classList.add("prev");
    }

    clearTimeout(unAcceptClick);
    unAcceptClick = setTimeout(() => {
      nextButton.style.pointerEvents = "auto";
      prevButton.style.pointerEvents = "auto";
    }, 2000);
  };
});

// Testimonial

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".image-tab");
  const indicators = document.querySelectorAll(".slider-indicator");
  const slides = document.querySelectorAll(".testimonial-slide");
  let currentActiveIndex = 0;
  let isAnimating = false;
  let slideInterval;

  function changeSlide(index) {
    if (isAnimating || index === currentActiveIndex) return;

    isAnimating = true;

    const currentActiveSlide = slides[currentActiveIndex];
    currentActiveSlide.classList.add("exit");
    currentActiveSlide.classList.remove("active");

    tabs.forEach((tab) => tab.classList.remove("active"));
    indicators.forEach((indicator) => indicator.classList.remove("active"));

    clearInterval(slideInterval);

    setTimeout(() => {
      currentActiveSlide.classList.remove("exit");

      tabs[index].classList.add("active");
      indicators[index].classList.add("active");
      slides[index].classList.add("active");

      currentActiveIndex = index;
      isAnimating = false;

      restartAutoSlide();
    }, 500);
  }

  function restartAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      const nextIndex = (currentActiveIndex + 1) % slides.length;
      changeSlide(nextIndex);
    }, 6000);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const slideIndex = parseInt(this.getAttribute("data-slide"));
      changeSlide(slideIndex);
    });
  });

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", function () {
      const slideIndex = parseInt(this.getAttribute("data-slide"));
      changeSlide(slideIndex);
    });
  });

  restartAutoSlide();

  const sliderContainer = document.querySelector(".testimonial-slider");
  if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", () => {
      clearInterval(slideInterval);
    });

    sliderContainer.addEventListener("mouseleave", () => {
      restartAutoSlide();
    });
  }
});

// flip

document.addEventListener("DOMContentLoaded", function () {
  const flipCards = document.querySelectorAll(".flip-card");
  let activeCard = null;

  flipCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      e.stopPropagation();

      if (this === activeCard) {
        this.classList.remove("active");
        activeCard = null;
        return;
      }

      if (activeCard) {
        activeCard.classList.remove("active");
      }

      this.classList.add("active");
      activeCard = this;
    });
  });

  document.addEventListener("click", function () {
    if (activeCard) {
      activeCard.classList.remove("active");
      activeCard = null;
    }
  });
});

// tooltip

const continentData = {
  "North America": { universities: 3016 },
  "South America": { universities: 887 },
  Europe: { universities: 3237 },
  Asia: { universities: 10110 },
  Africa: { universities: 381 },
  Oceania: { universities: 220 },
};

document.addEventListener("DOMContentLoaded", function () {
  const tooltip = document.getElementById("continent-tooltip");
  const circles = document.querySelectorAll(".continent-point");
  let activeTooltip = null;
  let lastScrollPosition = window.pageYOffset;
  let tooltipTimeout = null;

  function showTooltip(element) {
    if (activeTooltip && activeTooltip !== element) {
      hideTooltip();
    }

    const continentName = element.getAttribute("data-continent");
    const data = continentData[continentName] || { universities: 0 };
    tooltip.textContent = continentName;

    tooltip.innerHTML = `
    <div class="tooltip-header">
      <span class="continent-icon" style="background:${element.getAttribute(
        "fill"
      )}"></span>
      ${continentName}
    </div>
    <div class="tooltip-stats">
      <span>University Counts:</span>
      <strong>${data.universities}</strong>
    </div>
  `;

    if (isMobileView()) {
      const circleRect = element.getBoundingClientRect();
      const tooltipWidth = tooltip.offsetWidth;
      const tooltipHeight = tooltip.offsetHeight;

      let left = circleRect.left + circleRect.width / 2 - tooltipWidth / 2;
      left = Math.max(
        10,
        Math.min(left, window.innerWidth - tooltipWidth - 10)
      );

      let top = circleRect.top - tooltipHeight - 10;
      let direction = "top";

      if (top < 10) {
        top = circleRect.bottom + 10;
        direction = "bottom";
      }

      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
      tooltip.style.position = "fixed";
      tooltip.style.transform = "none";
      tooltip.classList.add(direction);
    } else {
      const svgRect = element.parentElement.getBoundingClientRect();
      const circleRect = element.getBoundingClientRect();
      const x = circleRect.left - svgRect.left + circleRect.width / 2;
      const y = circleRect.top - svgRect.top;
      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${y}px`;
      tooltip.style.position = "absolute";
      tooltip.style.transform = "translate(-42%, 192%)";
      tooltip.classList.remove("top", "bottom");
    }

    tooltip.style.opacity = "1";
    tooltip.style.pointerEvents = "auto";
    activeTooltip = element;

    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
      tooltipTimeout = null;
    }
  }

  function hideTooltip() {
    if (tooltip) {
      tooltip.style.opacity = "0";
      tooltip.style.pointerEvents = "none";
      activeTooltip = null;
    }
  }

  function hideTooltipWithDelay() {
    if (activeTooltip && !tooltip.matches(":hover")) {
      tooltipTimeout = setTimeout(() => {
        hideTooltip();
      }, 300);
    }
  }

  function isMobileView() {
    return window.innerWidth < 1000;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (isMobileView() && activeTooltip) {
        const currentScrollPosition = window.pageYOffset;

        if (Math.abs(currentScrollPosition - lastScrollPosition) > 5) {
          hideTooltip();
        }

        lastScrollPosition = currentScrollPosition;
      }
    },
    { passive: true }
  );

  circles.forEach((circle) => {
    circle.addEventListener("mouseenter", function () {
      if (!isMobileView()) showTooltip(this);
    });

    circle.addEventListener("mouseleave", function () {
      if (!isMobileView()) hideTooltipWithDelay();
    });

    circle.addEventListener("click", function (e) {
      if (isMobileView()) {
        e.stopPropagation();
        if (activeTooltip === this) {
          hideTooltip();
        } else {
          showTooltip(this);
        }
      }
    });
  });

  tooltip.addEventListener("mouseenter", function () {
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
      tooltipTimeout = null;
    }
  });

  tooltip.addEventListener("mouseleave", function () {
    hideTooltipWithDelay();
  });

  document.addEventListener("click", function (e) {
    if (isMobileView() && !e.target.classList.contains("continent-point")) {
      hideTooltip();
    }
  });

  window.addEventListener("resize", function () {
    if (!isMobileView()) hideTooltip();
  });
});

// counter stat

document.addEventListener("DOMContentLoaded", function () {
  const statsSection = document.querySelector(".stats-section");
  const statNumbers = document.querySelectorAll(".stat-number");
  let animationTriggered = false;

  const animationSettings = {
    duration: 1400,
    easing: "easeOutQuad",
  };

  function animateValue(el, start, end, duration) {
    const suffix = el.textContent.match(/\D+/g)?.[0] || "";
    let startTime = null;

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      el.textContent = value + suffix;

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animationTriggered) {
          animationTriggered = true;

          statNumbers.forEach((el) => {
            const target = parseInt(el.getAttribute("data-count"));
            animateValue(el, 0, target, animationSettings.duration);
          });

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.35,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  if (statsSection) {
    statNumbers.forEach((el) => {
      const suffix = el.textContent.match(/\D+/g)?.[0] || "";
      el.textContent = "0" + suffix;
    });

    observer.observe(statsSection);
  }
});
