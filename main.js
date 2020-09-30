/* global drawBoard, createNewGame */

const rows = 11
const columns = 9
const cellWidth = 30
const mines = 10

window.onload = function() {
  const board = document.getElementById('board')

  const boardUI = drawBoard({ rows, columns, cellWidth, element: board })
  let minesweeper

  board.addEventListener('contextmenu', e => { e.preventDefault(); return false })
  board.addEventListener('mouseup', mouseEvent => {
    const coordinates = boardUI.getCoordinates(mouseEvent)

    if (!minesweeper) {
      minesweeper = createNewGame({ rows, columns, mines, emptyCell: coordinates })
      minesweeper.printState()
    }

    // uncover button was pressed
    if (mouseEvent.button === 0) {
      minesweeper
        .uncover(coordinates)
        .forEach(boardUI.uncoverCell)

    // flag button was pressed
    } else if (mouseEvent.button === 2) {
      const changes = minesweeper.flag(coordinates)
      if (!changes) { return }
      if (changes.hasFlag) {
        boardUI.placeFlag(coordinates)
      } else {
        boardUI.removeFlag(coordinates)
      }
    }

    minesweeper.printState()
  })
}