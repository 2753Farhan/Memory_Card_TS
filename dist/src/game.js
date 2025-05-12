"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startGame = startGame;
let gameState = {
    timerInterval: null,
    moveCounter: 0,
    clickedCards: 0,
    locked: false,
    matchState: null,
    cardElements: []
};
function startGame() {
    cleanupGame();
    const board = document.getElementById("game-board");
    if (!board) {
        console.error("Game board element not found");
        return;
    }
    board.innerHTML = "";
    const input = document.getElementById("unique-card-numbers");
    if (!input) {
        console.error("Input element not found");
        return;
    }
    const uniqueCardNumbers = parseInt(input.value);
    const moveValueElement = document.getElementById("move-value");
    if (moveValueElement) {
        moveValueElement.innerHTML = "0";
    }
    const timeValueElement = document.getElementById("time-value");
    if (timeValueElement) {
        timeValueElement.innerHTML = "00:00";
    }
    else {
        console.error("Time value element not found");
    }
    let cardArray = [];
    for (let i = 0; i < uniqueCardNumbers; i++) {
        const letter = String.fromCharCode(65 + i); // 65 = ASCII for 'A'
        cardArray.push(letter, letter); // Push pairs
    }
    cardArray = shuffle(cardArray);
    gameState.matchState = {
        matchedCards: 0,
        totalUniqueCards: uniqueCardNumbers,
        seconds: 0,
    };
    gameState.moveCounter = 0;
    gameState.clickedCards = 0;
    gameState.locked = false;
    gameState.cardElements = [];
    cardArray.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.textContent = card;
        board.appendChild(cardElement);
        gameState.cardElements.push(cardElement);
        cardElement.addEventListener("click", async () => {
            if (gameState.locked ||
                cardElement.classList.contains("flipped") ||
                cardElement.classList.contains("matched")) {
                return;
            }
            cardElement.classList.toggle("flipped");
            gameState.clickedCards++;
            if (gameState.clickedCards === 2) {
                gameState.moveCounter++;
                const moveValueElement = document.getElementById("move-value");
                if (moveValueElement) {
                    moveValueElement.innerHTML = gameState.moveCounter.toString();
                }
                const flippedCards = document.querySelectorAll(".flipped:not(.matched)");
                if (flippedCards.length === 2) {
                    gameState.locked = true;
                    await matchCards(flippedCards[0], flippedCards[1], gameState.matchState);
                    gameState.clickedCards = 0;
                    gameState.locked = false;
                }
            }
        });
    });
    gameState.timerInterval = setInterval(() => {
        if (!gameState.matchState) {
            return;
        }
        gameState.matchState.seconds++;
        const minutes = Math.floor(gameState.matchState.seconds / 60);
        const displaySeconds = gameState.matchState.seconds % 60;
        const timeValueElement = document.getElementById("time-value");
        if (!timeValueElement) {
            console.error("Time value element not found");
            return;
        }
        timeValueElement.innerHTML = `${String(minutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;
    }, 1000);
}
function cleanupGame() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
    gameState.cardElements.forEach(card => {
        const newCard = card.cloneNode(true);
        if (card.parentNode) {
            card.parentNode.replaceChild(newCard, card);
        }
    });
    gameState = {
        timerInterval: null,
        moveCounter: 0,
        clickedCards: 0,
        locked: false,
        matchState: null,
        cardElements: []
    };
}
async function matchCards(card1, card2, matchState) {
    if (card1.textContent === card2.textContent) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        if (matchState) {
            matchState.matchedCards += 1;
            if (matchState.matchedCards === matchState.totalUniqueCards) {
                if (gameState.timerInterval == null) {
                    console.error("Timer interval is null");
                    return;
                }
                clearInterval(gameState.timerInterval);
                gameState.timerInterval = null;
                const winMessage = document.getElementById("win-message");
                if (winMessage) {
                    winMessage.style.display = "block";
                }
                const restartButton = document.getElementById("restart-button");
                if (restartButton) {
                    restartButton.style.display = "block";
                }
            }
        }
    }
    else {
        await delay(1000);
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
    }
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
