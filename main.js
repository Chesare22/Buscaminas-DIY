/* global drawBoard, createNewGame */
const defaultSelectedDifficulty = 1
const difficulties = [
  {
    label: 'Fácil',
    config: {
      rows: 8,
      columns: 10,
      mines: 10,
      cellWidth: 40,
    },
  },
  {
    label: 'Media',
    config: {
      rows: 14,
      columns: 18,
      mines: 40,
      cellWidth: 30,
    },
  },
  {
    label: 'Difícil',
    config: {
      rows: 20,
      columns: 24,
      mines: 99,
      cellWidth: 25,
    },
  },
]

let difficultyConfig = difficulties[defaultSelectedDifficulty].config

window.onload = function() {
  const board = document.getElementById('board')

  const boardUI = drawBoard({
    rows: difficultyConfig.rows,
    columns: difficultyConfig.columns,
    cellWidth: difficultyConfig.cellWidth,
    element: board,
  })
  let minesweeper


  const difficultySelector = document.getElementById('difficulty-selector')

  difficulties.forEach((difficulty, index) => {
    const option = document.createElement('option')
    option.text = difficulty.label
    option.value = index
    if (index === defaultSelectedDifficulty) {
      option.selected = true
    }
    difficultySelector.appendChild(option)
  })

  difficultySelector.addEventListener('change', () => {
    difficultyConfig = difficulties[difficultySelector.value].config
    boardUI.reset({
      rows: difficultyConfig.rows,
      columns: difficultyConfig.columns,
      cellWidth: difficultyConfig.cellWidth,
    })
    minesweeper = null
  })


  board.addEventListener('contextmenu', e => { e.preventDefault(); return false })
  board.addEventListener('mouseup', mouseEvent => {
    const coordinates = boardUI.getCoordinates(mouseEvent)

    if (!minesweeper) {
      minesweeper = createNewGame({
        rows: difficultyConfig.rows,
        columns: difficultyConfig.columns,
        mines: difficultyConfig.mines,
        emptyCell: coordinates,
      })
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