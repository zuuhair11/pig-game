'use strict';


// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Global variables
let scores, currentScore, activePlayer, playing

// Starting condition
const init = function() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    
    diceEl.classList.add('hidden');

    // If the class already exists, JavaScript it won't added it again.
    // And the same rule apply for remove()
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');

    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
// The init function will executed only when the entire HTML document has been loaded.
document.addEventListener('DOMContentLoaded', init);


// Switch the player
const switchPlayer = function() {
    // Update the previous player score back to 0
    document.querySelector(`#current--${activePlayer}`).textContent = 0;

    // Clear the current score for next user
    currentScore = 0;

    // Switch the player
    activePlayer = activePlayer === 0 ? 1 : 0;

    // Apply CSS effect classes
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function() {
    if(playing) {
        // 1. Generate a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
    
        // 2. Display the dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
    
        // 3. Check for rolled 1:
        if(dice !== 1) {
            // Add score to the current score
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    
        // Switch the player
        } else {
            switchPlayer();
        }
    }
});


// Holding dice functionality
btnHold.addEventListener('click', function() {
    if(playing) {
        // 1. Add the current score to the active player's score
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
    
        // 2. Check if player's score is >= 100:
        if(scores[activePlayer] >= 20) {
            // Finish the game
            playing = false;
            diceEl.classList.add('hidden');

            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');

            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
    
        // 3. Switch the player
        } else {
            switchPlayer();
        }
    }
});


// New game functionality
btnNew.addEventListener('click', init);
