import dataFormatter from "./helper.js";
const CORRECT_BUNOUS = 10;
const levelSel = localStorage.getItem("level") || [];
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${levelSel}&type=multiple`; //SP 1//
const container = document.getElementById("container");
const loader = document.getElementById("loader");
const questionText = document.getElementById("question-text");
const categoryText = document.getElementById("question-category");
const answerText = document.querySelectorAll(".answer-text");
const scores = document.querySelector(".score-number");
const nextButton = document.getElementById("next-button");
const finishButton = document.getElementById("finish-button");
const questionNum = document.querySelector(".question-number");
// console.log(finishButton);
let formattedData = null;
let questionIndex = 0;
let correctAnswer2 = null;
let score = 0;
let isAccepted = true;
const fetchData = async () => {
	//SP 2//
	const response = await fetch(URL);
	const json = await response.json();
	formattedData = dataFormatter(json.results);
	console.log(formattedData);

	start();
};
const finishHandler = () => {
	localStorage.setItem("score", JSON.stringify(score));
	window.location.assign("./end.html");
};
const checkAnswer = (event, index) => {
	//SP 6//
	if (!isAccepted) return;
	isAccepted = false;
	const isCorrect = index === correctAnswer2 ? true : false;
	if (isCorrect) {
		event.target.classList.add("correct");
		score += CORRECT_BUNOUS;
		scores.innerText = score;
	} else {
		event.target.classList.add("inCorrect");
		answerText[correctAnswer2].classList.add("correct");
	}
};

const start = () => {
	//SP 4//
	showQuestion();
	container.style.display = "block";
	loader.style.display = "none";
};
const showQuestion = () => {
	//SP 5//
	const { question, answers, category, correctAnswer } =
		formattedData[questionIndex];
	console.log(formattedData);
	questionText.innerText = question;
	categoryText.innerText = category;
	correctAnswer2 = correctAnswer;
	questionNum.innerText = questionIndex + 1;
	console.log(correctAnswer);
	answerText.forEach((button, index) => {
		button.innerText = answers[index];
	});
};
const nextHandler = () => {
	//SP 7//

	questionIndex++;
	// console.log(questionIndex);
	if (questionIndex < formattedData.length) {
		showQuestion();
		removeClasses();
		isAccepted = true;
	} else {
		finishHandler();
	}
};
const removeClasses = () => {
	//SP 8//
	answerText.forEach((button) => (button.className = "answer-text"));
};
answerText.forEach((button, index) => {
	button.addEventListener("click", (event) => checkAnswer(event, index));
});

nextButton.addEventListener("click", nextHandler);
finishButton.addEventListener("click", finishHandler);
window.addEventListener("load", fetchData());
