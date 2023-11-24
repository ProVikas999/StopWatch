let timer;
let running = false;
let startTime;
let lapCounter = 1;

const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimes = document.getElementById('lapTimes');

function startStop() {
  if (running) {
    clearInterval(timer);
    startStopButton.textContent = 'Start';
    running = false;
  } else {
    startTime = Date.now() - (lapCounter === 1 ? 0 : lapCounter * 1000);
    timer = setInterval(updateDisplay, 10);
    startStopButton.textContent = 'Stop';
    running = true;
  }
}

function updateDisplay() {
  const elapsed = Date.now() - startTime;
  const hours = Math.floor(elapsed / 3600000);
  const minutes = Math.floor((elapsed % 3600000) / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);
  const milliseconds = (elapsed % 1000);

  hoursDisplay.textContent = padTime(hours);
  minutesDisplay.textContent = padTime(minutes);
  secondsDisplay.textContent = padTime(seconds);
  millisecondsDisplay.textContent = padMilliseconds(milliseconds);
}

function padTime(time) {
  return (time < 10 ? '0' : '') + time;
}

function padMilliseconds(milliseconds) {
  if (milliseconds < 10) {
    return `00${milliseconds}`;
  } else if (milliseconds < 100) {
    return `0${milliseconds}`;
  } else {
    return milliseconds;
  }
}

function reset() {
  clearInterval(timer);
  hoursDisplay.textContent = '00';
  minutesDisplay.textContent = '00';
  secondsDisplay.textContent = '00';
  millisecondsDisplay.textContent = '000';
  startStopButton.textContent = 'Start';
  running = false;
  lapCounter = 1;
  lapTimes.innerHTML = '';
}

function lap() {
  const lapTime = `${hoursDisplay.textContent}:${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
  lapTimes.appendChild(lapItem);
  lapCounter++;
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
