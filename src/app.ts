import { startGame } from './game';

const gameControlButton = document.getElementById("start-button") as HTMLButtonElement | null;
const restartButton = document.getElementById("restart-button") as HTMLButtonElement | null;
const winMessage = document.getElementById("win-message") as HTMLDivElement | null;





restartButton?.addEventListener("click", () => {
  if(!restartButton || !winMessage) {
    return;
  }
  startGame();
  winMessage.style.display = "none";
  restartButton.style.display = "none";
});


gameControlButton?.addEventListener("click", () => {
  if (!gameControlButton) {
    return;
  }
  startGame();
  gameControlButton.textContent = "Restart Game";
   
});
