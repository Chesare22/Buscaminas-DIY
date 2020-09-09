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

    pressFlagButton([ row, column ]) {
      if (uncoveredCells[row][column]) { return }
      flags[row][column] = !flags[row][column]
      totalFlags += flags[row][column] ? 1 : -1
      return flags[row][column]
    },

    // Returns an array of coordinates that should be uncovered
    pressUncoverButton([ row, column ]) {
      if (flags[row][column] || uncoveredCells[row][column]) {
        return []
      }

      if (minesBoard[row][column]) {
        gameOver = true
      } else {
        uncoveredCells[row][column] = true
        cellsLeft--
      }
      return [ [ row, column ] ]
    },
  }
}

export default Game
