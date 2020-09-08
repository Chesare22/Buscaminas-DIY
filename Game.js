import { createMatrix, createMinesBoard, createBoard } from './UsefulFunctions.js'

const Game = (rows, columns, bombs) => {
  let gameOver = false
  let totalFlags = bombs
  let cellsLeft = (rows * columns) - bombs

  const flags = createMatrix(rows, columns, false)
  const { minesBoard, coordinates: minesCoordinates } = createMinesBoard(flags, bombs)
  const board = createBoard(minesBoard, minesCoordinates)
  const uncoveredCells = JSON.parse(JSON.stringify(flags))

  return {
    board,
    get gameOver() { return gameOver },
    get totalFlags() { return totalFlags },
    get gameIsFinished() { return cellsLeft === 0 },

    pressFlagButton(rowIndex, columnIndex) {
      if (uncoveredCells[rowIndex][columnIndex]) { return }
      flags[rowIndex][columnIndex] = !flags[rowIndex][columnIndex]
      totalFlags += flags[rowIndex][columnIndex] ? 1 : -1
      return flags[rowIndex][columnIndex]
    },

    // Returns an array of coordinates that should be uncovered
    pressUncoverButton(rowIndex, columnIndex) {
      if (flags[rowIndex][columnIndex] || uncoveredCells[rowIndex][columnIndex]) {
        return []
      }

      if (minesBoard[rowIndex][columnIndex]) {
        gameOver = true
      } else {
        uncoveredCells[rowIndex][columnIndex] = true
        cellsLeft--
      }
      return [ [ rowIndex, columnIndex ] ]
    },
  }
}

export default Game
