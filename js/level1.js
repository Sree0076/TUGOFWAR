'use strict';
// Declare variables with proper types
var score1 = 0;
var score2 = 0;
var gameInterval;
var counterInterval;
var movemet = 0;
var counter_time = 3;
var timeLeft = 30;
// Get HTML elements
var timeLeftDisplay = document.getElementById('time-left');
var counterElement = document.getElementById('counter');
var counterLeftDisplay = document.getElementById('counter-left');
var image = document.querySelector('.image');
var container = image.parentElement;
document.addEventListener('DOMContentLoaded', function () {
    var myModal = new bootstrap.Modal(document.getElementById('instructionsModal'));
    myModal.show();
});
var updateTimerDisplay = function () {
    timeLeftDisplay.textContent = String(timeLeft);
};
var startTimer = function () {
    movemet = 1;
    gameInterval = window.setInterval(function () {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            displayWinner();
        }
    }, 1000);
};

var startGame = function () {
    timeLeft = 30;
    score1 = 0;
    score2 = 0;
    var containerWidth = container.clientWidth;
    var imageWidth = image.clientWidth;
    var initialLeft = (containerWidth - imageWidth) / 2;
    image.style.left = "".concat(initialLeft, "px");
    var modals = document.querySelectorAll('.modal');
    modals.forEach(function (modal) {
        var modalInstance = bootstrap.Modal.getInstance(modal);
        if (modalInstance) {
            modalInstance.hide();
        }
    });
    updateScore();
    startTimer();
};
window.onload = function () {
    var containerWidth = container.clientWidth;
    var imageWidth = image.clientWidth;
    var initialLeft = (containerWidth - imageWidth) / 2;
    image.style.left = "".concat(initialLeft, "px");
};
document.addEventListener('keydown', function (event) {
    if (movemet === 1) {
        if (event.key === 'a' && timeLeft > 0) {
            moveLeft();
        }
        else if (event.key === 'Enter' && timeLeft > 0) {
            moveRight();
        }
    }
});
var moveLeft = function () {
    var currentLeft = parseFloat(image.style.left) || 0;
    var newLeft = currentLeft - 30;
    if (newLeft > -460) {
        image.style.left = "".concat(newLeft, "px");
        checkForWinner();
    }
};
var moveRight = function () {
    var currentLeft = parseFloat(image.style.left) || 0;
    var newLeft = currentLeft + 30;
    if (newLeft < 360) {
        image.style.left = "".concat(newLeft, "px");
        checkForWinner();
    }
};
var checkForWinner = function () {
    var currentLeft = parseFloat(image.style.left) || 0;
    if (currentLeft <= -450) {
        score1++;
        updateScore();
        resetGame();
    }
    else if (currentLeft >= 330) {
        score2++;
        updateScore();
        resetGame();
    }
};
var updateScore = function () {
    var scoreElement1 = document.querySelector('.score1');
    var scoreElement2 = document.querySelector('.score2');
    scoreElement1.textContent = "Score: ".concat(score1);
    scoreElement2.textContent = "Score: ".concat(score2);
};
var displayWinner = function () {
    localStorage.setItem('score1', score1.toString());
    localStorage.setItem('score2', score2.toString());
    if (score1 > score2) {
        var winnerModalPlayer1 = new bootstrap.Modal(document.getElementById('winnerModalPlayer1'));
        document.getElementById('dispscore1').textContent = score1;
        winnerModalPlayer1.show();
    }
    else if (score2 > score1) {
        var winnerModalPlayer2 = new bootstrap.Modal(document.getElementById('winnerModalPlayer2'));
        document.getElementById('dispscore2').textContent = score2;
        winnerModalPlayer2.show();
    }
    else {
        var winnerModalPlayer3 = new bootstrap.Modal(document.getElementById('winnerModalPlayer3'));
        winnerModalPlayer3.show();
    }
};
var resetGame = function () {
    var containerWidth = container.clientWidth;
    var imageWidth = image.clientWidth;
    var initialLeft = (containerWidth - imageWidth) / 2;
    image.style.left = "".concat(initialLeft, "px");
    counter();
};
var counter = function () {
    counterElement.style.visibility = "visible";
    movemet = 0;
    counterInterval = window.setInterval(function () {
        counter_time--;
        updateCounterDisplay();
        if (counter_time <= 0) {
            clearInterval(counterInterval);
            movemet = 1;
            counter_time = 3;
            counterElement.style.visibility = "hidden";
        }
    }, 1000);
};
var updateCounterDisplay = function () {
    counterLeftDisplay.textContent = String(counter_time);
};
// var player1 = localStorage.getItem('player1-name').toString;
// document.getElementById('player1_name').innerText=player1;
// var player2 = localStorage.getItem('player2-name');
// document.getElementById('player2_name').textContent = player2;
