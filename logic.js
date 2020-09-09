import Game from './Game.js'
import View from './View.js'

const game = Game(21, 23, 99)
const view = View(game.board)

const handleClick = board => mouseEvent => {
  const coordinates = view.getCoordinates(mouseEvent, board)
  if (mouseEvent.button === 0) {
    // uncover button
    game.pressUncoverButton(coordinates)
      .forEach(view.uncoverCell)
  } else if (mouseEvent.button === 2) {
    // flag button
    const showFlag = game.pressFlagButton(coordinates)
    if (showFlag) {
      view.addFlag(coordinates)
    } else {
      view.deleteFlag(coordinates)
    }
  }
}

window.onload = function() {
  const board = document.getElementById('board')

  view.appendCellsTo(board)
  board.addEventListener('contextmenu', e => { e.preventDefault(); return false })
  board.addEventListener('mouseup', handleClick(board))
}
