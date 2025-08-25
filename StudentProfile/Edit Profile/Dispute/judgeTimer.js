document.addEventListener("DOMContentLoaded", function () {
  const verdictSelect = document.getElementById("verdictSelect");
  const percentageDivision = document.getElementById("percentageDivision");
  
  if (verdictSelect && percentageDivision) {
    verdictSelect.addEventListener("change", function () {
      if (this.value === "split") {
        percentageDivision.classList.add("visible");
      } else {
        percentageDivision.classList.remove("visible");
      }
    });
  }

  const timeValueElement = document.querySelector('.time-value');
  
  if (timeValueElement) {
    let totalSeconds = 71 * 3600 + 45 * 60 + 9;
    
    function updateTimer() {
      if (totalSeconds <= 0) {
        timeValueElement.textContent = "00:00:00";
        timeValueElement.style.color = "#666666";
        return;
      }
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      
      const formattedTime = 
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
      timeValueElement.textContent = formattedTime;
      
      if (totalSeconds < 3600) {
        timeValueElement.style.color = "#dc3545";
        timeValueElement.style.fontWeight = "bold";
      }
      
      totalSeconds--;
    }
    
    updateTimer();
    
    const timerInterval = setInterval(updateTimer, 1000);
  }
});