// Import stylesheets
import './style.css';

const buttons = document.querySelectorAll('button');
const prevButton = buttons[0];
const nextButton = buttons[1];

const status = document.querySelectorAll(`body>div>div:nth-child(2)>div`);
let currentStatus = 0;
status[0].style.color = 'orange';

prevButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (currentStatus > 0) {
    prevButton.disabled = false;

    status[currentStatus].style.color = 'black';
    currentStatus -= 1;
    console.log(currentStatus);

    status[currentStatus].style.color = 'orange';
  } else {
    console.log(currentStatus);
    nextButton.disabled = false;
    prevButton.disabled = true;
  }
});

nextButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (currentStatus < status.length - 1) {
    nextButton.disabled = false;
    status[currentStatus].style.color = 'green';
    currentStatus += 1;
    status[currentStatus].style.color = 'orange';
    console.log(currentStatus);
  } else {
    console.log(currentStatus);
    prevButton.disabled = false;
    nextButton.disabled = true;
  }
});
