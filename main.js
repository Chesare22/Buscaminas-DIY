/* global drawBoard, createNewGame */
const difficulty = {
  easy: {
    rows: 8,
    columns: 10,
    mines: 10,
    cellWidth: 40,
  },
  medium: {
    rows: 14,
    columns: 18,
    mines: 40,
    cellWidth: 30,
  },
  hard: {
    rows: 20,
    columns: 24,
    mines: 99,
    cellWidth: 25,
  },
}

const { rows, columns, cellWidth, mines } = difficulty.easy

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