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

export {
  createMatrix,
  mapMatrix,
  createMinesBoard,
  createNumbersBoard,
}