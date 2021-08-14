const firstCircle = document.querySelector("circle.circle1");
const firstNumber = document.querySelector("div#time-hour");

const secondCircle = document.querySelector("circle.circle2");
const secondNumber = document.querySelector("div#time-minute");

const thirdCircle = document.querySelector("circle.circle3");
const thirdNumber = document.querySelector("div#time-second");

const startStopButton = document.querySelector("button#start-stop");
const resetButton = document.querySelector("button#reset");
const endingAudio = document.querySelector("#ending-audio");
const clockImage = document.querySelector("#clock-image");

let isRunning,
	hourTimer,
	minuteTimer,
	secondTimer,
	totalTime,
	startValueFirst,
	startValueSecond,
	startValueThird,
	timer = null;

function startValues() {
	isRunning = false;
	hourTimer = startValueFirst * 60 ** 2;
	minuteTimer = startValueSecond * 60;
	secondTimer = startValueThird;
	totalTime = hourTimer + minuteTimer + secondTimer;
	dashOffsetTimer(firstCircle, firstNumber, 24, 1);
	dashOffsetTimer(secondCircle, secondNumber, 60, 1);
	dashOffsetTimer(thirdCircle, thirdNumber, 60, 1);
}

startStopButton.addEventListener("click", () => {
	isRunning
		? () => {
				inputs();
				pause();
		  }
		: () => {
				changeText();
				start();
		  };
});
resetButton.addEventListener("click", () => {
	pause();
	startValues();
	updatingTime();
	inputs(firstNumber);
	inputs(secondNumber);
	inputs(thirdNumber);
});

function changeText(id, text) {
	document.getElementById(`${id}`).innerHTML = text;

	startValueFirst = parseInt(firstNumber.textContent);
	startValueSecond = parseInt(secondNumber.textContent);
	startValueThird = parseInt(thirdNumber.textContent);
	startValues();
}

function inputs(id) {
	id = document
		.createElement(`input`)
		.setAttribute("onchange", changeText(this.id, this.value));
	console.log("chegou nos inputs");
}
//setar o input novo como uma variavel, e adicionar o atributo onchange e chamar a função changeText
function dashOffsetTimer(element, elementText, number, time) {
	element.setAttribute(
		"stroke-dashoffset",
		(345 / number) * parseInt(elementText.textContent) * time // vezes o número em si, conforme ele vai decaindo
	);
}

function start() {
	if (totalTime > 0 && totalTime <= 90060) {
		isRunning = true;
		startStopButton.innerHTML = clockImage.outerHTML + "Pausar";
		timer = setInterval(updatingTime, 1000);
		return;
	}
}

function pause() {
	isRunning = false;
	startStopButton.innerHTML = clockImage.outerHTML + "Começar";
	clearInterval(timer);
}

function updatingTime() {
	if (totalTime > 0) {
		totalTime--;
	}
	if (totalTime <= 0 && isRunning === true) {
		endingAudio.play();
		isRunning = false;
		return;
	}
	firstNumber.innerHTML = Math.floor(totalTime / 60 ** 2);
	secondNumber.innerHTML = Math.floor((totalTime % 60 ** 2) / 60);
	thirdNumber.innerHTML = Math.floor((totalTime % 60 ** 2) % 60);
	dashOffsetTimer(firstCircle, firstNumber, 24, 1);
	dashOffsetTimer(secondCircle, secondNumber, 60, 1);
	dashOffsetTimer(thirdCircle, thirdNumber, 60, 1);
}

startValues();
