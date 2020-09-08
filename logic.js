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

const createNumbersBoard = (minesBoard, minesCoordinates) => {
  const board = mapMatrix(minesBoard, () => 0)

  minesCoordinates.forEach(([ row, column ]) => {
    for (let i = Math.max(0, row - 1); i < Math.min(board.length, row + 2); i++) {
      for (let j = Math.max(0, column - 1); j < Math.min(board[i].length, column + 2); j++) {
        board[i][j]++
      }
    }
  })

  return board
}


const emptyBoard = createMatrix(21, 23)
const { minesBoard, coordinates: minesCoordinates } = createMinesBoard(emptyBoard, 99)
const numbersBoard = createNumbersBoard(minesBoard, minesCoordinates)

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

window.onload = function() {
  const board = document.getElementById('board')
  numbersBoard.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      const htmlCell = document.createElement('div')
      htmlCell.className = 'covered'
      let cellContent
      if (minesBoard[rowIndex][columnIndex]) {
        cellContent = document.createElement('span')
        cellContent.innerText = 'M'
      } else {
        cellContent = document.createElement('span')
        cellContent.className = `_${cell}`
        cellContent.innerText = cell
      }
      cellContent.style.display = 'none'
      htmlCell.appendChild(cellContent)
      htmlCell.addEventListener('click', function(mouseEvent) {
        if (mouseEvent.ctrlKey) {
          console.log('put flag')
        } else {
          console.log('uncover mine')
        }
      })
      board.appendChild(htmlCell)
    })
  })
}
