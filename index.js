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
console.log(typeof circles, 'circles[0]', circles[0]);

const status = document.querySelectorAll(`body>div>div:nth-child(2)>div`);
let currentStatus = 0;
status[0].style.color = 'orange';

prevButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (currentStatus > 0) {
    prevButton.disabled = false;

    status[currentStatus].style.color = 'black';

    circles[currentStatus + 1].innerHTML = setCircleAsUndone(currentStatus);

    currentStatus -= 1;
    console.log(currentStatus);

    status[currentStatus].style.color = 'orange';
  } else {
    console.log(currentStatus);
    nextButton.disabled = false;
    prevButton.disabled = true;
  }
});
console.log(circles[currentStatus + 1]);

nextButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (currentStatus < status.length - 1) {
    nextButton.disabled = false;
    status[currentStatus].style.color = 'green';
    console.log(circles[currentStatus + 1]);

    circles[currentStatus + 1].innerHTML = setCircleAsDoneOrInProgress();

    // setAsUndone(currentStatus);
    currentStatus += 1;
    circles[currentStatus + 1].innerHTML = setCircleAsDoneOrInProgress();
    // circles[currentStatus].innerHTML = setAsUndone(currentStatus);

    status[currentStatus].style.color = 'orange';
    console.log(currentStatus);
  } else {
    console.log(currentStatus);
    prevButton.disabled = false;
    nextButton.disabled = true;
  }
});
/// body>div:first-child>div:first-child

function setCircleAsUndone(numberOfStatus) {
  return `<div class="w-10 h-10 bg-white border-2 border-grey-light mx-auto rounded-full text-lg text-white flex items-center">
				<span class="text-grey-darker text-center w-full">${numberOfStatus}</span>
			</div>`;
}

function setCircleAsDoneOrInProgress() {
  return `<div class="w-10 h-10 bg-green mx-auto rounded-full text-lg text-white flex items-center">
  <span class="text-white text-center w-full"><i class="fa fa-check w-full fill-current white"></i></span>
</div>`;
}

console.log(circles);
