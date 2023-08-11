
let countdownInterval;
let countdownDuration;
let countdownPaused = false;

function startCountdown(duration) {
  const startTime = Date.now();
  const endTime = startTime + duration * 60 * 1000;

  countdownInterval = setInterval(updateCountdown, 1000);

  function updateCountdown() {
    if (countdownPaused) return;

    const currentTime = Date.now();
    const remainingTime = endTime - currentTime;

    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      displayCountdown(0);
    } else {
      displayCountdown(remainingTime);
    }
  }
}

function displayCountdown(remainingTime) {
  const hours = Math.floor(remainingTime / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  document.getElementById('display').textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

document.getElementById('start').addEventListener('click', () => {
  if (!countdownInterval) {
    const durationInput = document.getElementById('duration');
    countdownDuration = parseInt(durationInput.value);

    if (!isNaN(countdownDuration)) {
      startCountdown(countdownDuration);
      durationInput.disabled = true;
      countdownPaused = false;
    } else {
      alert('Invalid duration. Please enter a valid number in minutes.');
    }
  }
});

document.getElementById('pause').addEventListener('click', () => {
  countdownPaused = !countdownPaused;
});

document.getElementById('reset').addEventListener('click', () => {
  clearInterval(countdownInterval);
  countdownInterval = null;
  document.getElementById('display').textContent = '00:00:00';
  document.getElementById('duration').disabled = false;
  countdownPaused = false;
});


