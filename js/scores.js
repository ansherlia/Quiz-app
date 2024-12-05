const getData = JSON.parse(localStorage.getItem("highScore")) || [];
const list = document.querySelector("ol");
const content = getData.map((score, index) => {
	return `<li>
                <span>${index + 1}</span>
                <p>${score.name}</p>
                <span>${score.score}</span>
            </li>`;
});
list.innerHTML = content.join("");
