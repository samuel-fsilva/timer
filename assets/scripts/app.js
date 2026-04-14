const entradaNumeros = document.querySelectorAll("input");
const playButton = document.getElementById("play");
const pauseButton = document.createElement("button");
let pauseIcon = document.createElement("img");
const tempoBody = document.getElementById("tempBody");
pauseIcon.src =
  "assets/images/music-pause-button-pair-of-lines-svgrepo-com.svg";
pauseButton.appendChild(pauseIcon);
const songs = [
  new Audio(
    "assets/ringtones/iphone-ringtone-apple-ringtone-marimba-ringtone-best-ringtone-45430-46663.mp3",
  ),
];
let isPaused = false;

entradaNumeros.forEach(function (input) {
  input.addEventListener("blur", () => {
    formatarNumeros(input);
    validarNumeros(input);
  });
});

playButton.addEventListener("click", () => {
  let hours = document.getElementById("inp-01");
  let minutes = document.getElementById("inp-02");
  let seconds = document.getElementById("inp-03");

  mainFunction(hours, minutes, seconds);
  tempoBody.classList.remove("vibrating");
});

pauseButton.addEventListener("click", () => {
  isPaused = true;
});

function mainFunction(hours, minutes, seconds) {
  if (hours.value == 0 && minutes.value == 0 && seconds.value == 0) {
    errorApearance();
  } else {
    switchButtonPause();
    songs[0].pause();
    songs[0].currentTime = 0;
    let valueSeconds = seconds.value;
    let valueMinutes = minutes.value;
    let valueHours = hours.value;

    let timing = setInterval(() => {
      if (isPaused) {
        clearInterval(timing);
        switchButtonPlay();
        isPaused = false;
      }
      valueSeconds--;

      if (valueSeconds == -1) {
        if (valueMinutes == 0) {
          if (valueHours == 0) {
            clearInterval(timing);
            endTimer();
          } else {
            valueHours--;
            valueMinutes = 59;
            valueSeconds = 59;
            hours.value = valueHours;
            formatarNumeros(hours);
          }
        } else {
          valueMinutes--;
          valueSeconds = 59;
          minutes.value = valueMinutes;
          formatarNumeros(minutes);
        }
      }
      seconds.value = valueSeconds;
      formatarNumeros(seconds);
      minutes.value = valueMinutes;
      formatarNumeros(minutes);
    }, 1000);
  }
}
function errorApearance() {
  const hourDivisor = document.querySelectorAll(".divisor");
  hourDivisor.forEach(function (p) {
    p.style.color = "#ff2222";
    setTimeout(() => {
      p.style.color = "#32f800";
    }, 1000);
  });
  entradaNumeros.forEach(function (input) {
    input.style.color = "#ff2222";
    setTimeout(() => {
      input.style.color = "#32f800";
    }, 1000);
  });
}
function formatarNumeros(input) {
  if (input.value.length == 1) {
    input.value = "0" + input.value;
  } else if (input.value.length == 0 || input.value < 0) {
    input.value = "00";
  }
}
function validarNumeros(x) {
  if (x.value.length > 2 || x.value > 59 || x.value < 0 || x.value == "-0") {
    x.value = "00";
  }
}
function switchButtonPause() {
  pauseButton.id = "pause";
  playButton.replaceWith(pauseButton);
  entradaNumeros.forEach(function (input) {
    input.setAttribute("readonly", true);
  });
}
function switchButtonPlay() {
  pauseButton.replaceWith(playButton);
  entradaNumeros.forEach(function (input) {
    input.removeAttribute("readonly");
  });
}
function endTimer() {
  isPaused = false;
  switchButtonPlay();
  entradaNumeros.forEach(function (input) {
    input.removeAttribute("readonly");
    endAnimation();
  });
  songs[0].currentTime = 0;
  songs[0].play();
}
function endAnimation() {
  tempoBody.classList.remove("vibrating");
  tempoBody.classList.add("vibrating");
}
