import { createMatrix, createMinesBoard, createBoard } from './UsefulFunctions.js'

const Game = (rows, columns, bombs) => {
  let gameOver = false
  let totalFlags = bombs
  let cellsLeft = (rows * columns) - bombs

  const flags = createMatrix(rows, columns, false)
  const { minesBoard, coordinates: minesCoordinates } = createMinesBoard(flags, bombs)
  const board = createBoard(minesBoard, minesCoordinates)
  const uncoveredCells = JSON.parse(JSON.stringify(flags))

  const uncoverCells = ([row, column], coordinates) => {
    if (flags[row][column] || uncoveredCells[row][column]) {
      return coordinates
    }

    --cellsLeft
    uncoveredCells[row][column] = true
    coordinates.push([row, column])

    if (board[row][column] === 0) {
      for (let i = Math.max(0, row - 1); i < Math.min(board.length, row + 2); i++) {
        for (let j = Math.max(0, column - 1); j < Math.min(board[i].length, column + 2); j++) {
          uncoverCells([i, j], coordinates)
        }
      }
    }

    return coordinates
  }

  return {
    board,
    get gameOver() { return gameOver },
    get totalFlags() { return totalFlags },
    get gameIsFinished() { return cellsLeft === 0 },

    // null | {
    //   hasFlag: boolean,
    //   remainingFlags: number,
    // }
    pressFlagButton([row, column]) {
      if (uncoveredCells[row][column]) { return }
      flags[row][column] = !flags[row][column]
      totalFlags += flags[row][column] ? 1 : -1
      return flags[row][column]
    },

    // Returns an array of coordinates that should be uncovered
    pressUncoverButton([row, column]) {
      if (minesBoard[row][column]) {
        gameOver = true
        return [[row, column]]
      }

      return uncoverCells([row, column], [])
    },
  }
}

export default Game
