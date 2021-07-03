'use strict';
window.addEventListener('load', function () {
    const guess = document.querySelector('.guess');
    const check = document.querySelector('.check');
    const number = document.querySelector('.number');
    const highscore = document.querySelector('.highscore');
    const again = document.querySelector('.again');
    const body = document.querySelector('body');
    const score = document.querySelector('.score');

    const randomNumber = function () {
        return Math.trunc(Math.random() * (100 - 1) + 1);
    };

    const displayMessage = function (message) {
        document.querySelector('.message').textContent = message;
    };

    let secretNumber = randomNumber();
    let attempts = 100;
    let maxscore = 0;

    const checkScore = function () {
        if (attempts > 1) {
            score.textContent = --attempts;
        } else {
            check.disabled = guess.disabled = true;
            displayMessage('😭 You lost...');
            body.style.backgroundColor = '#620129';
            number.textContent = secretNumber;
            score.textContent = 0;
        }
    };

    const checkValue = function (value) {
        if (value === secretNumber) {
            displayMessage('🏆 You Win! ✔');
            number.textContent = secretNumber;
            check.disabled = guess.disabled = true;
            body.style.backgroundColor = '#60b347';
            number.style.width = '30rem';
            if (maxscore < attempts) {
                maxscore = attempts;
                highscore.textContent = maxscore;
            }
        } else {
            displayMessage(value > secretNumber ? '📈 Too high' : '📉 Too low');
            checkScore();
        }
    };

    check.addEventListener('click', function () {
        const guessNumber = Number(guess.value);
        if (!guessNumber) {
            displayMessage('⛔ Type a number!');
        } else {
            checkValue(guessNumber);
        }
    });

    again.addEventListener('click', function () {
        attempts = 100;
        secretNumber = randomNumber();
        score.textContent = attempts;
        displayMessage('Start guessing...');
        guess.value = '';
        number.textContent = '?';
        check.disabled = guess.disabled = false;
        body.style.backgroundColor = '#222';
        number.style.width = '15rem';
    });
});
