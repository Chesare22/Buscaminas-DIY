import { mapMatrix, createMatrix } from './UsefulFunctions.js'

const createCellContent = {
  '-1'() {
    const cellContent = document.createElement('img')
    cellContent.src = './assets/bomb.svg'
    cellContent.alt = 'B'
    cellContent.width = 20
    return cellContent
  },
  // Cells from 0 to 8
  ...Array(9).fill().map((foo, index) => () => {
    const cellContent = document.createElement('span')
    if (index > 0) {
      cellContent.className = `_${index}`
      cellContent.innerText = index
    }
    return cellContent
  }),
  flag() {
    const flag = document.createElement('img')
    flag.src = './assets/flag.svg'
    flag.className = 'flag'
    flag.width = 20
    return flag
  },
}


const createCell = () => {
  const button = document.createElement('button')
  button.className = 'covered no-browser-styling'
  return button
}

function View(board) {
  const cells = mapMatrix(board, createCell)
  const flags = createMatrix(board.length, board[0].length, null)

  return {
    cells,
    uncoverCell([ x, y ]) {
      const button = cells[x][y]
      button.className = 'uncovered no-browser-styling'
      if (!button.firstChild) {
        const number = board[x][y]
        const cellContent = createCellContent[number]()
        button.appendChild(cellContent)
      }
    },
    addFlag(x, y) {
      const flagImg = flags[x][y] || createCellContent.flag()
      flags[x][y] = flagImg
      cells[x][y].appendChild(flagImg)
    },
    deleteFlag(x, y) {
      const flagImg = flags[x][y]
      if (flagImg) {
        cells[x][y].removeChild(flagImg)
      }
    },
  }
}

export default View