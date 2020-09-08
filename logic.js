import Game from './Game.js'
import { mapMatrix } from './UsefulFunctions.js'

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

  const buttons = mapMatrix(game.board, number => {
    const button = document.createElement('button')
    button.className = 'covered no-browser-styling'

    let cellContent
    if (number === -1) {
      cellContent = document.createElement('img')
      cellContent.src = './assets/bomb.svg'
      cellContent.alt = 'B'
      cellContent.width = 20
    } else {
      cellContent = document.createElement('span')
      if (number > 0) {
        cellContent.className = `_${number}`
        cellContent.innerText = number
      }
    }
    cellContent.style.visibility = 'hidden'

    button.appendChild(cellContent)
    return button
  })
  const flags = mapMatrix(game.board, () => null)

  const handleClick = (row, column) => mouseEvent => {
    console.log(`clicking coordinates [${row}, ${column}]`)
    if (mouseEvent.button === 0) {
      // uncover button
      game.pressUncoverButton(row, column)
        .map(([ x, y ]) => buttons[x][y])
        .forEach(button => {
          button.className = 'uncovered no-browser-styling'
          button.firstChild.style.visibility = 'visible'
        })
    } else if (mouseEvent.button === 2) {
      // flag button
      const showFlag = game.pressFlagButton(row, column)
      if (showFlag) {
        const flagImg = flags[row][column] || createFlagImage()
        flags[row][column] = flagImg
        buttons[row][column].appendChild(flagImg)
      } else if (flags[row][column]) {
        buttons[row][column].removeChild(flags[row][column])
      }
    }
  }
  buttons.forEach((row, rowIndex) => {
    row.forEach((button, columnIndex) => {
      const x = rowIndex, y = columnIndex
      board.appendChild(button)
      button.addEventListener('contextmenu', e => { e.preventDefault(); return false })
      button.addEventListener('mouseup', handleClick(x, y))
    })
  })
}
