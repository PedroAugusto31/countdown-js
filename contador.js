const firstCircle = document.querySelector("circle.circle1");
const firstNumber = document.querySelector("div#time-hour");

const secondCircle = document.querySelector("circle.circle2");
const secondNumber = document.querySelector("div#time-minute");

const thirdCircle = document.querySelector("circle.circle3");
const thirdNumber = document.querySelector("div#time-second");

const startStopButton = document.querySelector("button#start-stop");

let isRunning,
	hourTimer,
	minuteTimer,
	secondTimer,
	totalTime,
	timer = null;

function startValues() {
	isRunning = false;
	hourTimer = parseInt(firstNumber.textContent) * 60 ** 2;
	minuteTimer = parseInt(secondNumber.textContent) * 60;
	secondTimer = parseInt(thirdNumber.textContent);
	totalTime = hourTimer + minuteTimer + secondTimer;
	dashOffsetTimer(firstCircle, firstNumber, 24, 1);
	dashOffsetTimer(secondCircle, secondNumber, 60, 1);
	dashOffsetTimer(thirdCircle, thirdNumber, 60, 1);
	console.log(totalTime);
}

startStopButton.addEventListener("click", () => {
	isRunning ? pause() : start();
});

function changeText(id, text) {
	isRunning
		? document.getElementById(`${id}`).createElement("input")
		: (document.getElementById(`${id}`).innerHTML = text);

	startValues();
}

function dashOffsetTimer(element, elementText, number, time) {
	element.setAttribute(
		"stroke-dashoffset",
		(345 / number) * parseInt(elementText.textContent) * time // vezes o número em si, conforme ele vai decaindo
	);
}

function start() {
	if (totalTime > 0 && totalTime <= 90060) {
		isRunning = true;
		startStopButton.innerHTML = "Pausar";
		timer = setInterval(updatingTime, 1000);
		return;
	}
}

function pause() {
	isRunning = false;
	changeText("time-hour", firstNumber.value);
	changeText("time-minute", secondNumber.value);
	changeText("time-second", thirdNumber.value);
	startStopButton.innerHTML = "Começar";
	clearInterval(timer);
}

function updatingTime() {
	if (totalTime > 0) {
		totalTime--;
	}
	firstNumber.innerHTML = Math.floor(totalTime / 60 ** 2);
	secondNumber.innerHTML = Math.floor((totalTime % 60 ** 2) / 60);
	thirdNumber.innerHTML = Math.floor((totalTime % 60 ** 2) % 60);
	dashOffsetTimer(firstCircle, firstNumber, 24, 1);
	dashOffsetTimer(secondCircle, secondNumber, 60, 1);
	dashOffsetTimer(thirdCircle, thirdNumber, 60, 1);
}

startValues();
