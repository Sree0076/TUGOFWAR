'use strict';

// Declare variables with proper types
let score1: number = 0;
let score2: number = 0;
let gameInterval: number | undefined;
let counterInterval: number | undefined;
let movemet: number = 0;
let counter_time: number = 3;
let timeLeft: number = 30;

// Get HTML elements
const timeLeftDisplay = document.getElementById('time-left') as HTMLElement;
const counterElement = document.getElementById('counter') as HTMLElement;
const counterLeftDisplay = document.getElementById('counter-left') as HTMLElement;
const image = document.querySelector('.image') as HTMLElement;
const container = image.parentElement as HTMLElement;




document.addEventListener('DOMContentLoaded', () => {
    const myModal = new bootstrap.Modal(document.getElementById('instructionsModal') as HTMLElement);
    myModal.show();
});

const updateTimerDisplay = (): void => {
    timeLeftDisplay.textContent = String(timeLeft);
};

const startTimer = (): void => {
    movemet = 1;
    gameInterval = window.setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            displayWinner();
        }
    }, 1000);
};

const startGame = (): void => {
    timeLeft = 30;
    score1 = 0;
    score2 = 0;

    const containerWidth = container.clientWidth;
    const imageWidth = image.clientWidth;
    const initialLeft = (containerWidth - imageWidth) / 2;

    image.style.left = `${initialLeft}px`;
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        const modalInstance = bootstrap.Modal.getInstance(modal as HTMLElement);
        if (modalInstance) {
            modalInstance.hide();
        }
    });
    updateScore();
    startTimer();
};

window.onload = (): void => {
    const containerWidth = container.clientWidth;
    const imageWidth = image.clientWidth;
    const initialLeft = (containerWidth - imageWidth) / 2;

    image.style.left = `${initialLeft}px`;
};

document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (movemet === 1) {
        if (event.key === 'a' && timeLeft > 0) {
            moveLeft();
        } else if (event.key === 'Enter' && timeLeft > 0) {
            moveRight();
        }
    }
});



const moveLeft = (): void => {
    const currentLeft = parseFloat(image.style.left) || 0;
    const newLeft = currentLeft - 30;
    if (newLeft > -460) {
        image.style.left = `${newLeft}px`;
        checkForWinner();
    }
};

const moveRight = (): void => {
    const currentLeft = parseFloat(image.style.left) || 0;
    const newLeft = currentLeft + 30;
    if (newLeft < 360) {
        image.style.left = `${newLeft}px`;
        checkForWinner();
    }
};

const checkForWinner = (): void => {
    const currentLeft = parseFloat(image.style.left) || 0;

    if (currentLeft <= -450) {
        score1++;
        updateScore();
        resetGame();
    } else if (currentLeft >= 330) {
        score2++;
        updateScore();
        resetGame();
    }
};

const updateScore = (): void => {
    const scoreElement1 = document.querySelector('.score1') as HTMLElement;
    const scoreElement2 = document.querySelector('.score2') as HTMLElement;
    scoreElement1.textContent = `Score: ${score1}`;
    scoreElement2.textContent = `Score: ${score2}`;
};

const displayWinner = (): void => {
    localStorage.setItem('score1', score1.toString());
    localStorage.setItem('score2', score2.toString()); 
    if (score1 > score2) {
        const winnerModalPlayer1 = new bootstrap.Modal(document.getElementById('winnerModalPlayer1') as HTMLElement);
        document.getElementById('dispscore1')!.textContent = score1.toString();
        winnerModalPlayer1.show();
    } else if (score2 > score1) {
        const winnerModalPlayer2 = new bootstrap.Modal(document.getElementById('winnerModalPlayer2') as HTMLElement);
        document.getElementById('dispscore1')!.textContent = score2.toString();
        winnerModalPlayer2.show();
    } else {
        const winnerModalPlayer3 = new bootstrap.Modal(document.getElementById('winnerModalPlayer3') as HTMLElement);
        winnerModalPlayer3.show();
    }
};

const resetGame = (): void => {
    const containerWidth = container.clientWidth;
    const imageWidth = image.clientWidth;
    const initialLeft = (containerWidth - imageWidth) / 2;
    image.style.left = `${initialLeft}px`;
    counter();
};

const counter = (): void => {
    counterElement.style.visibility = "visible";
    movemet = 0;
    counterInterval = window.setInterval(() => {
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

const updateCounterDisplay = (): void => {
    counterLeftDisplay.textContent = String(counter_time);
};
let player1: string | null = localStorage.getItem('player1-name');
document.getElementById('player1')!.textContent = player1!;
let player2: string | null = localStorage.getItem('player2-name');
document.getElementById('player2')!.textContent = player2!;