import Game from './Game.js'
import { mapMatrix } from './UsefulFunctions.js'
import { createCells, possibleCells } from './View.js'

const game = Game(21, 23, 99)
const createFlagImage = () => {
  const flag = document.createElement('img')
  flag.src = './assets/flag.svg'
  flag.className = 'flag'
  flag.width = 20
  return flag
}

window.onload = function() {
  const board = document.getElementById('board')

  const cells = createCells(game)
  const flags = mapMatrix(game.board, () => null)

  const handleClick = (row, column) => mouseEvent => {
    if (mouseEvent.button === 0) {
      // uncover button
      game.pressUncoverButton(row, column)
        .forEach(([ x, y ]) => {
          const button = cells[x][y]
          button.className = 'uncovered no-browser-styling'
          if (!button.firstChild) {
            const cellContent = possibleCells[game.board[x][y]]()
            button.appendChild(cellContent)
          }
        })
    } else if (mouseEvent.button === 2) {
      // flag button
      const showFlag = game.pressFlagButton(row, column)
      if (showFlag) {
        const flagImg = flags[row][column] || createFlagImage()
        flags[row][column] = flagImg
        cells[row][column].appendChild(flagImg)
      } else if (flags[row][column]) {
        cells[row][column].removeChild(flags[row][column])
      }
    }
  }
  cells.forEach((row, rowIndex) => {
    row.forEach((button, columnIndex) => {
      board.appendChild(button)
      button.addEventListener('contextmenu', e => { e.preventDefault(); return false })
      button.addEventListener('mouseup', handleClick(rowIndex, columnIndex))
    })
  })
}
