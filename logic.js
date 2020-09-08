import { createMatrix, createMinesBoard, createNumbersBoard } from './UsefulFunctions.js'

const emptyBoard = createMatrix(21, 23)
const { minesBoard, coordinates: minesCoordinates } = createMinesBoard(emptyBoard, 99)
const numbersBoard = createNumbersBoard(minesBoard, minesCoordinates)

// Esto es innecesario. Lo único que se hace es contar el número de `true` presentes en `minesBoard`
console.log(
    'amount of mines:',
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
  let gameOver = false
  let totalFlags = 99
  let totalSafeCells = (21 * 23) - 99
  const flags = createMatrix(21, 23, false)
  numbersBoard.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      const htmlCell = document.createElement('button')
      htmlCell.className = 'covered no-browser-styling'
      let cellContent
      if (minesBoard[rowIndex][columnIndex]) {
        cellContent = document.createElement('span')
        cellContent.innerText = 'M'
      } else {
        cellContent = document.createElement('span')
        cellContent.className = `_${cell}`
        cellContent.innerText = cell
      }
      cellContent.style.visibility = 'hidden'
      htmlCell.appendChild(cellContent)
      htmlCell.addEventListener('contextmenu', e => { e.preventDefault(); return false })
      htmlCell.addEventListener('mouseup', function(mouseEvent) {
        mouseEvent.preventDefault()
        if (gameOver) { return }
        console.log('mouse Event', mouseEvent)
        if (mouseEvent.button === 2) {
          flags[rowIndex][columnIndex] = !flags[rowIndex][columnIndex]
          if (flags[rowIndex][columnIndex]) {
            totalFlags--
            const flagImg = document.createElement('img')
            flagImg.src = './assets/flag.svg'
            flagImg.width = 20
            flagImg.className = 'flag'
            this.appendChild(flagImg)
          } else {
            totalFlags++
            this.removeChild(this.lastChild)
          }
        } else if (mouseEvent.button === 0) {
          console.log('uncover mine')
          if (flags[rowIndex][columnIndex]) { return }
          cellContent.style.visibility = 'visible'
          if (minesBoard[rowIndex][columnIndex]) {
            gameOver = true
            alert('Game Over')
          } else {
            totalSafeCells--
            this.className = 'uncovered no-browser-styling'
            if (totalSafeCells === 0) {
              alert('Winner uwu')
            }
          }
        }
      })
      board.appendChild(htmlCell)
    })
  })
}
