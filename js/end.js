const score = document.getElementById("para");
const getItem = JSON.parse(localStorage.getItem("score"));
const highScore = JSON.parse(localStorage.getItem("highScore")) || [];
const input = document.querySelector("input");
const button = document.querySelector("button");
const alert = document.getElementById("show-alert");
score.innerText = getItem;
const showAlert = (massage, type) => {
	alert.innerHTML = "";
	const alertMassage = document.createElement("p");
	alertMassage.innerText = massage;
	alertMassage.classList.add("alert");
	alertMassage.classList.add(`alert-${type}`);
	alert.appendChild(alertMassage);
	setTimeout(() => {
		alertMassage.style.display = "none";
	}, 1000);
};
const saveHandler = () => {
	if (!input.value || !getItem) {
		showAlert("Please Enter A Value Or give a play ", "error");
	} else {
		const finalScore = {
			name: input.value.toLowerCase(),
			score: getItem,
		};
		highScore.push(finalScore);
		highScore.sort((a, b) => b.score - a.score);
		localStorage.setItem("highScore", JSON.stringify(highScore));
		localStorage.removeItem("score");
		showAlert("Scores Pushed In The DB", "success");
		setTimeout(() => {
			window.location.assign("/");
		}, 2000);
	}
};
button.addEventListener("click", saveHandler);
// console.log(highScore);
