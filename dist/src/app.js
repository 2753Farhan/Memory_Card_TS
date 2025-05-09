"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_js_1 = require("./game.js");
const gameControlButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const winMessage = document.getElementById("win-message");
restartButton === null || restartButton === void 0 ? void 0 : restartButton.addEventListener("click", () => {
    if (!restartButton || !winMessage) {
        return;
    }
    (0, game_js_1.startGame)();
    winMessage.style.display = "none";
    restartButton.style.display = "none";
});
gameControlButton === null || gameControlButton === void 0 ? void 0 : gameControlButton.addEventListener("click", () => {
    if (!gameControlButton) {
        return;
    }
    (0, game_js_1.startGame)();
    gameControlButton.textContent = "Restart Game";
});
