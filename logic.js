'use strict'

const createMatrix = (rows, columns, cellValue = 0) => Array(rows).fill(Array(columns).fill(cellValue))

const mapMatrix = (matrix, mapper) => matrix.map(vector => vector.map(mapper))

const createMinesBoard = (board, amountOfMines) => {
  const minesBoard = mapMatrix(board, () => false)
  const coordinates = Array(amountOfMines)

  for (let i = 0; i < amountOfMines;) {
    const rowIndex = Math.floor(Math.random() * minesBoard.length)
    const columnIndex = Math.floor(Math.random() * minesBoard[rowIndex].length)
    if (!minesBoard[rowIndex][columnIndex]) {
      minesBoard[rowIndex][columnIndex] = true
      coordinates[i++] = [ rowIndex, columnIndex ]
    }
  }

  return { minesBoard, coordinates }
}


const emptyBoard = createMatrix(20, 24)
const { minesBoard, coordinates: minesCoordinates } = createMinesBoard(emptyBoard, 99)

console.log('empty board:', emptyBoard)
console.log('mines board:', minesBoard)
console.log('mines coordinates:', minesCoordinates)

// Esto es innecesario. Lo único que se hace es contar el número de `true` presentes en `minesBoard`
console.log('amount of mines:',
    minesBoard.reduce(
        (totalMines, row) => row.reduce(
            (minesPerRow, cell) => minesPerRow + cell,
            totalMines,
        ),
        0,
    ),
)