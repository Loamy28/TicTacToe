// Game constants
const EMPTY = "";
const PLAYER1 = "X";
const PLAYER2 = "O";

// Game variables
let mode = "2-player"; // Default mode is 2-player
let scoreToWin = 5; // Default score to win is 5
let currentPlayer = PLAYER1;
let player1Score = 0;
let player2Score = 0;
let moves = 0;
let gameOver = false;

// Get HTML elements
const player1NameElement = document.getElementById("player1-name");
const player2NameElement = document.getElementById("player2-name");
const player1ScoreElement = document.getElementById("player1-score");
const player2ScoreElement = document.getElementById("player2-score");
const boardElement = document.getElementById("board");

// Add event listener to game mode select element
const modeElement = document.getElementById("mode");
modeElement.addEventListener("change", () => {
  mode = modeElement.value;
  resetGame();
});

// Add event listener to score select element
const scoreElement = document.getElementById("score");
scoreElement.addEventListener("change", () => {
  scoreToWin = parseInt(scoreElement.value);
  resetGame();
});

// Add event listener to reset game button
const resetGame = () => {
  currentPlayer = PLAYER1;
  player1Score = 0;
  player2Score = 0;
  moves = 0;
  gameOver = false;

  updateScoreboard();
  resetBoard();
};

// Add event listener to cells
const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (!gameOver) {
      makeMove(Array.from(cells).indexOf(cell));
    }
  });
});

// Function to handle player moves
const makeMove = (index) => {
  if (board[index] === EMPTY) {
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    moves++;

    if (checkWin(currentPlayer)) {
      endGame(currentPlayer);
    } else if (moves === 9) {
      endGame();
    } else {
      currentPlayer = currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;
      updateScoreboard();

      if (mode === "single-player" && currentPlayer === PLAYER2) {
        makeBotMove();
      }
    }
  }
};

// Function to handle bot moves in single-player mode
const makeBotMove = () => {
  const emptyCells = board.reduce((acc, cell, index) => {
    if (cell === EMPTY) {
      acc.push(index);
    }
    return acc;
  }, []);

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const randomCell = emptyCells[randomIndex];
  makeMove(randomCell);
};

// Function to check for a win
const checkWin = (player) => {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winConditions.some((condition) => {
    return (
      board[condition[0]] === player &&
      board[condition[1]] === player &&
      board[condition[2]] === player
    );
  });
};

// Function to end the game
const endGame = (winner) => {
  gameOver = true;

  if (winner === PLAYER1) {
    player1Score++;
  } else if (winner === PLAYER2) {
    player2Score++;
  }

  updateScoreboard();

  if (player1Score === scoreToWin || player2Score === scoreToWin) {
    const message = `Game over! ${
      winner === PLAYER1 ? "Player 1" : "Player 2"
    } wins!`;
    alert(message);
    resetGame();
  } else {
    resetBoard();
  }
};

// Function to reset the board
const resetBoard = () => {
  board = Array(9).fill(EMPTY);
  cells.forEach((cell) => {
    cell.textContent = "";
  });
};

// Function to update the scoreboard
const updateScoreboard = () => {
  player1NameElement.textContent = getPlayerName(PLAYER1);
  player2NameElement.textContent = getPlayerName(PLAYER2);
  player1ScoreElement.textContent = player1Score;
  player2ScoreElement.textContent = player2Score;
};

// Function to get player name based on mode
const getPlayerName = (player) => {
  if (mode === "2-player") {
    return player === PLAYER1 ? "Player 1" : "Player 2";
  } else {
    return player === PLAYER1 ? "Player" : "Bot";
  }
};

// Initialize game
let board = Array(9).fill(EMPTY);
updateScoreboard();
