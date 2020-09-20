/* global drawBoard, createNewGame */

const rows = 11
const columns = 9
const cellWidth = 30
const mines = 10

window.onload = function() {
  const board = document.getElementById('board')

  const boardUI = drawBoard({
    rows,
    columns,
    cellWidth,
    element: board,
  })
  const minesweeper = createNewGame({ rows, columns, mines })
  minesweeper.printState()

  board.addEventListener('contextmenu', e => { e.preventDefault(); return false })
  board.addEventListener('mouseup', mouseEvent => {
    const coordinates = boardUI.getCoordinates(mouseEvent)

    if (mouseEvent.button === 0) {
      // uncover button
      minesweeper
        .uncover(coordinates)
        .forEach(boardUI.uncoverCell)
    } else if (mouseEvent.button === 2) {
      // flag button
      const { hasFlag } = minesweeper.flag(coordinates)
      if (hasFlag) {
        boardUI.placeFlag(coordinates)
      } else {
        boardUI.removeFlag(coordinates)
      }
    }

    minesweeper.printState()
  })
}