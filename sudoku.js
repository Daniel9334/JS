function solveSudoku(array) {
  const emptyCell = findEmptyCell(array);

  if (!emptyCell) {
    // If there are no empty cells, the Sudoku is solved
    return true;
  }

  const [row, col] = emptyCell;

  for (let num = 1; num <= 9; num++) {
    if (isValidMove(array, row, col, num)) {
      // Try placing the number in the empty cell
      array[row][col] = num;

      // Recursively attempt to solve the Sudoku
      if (solveSudoku(array)) {
        return true;
      }

      // If placing the number didn't lead to a solution, backtrack
      array[row][col] = 0;
    }
  }

  // No number can be placed, backtrack to the previous empty cell
  return false;
}

function findEmptyCell(array) {
  // Find the first empty cell (with value 0)
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (array[row][col] === 0) {
        return [row, col];
      }
    }
  }

  // If there are no empty cells, the Sudoku is solved
  return null;
}

function isValidMove(array, row, col, num) {
  // Check if the number is not in the same row or column
  for (let i = 0; i < 9; i++) {
    if (array[row][i] === num || array[i][col] === num) {
      return false;
    }
  }

  // Check if the number is not in the same 3x3 box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (array[startRow + i][startCol + j] === num) {
        return false;
      }
    }
  }
  return true;
}

// Example Sudoku array (0 represents empty cells)
let sudokuArray = [
  [7, 0, 4, 8, 0, 0, 3, 0, 1],
  [8, 2, 0, 5, 0, 0, 0, 4, 0],
  [0, 0, 9, 4, 3, 0, 5, 0, 0],
  [3, 1, 0, 0, 0, 0, 8, 0, 7],
  [0, 8, 0, 0, 0, 0, 0, 1, 0],
  [9, 0, 7, 0, 0, 0, 0, 3, 2],
  [0, 0, 6, 0, 1, 5, 4, 0, 0],
  [0, 7, 0, 0, 0, 9, 0, 6, 5],
  [5, 0, 8, 0, 0, 2, 1, 0, 3],
];

if (solveSudoku(sudokuArray)) {
  console.log("Sudoku solved:");
  viewSudokuArray(sudokuArray);
} else {
  console.log("No solution exists.");
}

// Display on the array
function viewSudokuArray(array) {
  for (let i = 0; i < 9; i++) {
    console.log(array[i].join(" "));
  }
}
