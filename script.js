const startQuiz = document.querySelector('.quiz-btn');
const quizInfo = document.querySelector('.info');
const exitQuiz = document.querySelector('.exitquiz-btn');
const continueBtn = document.querySelector('.continue-btn');
const container = document.querySelector('.container');
const timeLeft = document.querySelector('.time-sec');
const options = document.querySelectorAll('.option');
const optionList = document.querySelector('.option-list');
const correctIcone = document.querySelector('.fa-check');
const incorrectIcone = document.querySelectorAll('.fa-times');
const nextQuiz = document.querySelector('.next-quiz');
const resultSection = document.querySelector('.result');
const result = document.querySelector('.point');
const qs = document.querySelector('.qs');
const op1 = document.querySelector('.op1');
const op2 = document.querySelector('.op2');
const op3 = document.querySelector('.op3');
const op4 = document.querySelector('.op4');
const qsNumber = document.querySelector('.current-ques');
const ops = [op1, op2, op3, op4];

const q1 = {
  question: 'What is the answer of 60 + 40',
  option1: 200,
  option2: 100,
  option3: 400,
  option4: 300,
  correctAns: 100,
};
const q2 = {
  question: 'What is the answer of 30 + 40',
  option1: 80,
  option2: 50,
  option3: 70,
  option4: 100,
  correctAns: 70,
};
const q3 = {
  question: 'What is the answer of 120 + 60',
  option1: 150,
  option2: 190,
  option3: 200,
  option4: 180,
  correctAns: 180,
};
const q4 = {
  question: 'What is the answer of 130 + 120',
  option1: 250,
  option2: 150,
  option3: 200,
  option4: 300,
  correctAns: 250,
};
const q5 = {
  question: 'What is the answer of 170 + 130',
  option1: 200,
  option2: 400,
  option3: 300,
  option4: 350,
  correctAns: 300,
};
const questions = [q1, q2, q3, q4, q5];

startQuiz.addEventListener('click', function () {
  quizInfo.classList.remove('hidden');
});
exitQuiz.addEventListener('click', function () {
  quizInfo.classList.add('hidden');
});
let time = 20;
const timeOut = function () {
  const tick = function () {
    const sec = String(time).padStart(2, 0);
    timeLeft.textContent = sec;

    if (time === 0) {
      clearInterval(timer);
      disableClick();
    }
    time--;
  };
  tick();
  const timer = setInterval(tick, 1000);
};
continueBtn.addEventListener('click', function () {
  container.classList.remove('hidden');

  timeOut();
});
const disableClick = function () {
  for (let i = 0; i < options.length; i++) {
    options[i].classList.add('disable');
  }
};
let currentQuiz = 0;
let score = 0;
const quiz = function () {
  const currentQuizData = questions[currentQuiz];
  if (options.length + 1 !== currentQuiz) {
    qs.textContent = currentQuizData.question;
    op1.textContent = currentQuizData.option1;
    op2.textContent = currentQuizData.option2;
    op3.textContent = currentQuizData.option3;
    op4.textContent = currentQuizData.option4;
    qsNumber.textContent = currentQuiz + 1;
  }
};
quiz();
let totalPoint = 0;
const optionselect = function () {
  [...options].map((cur, i) => {
    cur.addEventListener('click', function (e) {
      let userAns = Number(e.target.textContent);
      const answer = questions[currentQuiz].correctAns;
      if (userAns === answer) {
        e.target.classList.add('currect-answer');
        totalPoint++;
      } else if (userAns !== answer) {
        e.target.classList.add('wrong-answer');
      }
      time = 00;
      disableClick();
    });
  });
};
optionselect();
nextQuiz.addEventListener('click', function (e) {
  if (currentQuiz === 4) {
    container.classList.add('hidden');
    resultSection.classList.remove('hidden');
    result.textContent = totalPoint;
  }
  time = 20;
  timeOut();
  currentQuiz++;
  quiz();
  options.forEach(e => {
    e.classList.remove('currect-answer');
    e.classList.remove('wrong-answer');
  });
  for (let i = 0; i < options.length; i++) {
    options[i].classList.remove('disable');
  }
});
