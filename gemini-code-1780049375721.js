let tttBoard = null;
let tttGameActive = true;
let tttCurrentPlayer = "X";
let tttWinCount = {X: 0, O: 0};

const TTT_WIN_CONDITIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function startGame() {
  initTTT();
}

function initTTT() {
  tttBoard = ["", "", "", "", "", "", "", "", ""];
  tttGameActive = true;
  tttCurrentPlayer = "X";
  renderTTT();
}

function renderTTT() {
  let html = '<div class="ttt-status">';
  if (!tttGameActive) {
    const winner = checkTTTWinner();
    if (winner) {
      html += `🎉 ${winner} Wins!`;
    } else {
      html += "It's a Draw! 🤝";
    }
  } else {
    html += `Current Turn: ${tttCurrentPlayer} | Scores - X: ${tttWinCount.X} | O: ${tttWinCount.O}`;
  }
  html += '</div><div class="game-container">';
  
  tttBoard.forEach((cell, idx) => {
    html += `<div class='ttt-cell' onclick='playTTT(event, ${idx})'>${cell}</div>`;
  });
  
  html += '</div>';
  document.getElementById("game").innerHTML = html;
}

function playTTT(event, idx) {
  if (tttBoard[idx] !== "" || !tttGameActive) return;
  
  tttBoard[idx] = tttCurrentPlayer;
  const winner = checkTTTWinner();
  
  if (winner) {
    tttGameActive = false;
    tttWinCount[tttCurrentPlayer]++;
    if (typeof createSparkles === "function") createSparkles(event.clientX, event.clientY, "🎉");
  } else if (!tttBoard.includes("")) {
    tttGameActive = false;
    if (typeof createSparkles === "function") createSparkles(event.clientX, event.clientY, "🤝");
  } else {
    tttCurrentPlayer = tttCurrentPlayer === "X" ? "O" : "X";
  }
  
  renderTTT();
}

function checkTTTWinner() {
  for (let condition of TTT_WIN_CONDITIONS) {
    if (tttBoard[condition[0]] && 
        tttBoard[condition[0]] === tttBoard[condition[1]] && 
        tttBoard[condition[0]] === tttBoard[condition[2]]) {
      return tttBoard[condition[0]];
    }
  }
  return null;
}

window.addEventListener('DOMContentLoaded', () => {
  initTTT();
});