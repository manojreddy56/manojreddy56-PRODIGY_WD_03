// script.js
let currentPlayer = 'X';
let gameState = Array(9).fill('');
let winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const gameMessage = document.getElementById('game-message');
const resetButton = document.getElementById('reset-button');

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = parseInt(cell.id.split('-')[1]);
  if (gameState[cellIndex] === '') {
    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
      gameMessage.textContent = `Game over! ${currentPlayer} wins!`;
    } else if (checkTie()) {
      gameMessage.textContent = `Game is tied!`;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      gameMessage.textContent = `${currentPlayer}'s turn!`;
    }
  }
}

function checkWin(player) {
  for (let i = 0; i < winningCombinations.length; i++) {
    const combination = winningCombinations[i];
    if (gameState[combination[0]] === player && gameState[combination[1]] === player && gameState[combination[2]] === player) {
      return true;
    }
  }
  return false;
}

function checkTie() {
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i] === '') {
      return false;
    }
  }
  return true;
}

function resetGame() {
  gameState = Array(9).fill('');
  cells.forEach(cell => {
    cell.textContent = '';
  });
  currentPlayer = 'X';
  gameMessage.textContent = `${currentPlayer}'s turn!`;
}