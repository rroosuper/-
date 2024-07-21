const statusDisplay = document.getElementById('status');
const stepsDisplay = document.getElementById('steps');
const caloriesDisplay = document.getElementById('calories');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

let tracking = false;
let stepCount = 0;
let calorieCount = 0;

function startTracking() {
    if (!('DeviceMotionEvent' in window)) {
        alert('DeviceMotionEvent is not supported');
        return;
    }

    tracking = true;
    stepCount = 0;
    calorieCount = 0;
    statusDisplay.textContent = 'Tracking: Started';

    window.addEventListener('devicemotion', handleMotionEvent);
}

function stopTracking() {
    tracking = false;
    statusDisplay.textContent = 'Tracking: Stopped';

    window.removeEventListener('devicemotion', handleMotionEvent);
}

function handleMotionEvent(event) {
    const acceleration = event.acceleration;
    if (acceleration.x > 1 || acceleration.y > 1 || acceleration.z > 1) {
        stepCount++;
        calorieCount = calculateCalories(stepCount);
        updateDisplay();
    }
}

function calculateCalories(steps) {
    const caloriesPerStep = 0.04; // Average calories burned per step
    return steps * caloriesPerStep;
}

function updateDisplay() {
    stepsDisplay.textContent = `Steps: ${stepCount}`;
    caloriesDisplay.textContent = `Calories: ${calorieCount.toFixed(2)}`;
}

startButton.addEventListener('click', startTracking);
stopButton.addEventListener('click', stopTracking);
