const createMatrix = ({ rows, columns, value }) => Array(rows)
  .fill()
  .map(() => Array(columns).fill(value))

const placeMines = ({ rows, columns, mines: amountOfMines }) => {
  const numbersBoard = createMatrix({ rows, columns, value: 0 })

  let minesLeft = 0
  while (minesLeft < amountOfMines) {
    const row = Math.floor(Math.random() * rows)
    const column = Math.floor(Math.random() * columns)

    if (numbersBoard[row][column] !== -1) {
      ++minesLeft
      numbersBoard[row][column] = -1

      // For every mine, add 1 to the cells around
      for (let i = Math.max(0, row - 1); i < Math.min(rows, row + 2); i++) {
        for (let j = Math.max(0, column - 1); j < Math.min(columns, column + 2); j++) {
          if (numbersBoard[i][j] !== -1) {
            numbersBoard[i][j]++
          }
        }
      }
    }
  }

  return numbersBoard
}


/* exported createNewGame */
const createNewGame = ({ rows, columns, mines }) => {
  let gameOver = false
  let flagsLeft = mines
  let cellsLeft = (rows * columns) - mines

  const flags = createMatrix({ rows, columns, value: false })
  const uncoveredCells = JSON.parse(JSON.stringify(flags))
  const numbersBoard = placeMines({ rows, columns, mines })

  console.log('board:', numbersBoard)

  const uncoverCells = ([row, column], coordinates) => {
    if (flags[row][column] || uncoveredCells[row][column]) {
      return coordinates
    }

    --cellsLeft
    uncoveredCells[row][column] = true
    coordinates.push([row, column])

    if (numbersBoard[row][column] === 0) {
      for (let i = Math.max(0, row - 1); i < Math.min(rows, row + 2); i++) {
        for (let j = Math.max(0, column - 1); j < Math.min(columns, column + 2); j++) {
          uncoverCells([i, j], coordinates)
        }
      }
    }

    return coordinates
  }

  return {
    get gameOver() { return gameOver },
    get flagsLeft() { return flagsLeft },
    get gameIsFinished() { return cellsLeft === 0 },

    // null | {
    //   hasFlag: boolean,
    //   remainingFlags: number,
    // }
    pressFlagButton([row, column]) {
      if (uncoveredCells[row][column]) { return }
      flags[row][column] = !flags[row][column]
      flagsLeft += flags[row][column] ? 1 : -1
      return flags[row][column]
    },

    // Returns an array of coordinates that should be uncovered
    pressUncoverButton([row, column]) {
      if (numbersBoard[row][column] !== -1) {
        gameOver = true
        return [[row, column]]
      }

      return uncoverCells([row, column], [])
    },
  }
}

// export default Game
