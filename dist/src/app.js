import { startGame } from './game.js';
const gameControlButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const winMessage = document.getElementById("win-message");
restartButton === null || restartButton === void 0 ? void 0 : restartButton.addEventListener("click", () => {
    if (!restartButton || !winMessage) {
        return;
    }
    startGame();
    winMessage.style.display = "none";
    restartButton.style.display = "none";
});
gameControlButton === null || gameControlButton === void 0 ? void 0 : gameControlButton.addEventListener("click", () => {
    if (!gameControlButton) {
        return;
    }
    startGame();
    gameControlButton.textContent = "Restart Game";
});
