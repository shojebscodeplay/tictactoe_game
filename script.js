const cells = document.querySelectorAll('.cell');
const messageElement = document.querySelector('.message');
const restartButton = document.getElementById('restartButton');
const newGameButton = document.getElementById('newGameButton');
const modal = document.getElementById('resultModal');
const closeModal = document.querySelector('.close');
const resultMessage = document.querySelector('.result-message');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', () => handleCellClick(cell));
});

restartButton.addEventListener('click', restartGame);
newGameButton.addEventListener('click', startNewGame);
closeModal.addEventListener('click', closeModalPopup);
window.addEventListener('click', outsideClick);

function handleCellClick(cell) {
    const index = cell.getAttribute('data-index');
    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            showResult(`Player ${board[a]} wins!`);
            gameActive = false;
            return;
        }
    }

    if (!board.includes(null)) {
        showResult('Draw!');
        gameActive = false;
    }
}

function showResult(message) {
    resultMessage.textContent = message;
    modal.style.display = 'block';
}

function closeModalPopup() {
    modal.style.display = 'none';
}

function outsideClick(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

function restartGame() {
    board = Array(9).fill(null);
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
    messageElement.textContent = '';
    closeModalPopup();
}

function startNewGame() {
    restartGame();
    modal.style.display = 'none';
}

startNewGame(); // Initialize game
