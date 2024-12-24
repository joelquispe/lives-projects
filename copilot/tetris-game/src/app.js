// JavaScript logic for the Tetris game

const canvas = document.getElementById('tetris');
if (!canvas) {
    throw new Error("Canvas element with id 'tetris' not found");
}
const context = canvas.getContext('2d');

canvas.width = 240;
canvas.height = 400;

const colors = [
    null,
    'red',
    'blue',
    'green',
    'purple',
    'orange',
    'yellow',
    'cyan'
];

const tetrominoes = [
    [],
    [[1, 1, 1, 1]], // I
    [[1, 1], [1, 1]], // O
    [[0, 1, 0], [1, 1, 1]], // T
    [[1, 1, 0], [0, 1, 1]], // S
    [[0, 1, 1], [1, 1, 0]], // Z
    [[1, 0, 0], [1, 1, 1]], // L
    [[0, 0, 1], [1, 1, 1]]  // J
];

let board = Array.from({ length: 20 }, () => Array(12).fill(0));
let currentTetromino;
let currentPosition;
let gameOver = false;
let score = 0;
const scoreElement = document.getElementById('score');

function drawBoard() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    board.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                context.fillStyle = colors[value];
                context.fillRect(x * 20, y * 20, 20, 20);
                context.strokeRect(x * 20, y * 20, 20, 20);
            }
        });
    });
}

function drawTetromino() {
    currentTetromino.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                context.fillStyle = colors[currentTetromino.color];
                context.fillRect((currentPosition.x + x) * 20, (currentPosition.y + y) * 20, 20, 20);
                context.strokeRect((currentPosition.x + x) * 20, (currentPosition.y + y) * 20, 20, 20);
            }
        });
    });
}

function collide(offset) {
    return currentTetromino.shape.some((row, y) => {
        return row.some((value, x) => {
            if (value) {
                const newX = currentPosition.x + x + offset.x;
                const newY = currentPosition.y + y + offset.y;
                return newX < 0 || newX >= 12 || newY >= 20 || (newY >= 0 && board[newY][newX]);
            }
            return false;
        });
    });
}

function merge() {
    currentTetromino.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                board[currentPosition.y + y][currentPosition.x + x] = currentTetromino.color;
            }
        });
    });
}

function updateScore(points) {
    score += points;
    scoreElement.innerText = `Puntuación: ${score}`;
}

function resetGame() {
    board = Array.from({ length: 20 }, () => Array(12).fill(0));
    score = 0;
    updateScore(0);
    gameOver = false;
    spawnTetromino();
    gameLoop();
}

function clearLines() {
    let linesCleared = 0;
    board = board.reduce((acc, row) => {
        if (row.every(value => value)) {
            acc.unshift(Array(12).fill(0));
            linesCleared++;
        } else {
            acc.push(row);
        }
        return acc;
    }, []);
    if (linesCleared > 0) {
        updateScore(linesCleared * 500);
    }
}

function spawnTetromino() {
    const index = Math.floor(Math.random() * (tetrominoes.length - 1)) + 1;
    currentTetromino = { shape: tetrominoes[index], color: index };
    currentPosition = { x: 4, y: 0 };

    if (collide({ x: 0, y: 0 })) {
        gameOver = true;
    }
}

function rotate(matrix) {
    return matrix[0].map((_, index) => matrix.map(row => row[index]).reverse());
}

function rotateTetromino() {
    const rotatedShape = rotate(currentTetromino.shape);
    const originalPosition = { ...currentPosition };
    currentTetromino.shape = rotatedShape;

    if (collide({ x: 0, y: 0 })) {
        currentTetromino.shape = rotate(rotate(rotate(rotatedShape))); // Rotate back to original
        currentPosition = originalPosition;
    }
}

function update() {
    if (gameOver) {
        alert("Has perdido! Presiona Aceptar para reiniciar.");
        resetGame();
        return;
    }

    if (score >= 5000) {
        alert("Has ganado! Presiona Aceptar para reiniciar.");
        resetGame();
        return;
    }

    if (!collide({ x: 0, y: 1 })) {
        currentPosition.y++;
    } else {
        merge();
        clearLines();
        spawnTetromino();
    }

    drawBoard();
    drawTetromino();
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && !collide({ x: -1, y: 0 })) {
        currentPosition.x--;
    } else if (event.key === 'ArrowRight' && !collide({ x: 1, y: 0 })) {
        currentPosition.x++;
    } else if (event.key === 'ArrowDown') {
        update();
    } else if (event.key === 'ArrowUp') {
        rotateTetromino();
    }
});

document.getElementById('start-button').addEventListener('click', resetGame);

function gameLoop() {
    update();
    setTimeout(gameLoop, 1000);
}

spawnTetromino();
gameLoop();