// Import stylesheets
import './style.css';

const buttons = document.querySelectorAll('button');
const prevButton = buttons[0];
const nextButton = buttons[1];
const circlesAsArray = Object.entries(
  document.querySelectorAll('[class="flex-1"]')
);

const modifiedCircles = circlesAsArray.filter(
  (item) =>
    !['0', `${circlesAsArray.length - 1}`].some((item2) => item2 === item[0])
);
const circles = Object.fromEntries(modifiedCircles);

const status = document.querySelectorAll(`body>div>div:nth-child(2)>div`);
const progressLines = document.querySelectorAll('div.w-full');

let currentStatus = 0;
status[0].style.color = 'orange';

circles[1].innerHTML = setCircleAsUndone(1);
circles[2].innerHTML = setCircleAsUndone(2);
progressLines[0].innerHTML = setLineAsGreen(0);
progressLines[1].innerHTML = setLineAsGreen(0);

prevButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (currentStatus > -1) {
    prevButton.disabled = false;
    circles[currentStatus + 1].innerHTML = setCircleAsUndone(currentStatus + 1);
    status[currentStatus].style.color = 'orange';

    if (currentStatus > 0) {
      progressLines[currentStatus - 1].innerHTML = setLineAsGreen(20);
    }

    if (currentStatus < status.length - 1) {
      status[currentStatus + 1].style.color = 'black';
      progressLines[currentStatus].innerHTML = setLineAsGreen(0);
    }

    if (currentStatus !== 0) {
      currentStatus -= 1;
    }
  } else {
    nextButton.disabled = false;
    prevButton.disabled = true;
  }
});

nextButton.addEventListener('click', (e) => {
  e.preventDefault();
  prevButton.disabled = false;
  if (currentStatus < status.length) {
    circles[currentStatus + 1].innerHTML = setCircleAsDone();

    if (currentStatus !== status.length) {
      nextButton.disabled = false;
      status[currentStatus].style.color = 'green';
      if (currentStatus > 0) {
        progressLines[currentStatus - 1].innerHTML = setLineAsGreen(100);
      }
    }
    if (currentStatus !== status.length - 1) {
      status[currentStatus + 1].style.color = 'orange';
      progressLines[currentStatus].innerHTML = setLineAsGreen(20);
      currentStatus += 1;
    }
  } else {
    prevButton.disabled = false;
    nextButton.disabled = true;
  }
});

function setCircleAsUndone(numberOfStatus) {
  return `<div class="w-10 h-10 bg-white border-2 border-grey-light mx-auto rounded-full text-lg text-white flex items-center">
				<span class="text-grey-darker text-center w-full">${numberOfStatus}</span>
			</div>`;
}

function setCircleAsDone() {
  return `<div class="w-10 h-10 bg-green mx-auto rounded-full text-lg text-white flex items-center">
  <span class="text-white text-center w-full"><i class="fa fa-check w-full fill-current white"></i></span>
</div>`;
}

function setLineAsGreen(valueOfPercentages) {
  return `<div class="bg-green-light text-xs leading-none py-1 text-center text-grey-darkest rounded " style="width: ${valueOfPercentages}%"></div>`;
}
