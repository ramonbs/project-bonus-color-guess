function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function generatePColor() {
  const p = document.createElement('p');
  const section = document.querySelector('#color');
  const ball = document.querySelectorAll('.ball');
  for (let i = 0; i < Math.random() * 6; i += 1) {
    p.textContent = ball[i].style.backgroundColor;
  }
  p.setAttribute('id', 'rgb-color');
  section.appendChild(p);
}

function createBallsColors() {
  for (let i = 0; i < 6; i += 1) {
    const ballsContainer = document.querySelector('#ballsContainer');
    const ball = document.createElement('div');
    ball.classList.add('ball');
    ball.style.backgroundColor = getRandomColor();
    ball.style.border = '1px solid black';
    ball.style.borderRadius = '50%';
    ball.style.width = '80px';
    ball.style.height = '80px';
    ball.style.display = 'inline-block';
    ballsContainer.appendChild(ball);
  }
}

function createScore() {
  const pScore = document.createElement('p');
  const sectionScore = document.querySelector('#score');
  pScore.setAttribute('id', 'point');
  sectionScore.appendChild(pScore);
}

function incrementScore() {
  const points = document.querySelector('#point');
  // conevertendo string para number
  const pointsNumber = Number(points.textContent);
  points.textContent = pointsNumber + 3;
}

function saveScore() {
  const points = document.querySelector('#point');
  localStorage.setItem('score', JSON.stringify(points.textContent));
}

function recoveryScore() {
  const savedPoints = JSON.parse(localStorage.getItem('score'));
  const points = document.querySelector('#point');
  if (localStorage.length === 0) {
    points.textContent = '0';
  } else {
    points.textContent = savedPoints;
  }
}

function verifyRightOrWrong() {
  const ballsContainer = document.querySelector('#ballsContainer');
  const message = document.querySelector('#answer');
  const p = document.querySelector('#rgb-color');
  const phrase = p.textContent;
  ballsContainer.addEventListener('click', function score(event) {
    if (event.target.style.backgroundColor === phrase) {
      message.textContent = 'Acertou!';
      incrementScore();
      saveScore();
      ballsContainer.removeEventListener('click', score);
    } else {
      message.textContent = 'Errou! Tente novamente!';
      ballsContainer.removeEventListener('click', score);
    }
  });
}

function declareInitialMessage() {
  const message = document.querySelector('#answer');
  message.textContent = 'Escolha uma cor';
}

function buttonReset() {
  const reset = document.querySelector('#reset-game');
  reset.addEventListener('click', () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  });
}

window.onload = function start() {
  declareInitialMessage();
  createScore();
  createBallsColors();
  generatePColor();
  recoveryScore();
  verifyRightOrWrong();
  buttonReset();
};
