const puzzleContainer = document.getElementById('puzzle-container');
const resetButton = document.getElementById('reset-button');
const sizeInput = document.getElementById('size-input');
let puzzleSize = 4; // Default size
let puzzleArray = [];
let emptyTileIndex = puzzleSize * puzzleSize - 1;

// Initialize the puzzle
function initPuzzle() {
    puzzleArray = Array.from({ length: puzzleSize * puzzleSize }, (_, i) => i);
    shuffleArray(puzzleArray);
    renderPuzzle();
}

// Shuffle the puzzle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Render the puzzle on the UI
function renderPuzzle() {
    puzzleContainer.innerHTML = `<img src="/assets/descarga.jpeg">`;
    puzzleArray.forEach((tile, index) => {
        const tileElement = document.createElement('div');
        tileElement.className = 'tile';
        tileElement.textContent = tile === 0 ? '' : tile;
        tileElement.dataset.index = index;
        tileElement.addEventListener('click', () => handleTileClick(index));
        puzzleContainer.appendChild(tileElement);
    });
}

// Handle tile click events
function handleTileClick(index) {
    const [row, col] = [Math.floor(index / puzzleSize), index % puzzleSize];
    const [emptyRow, emptyCol] = [Math.floor(emptyTileIndex / puzzleSize), emptyTileIndex % puzzleSize];

    if ((Math.abs(row - emptyRow) === 1 && col === emptyCol) || 
        (Math.abs(col - emptyCol) === 1 && row === emptyRow)) {
        [puzzleArray[index], puzzleArray[emptyTileIndex]] = [puzzleArray[emptyTileIndex], puzzleArray[index]];
        emptyTileIndex = index;
        renderPuzzle();
    }
}

// Reset the puzzle
resetButton.addEventListener('click', () => {
    initPuzzle();
});

// Set puzzle size from input
sizeInput.addEventListener('change', (event) => {
    puzzleSize = parseInt(event.target.value);
    emptyTileIndex = puzzleSize * puzzleSize - 1;
    initPuzzle();
});

// Start the puzzle
initPuzzle();