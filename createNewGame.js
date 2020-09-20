const createMatrix = ({ rows, columns, value }) => Array(rows)
  .fill()
  .map(() => Array(columns).fill(value))

const placeMines = ({ rows, columns, mines: amountOfMines }) => {
  const board = createMatrix({ rows, columns, value: 0 })

  let minesLeft = 0
  while (minesLeft < amountOfMines) {
    const row = Math.floor(Math.random() * rows)
    const column = Math.floor(Math.random() * columns)

    if (board[row][column] !== -1) {
      ++minesLeft
      board[row][column] = -1

      // For every mine, add 1 to the cells around
      for (let i = Math.max(0, row - 1); i < Math.min(rows, row + 2); i++) {
        for (let j = Math.max(0, column - 1); j < Math.min(columns, column + 2); j++) {
          if (board[i][j] !== -1) {
            ++board[i][j]
          }
        }
      }
    }
  }

  return board
}


/* exported createNewGame */
const createNewGame = ({ rows, columns, mines }) => {
  let gameOver = false
  let flagsLeft = mines
  let cellsLeft = (rows * columns) - mines

  const state = {
    board: placeMines({ rows, columns, mines }),
    flags: createMatrix({ rows, columns, value: false }),
    uncoveredCells: createMatrix({ rows, columns, value: false }),
  }


  const recursiveUncover = (row, column, coordinates) => {
    if (state.flags[row][column] || state.uncoveredCells[row][column]) {
      return coordinates
    }

    --cellsLeft
    state.uncoveredCells[row][column] = true
    coordinates.push({ row, column, content: state.board[row][column] })

    if (state.board[row][column] === 0) {
      for (let i = Math.max(0, row - 1); i < Math.min(rows, row + 2); i++) {
        for (let j = Math.max(0, column - 1); j < Math.min(columns, column + 2); j++) {
          recursiveUncover(i, j, coordinates)
        }
      }
    }

    return coordinates
  }

  return {
    get gameOver() { return gameOver },
    get victory() { return cellsLeft === 0 },

    printState(keys = ['board', 'flags', 'uncoveredCells']) {
      keys.forEach(key => {
        if (state[key] != null) {
          console.log(`${key}:`, state[key])
        }
      })
    },

    flag({ row, column }) {
      if (state.uncoveredCells[row][column]) {
        return null
      }

      state.flags[row][column] = !state.flags[row][column]
      flagsLeft += state.flags[row][column] ? 1 : -1
      return {
        hasFlag: state.flags[row][column],
        flagsLeft,
      }
    },

    // Returns an array of coordinates that should be uncovered
    uncover({ row, column }) {
      if (state.flags[row][column]) {
        return []
      }
      if (state.board[row][column] === -1) {
        gameOver = true
        return [{ row, column, content: 'bomb' }]
      }

      return recursiveUncover(row, column, [])
    },
  }
}
