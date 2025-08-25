function updateDeadlineTimers() {
  const deadlineElements = document.querySelectorAll(
    '#received td[data-label="Deadline"]'
  );

  deadlineElements.forEach((element) => {
    const text = element.textContent.trim();

    if (text === "Expired") {
      element.classList.add("expired");
      element.classList.remove("urgent");
      return;
    }

    if (text.includes(":")) {
      const parts = text.split(":");
      if (parts.length === 3) {
        const hours = parseInt(parts[0]);
        const minutes = parseInt(parts[1]);
        const seconds = parseInt(parts[2]);

        if (hours < 24) {
          element.classList.add("urgent");
          element.classList.remove("expired");
        } else {
          element.classList.remove("urgent", "expired");
        }

        if (seconds > 0 || minutes > 0 || hours > 0) {
          let newSeconds = seconds - 1;
          let newMinutes = minutes;
          let newHours = hours;

          if (newSeconds < 0) {
            newSeconds = 59;
            newMinutes = minutes - 1;

            if (newMinutes < 0) {
              newMinutes = 59;
              newHours = hours - 1;

              if (newHours < 0) {
                element.textContent = "Expired";
                element.classList.add("expired");
                element.classList.remove("urgent");
                return;
              }
            }
          }

          element.textContent = `${newHours}:${String(newMinutes).padStart(
            2,
            "0"
          )}:${String(newSeconds).padStart(2, "0")}`;

          if (newHours < 24) {
            element.classList.add("urgent");
            element.classList.remove("expired");
          } else {
            element.classList.remove("urgent", "expired");
          }
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  updateDeadlineTimers();

  setInterval(updateDeadlineTimers, 1000);

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".manage-container")) {
      document.querySelectorAll(".manage-container").forEach((container) => {
        container.classList.remove("active");
      });
    }
  });

  document.querySelectorAll(".manage-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const container = this.closest(".manage-container");
      const isActive = container.classList.contains("active");

      document.querySelectorAll(".manage-container").forEach((c) => {
        c.classList.remove("active");
      });

      if (!isActive) {
        container.classList.add("active");
      }
    });
  });

  document.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", function () {
      const action = this.classList.contains("view-btn") ? "view" : "withdraw";
      const caseId = this.closest("tr").querySelector(".caseId").textContent;
    });
  });
});
