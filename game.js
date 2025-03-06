let secretNumber;
let attempts = 0;
let timer;
let timeLeft = 30;  // Timer duration in seconds
let score = 0;      // Player's score
let rangeMin = 1;
let rangeMax = 50;  // Default range for Easy difficulty

// Function to start the game
function startGame() {
    secretNumber = Math.floor(Math.random() * (rangeMax - rangeMin + 1)) + rangeMin;
    attempts = 0;
    timeLeft = 30; // Reset timer
    score = 0; // Reset score
    document.getElementById("message").innerText = "";
    document.getElementById("score").innerText = `Score: ${score}`;
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
    document.querySelector("button[onclick='restartGame()']").style.display = "none"; // Hide play again button
    document.querySelector("input").disabled = false; // Enable input field
    document.querySelector("button").style.display = "block"; // Show submit button
    startTimer(); // Start the timer
}

// Function to update the timer
function startTimer() {
    timer = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("message").innerText = "Time's up! You lost!";
            document.querySelector("button[onclick='restartGame()']").style.display = "block";
            document.querySelector("input").disabled = true;
            document.querySelector("button").style.display = "none";
        } else {
            timeLeft--;
            document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
        }
    }, 1000);
}

// Function to check the user's guess
function checkGuess() {
    const userGuess = parseInt(document.getElementById("userGuess").value);
    attempts++;

    if (isNaN(userGuess)) {
        document.getElementById("message").innerText = "Please enter a valid number!";
        return;
    }

    if (userGuess < secretNumber) {
        document.getElementById("message").innerText = `Too low! Try again. Attempts: ${attempts}`;
    } else if (userGuess > secretNumber) {
        document.getElementById("message").innerText = `Too high! Try again. Attempts: ${attempts}`;
    } else {
        document.getElementById("message").innerText = `Congratulations! You guessed the number in ${attempts} attempts.`;
        score = Math.max(0, 100 - (attempts * 10)); // Calculate score based on attempts
        document.getElementById("score").innerText = `Score: ${score}`;
        clearInterval(timer); // Stop the timer
        document.querySelector("button[onclick='restartGame()']").style.display = "block"; // Show the restart button
        document.querySelector("input").disabled = true; // Disable the input field
        document.querySelector("button").style.display = "none"; // Hide the submit button
    }
}

// Function to restart the game
function restartGame() {
    startGame();
    document.getElementById("userGuess").value = "";
}

// Function to change the difficulty level
function changeDifficulty() {
    const difficulty = document.getElementById("difficulty").value;
    if (difficulty === "easy") {
        rangeMin = 1;
        rangeMax = 50;
    } else if (difficulty === "medium") {
        rangeMin = 1;
        rangeMax = 100;
    } else {
        rangeMin = 1;
        rangeMax = 200;
    }
    startGame();
}

// Start the game when the page loads
document.getElementById("difficulty").addEventListener("change", changeDifficulty);

// Initial game start
startGame();
