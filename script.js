// Basic crossword grid setup with more words and fewer non-fillable blocks
const crosswordGrid = [
    [{ letter: 'H', number: 1 }, { letter: 'E' }, { letter: 'L' }, { letter: 'L' }, { letter: 'O' }, {}, { letter: 'W', number: 2 }, { letter: 'O' }, { letter: 'R' }, { letter: 'D' }],
    [{ letter: 'E' }, {}, {}, {}, { letter: 'A' }, {}, {}, {}, {}, { letter: 'S' }],
    [{ letter: 'L' }, {}, {}, {}, { letter: 'P' }, {}, {}, {}, {}, { letter: 'T' }],
    [{ letter: 'L' }, {}, {}, {}, { letter: 'P' }, {}, {}, {}, {}, { letter: 'A' }],
    [{ letter: 'O' }, {}, {}, {}, { letter: 'L' }, {}, {}, {}, {}, { letter: 'C' }],
    [{ letter: 'M', number: 3 }, { letter: 'O' }, { letter: 'R' }, { letter: 'E' }, {}, { letter: 'F', number: 4 }, { letter: 'I' }, { letter: 'L' }, { letter: 'L' }, { letter: 'A' }],
    [{}, {}, {}, {}, { letter: 'E' }, {}, {}, {}, {}, { letter: 'S' }],
    [{ letter: 'G', number: 5 }, { letter: 'A' }, { letter: 'M' }, { letter: 'E' }, {}, {}, {}, { letter: 'N', number: 6 }, { letter: 'O' }, { letter: 'W' }],
    [{}, {}, {}, {}, {}, {}, {}, { letter: 'O' }, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, { letter: 'W' }, {}, {}]
];

const crosswordGridElement = document.getElementById('crossword-grid');

// Create the grid
crosswordGrid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
        const input = document.createElement('input');
        input.maxLength = 1;
        input.dataset.row = rowIndex;
        input.dataset.col = colIndex;
        if (cell.letter) {
            input.dataset.correct = cell.letter; // Store the correct answer
            if (cell.number) {
                input.placeholder = cell.number; // Set the placeholder number
            }
        } else {
            input.disabled = true; // Non-fillable blocks
        }
        crosswordGridElement.appendChild(input);
    });
});

// Check answers
document.getElementById('check-answers').addEventListener('click', () => {
    const inputs = document.querySelectorAll('#crossword-grid input');
    let allCorrect = true;
    inputs.forEach(input => {
        if (!input.disabled) {
            const correctAnswer = input.dataset.correct;
            if (input.value.toUpperCase() !== correctAnswer) {
                input.style.backgroundColor = 'red';
                allCorrect = false;
            } else {
                input.style.backgroundColor = 'green';
            }
        }
    });
    if (allCorrect) {
        alert('Congratulations! You solved the crossword.');
    } else {
        alert('Some answers are incorrect. Please try again.');
    }
});

// Reset game
document.getElementById('reset-game').addEventListener('click', () => {
    const inputs = document.querySelectorAll('#crossword-grid input');
    inputs.forEach(input => {
        if (!input.disabled) {
            input.value = '';
            input.style.backgroundColor = '';
        }
    });
});

// Provide a hint
document.getElementById('give-hint').addEventListener('click', () => {
    const inputs = document.querySelectorAll('#crossword-grid input');
    const emptyInputs = Array.from(inputs).filter(input => input.value === '' && !input.disabled);
    if (emptyInputs.length > 0) {
        const randomInput = emptyInputs[Math.floor(Math.random() * emptyInputs.length)];
        randomInput.value = randomInput.dataset.correct;
        randomInput.style.backgroundColor = 'yellow';
    }
});