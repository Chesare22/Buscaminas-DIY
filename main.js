/* global drawBoard, createNewGame, configHelper */

window.onload = function() {
  const board = document.getElementById('board')
  const remainingFlags = document.getElementById('flags')
  const difficultyDropdown = document.getElementById('difficulty-dropdown')

  let config = configHelper.initialConfig

  remainingFlags.innerText = config.mines
  let minesweeper
  const boardUI = drawBoard({
    rows: config.rows,
    columns: config.columns,
    cellWidth: config.cellWidth,
    element: board,
  })

  function resetGame() {
    boardUI.reset({
      rows: config.rows,
      columns: config.columns,
      cellWidth: config.cellWidth,
    })
    minesweeper = null
    remainingFlags.innerText = config.mines
  }


  const difficultySelector = configHelper.createDifficultySelector({
    element: difficultyDropdown,
  })
  difficultySelector.addListener(newConfig => {
    config = newConfig
    resetGame()
  })

  board.addEventListener('contextmenu', e => { e.preventDefault(); return false })
  board.addEventListener('mouseup', mouseEvent => {
    const coordinates = boardUI.getCoordinates(mouseEvent)

    if (!minesweeper) {
      minesweeper = createNewGame({
        rows: config.rows,
        columns: config.columns,
        mines: config.mines,
        emptyCell: coordinates,
      })
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
      remainingFlags.innerText = changes.flagsLeft
    }
  })
}