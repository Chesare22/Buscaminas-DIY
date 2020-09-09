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
  const button = document.createElement('div')
  button.className = 'covered no-browser-styling'
  return button
}

function View(boardNumbers) {
  const amountOfRows = boardNumbers.length
  const amountOfColumns = boardNumbers[0].length

  const cells = mapMatrix(boardNumbers, createCell)
  const flags = createMatrix(amountOfRows, amountOfColumns, null)

  return {
    cells,
    uncoverCell([ row, column ]) {
      const button = cells[row][column]
      button.className = 'uncovered no-browser-styling'
      if (!button.firstChild) {
        const number = boardNumbers[row][column]
        const cellContent = createCellContent[number]()
        button.appendChild(cellContent)
      }
    },
    addFlag([ row, column ]) {
      const flagImg = flags[row][column] || createCellContent.flag()
      flags[row][column] = flagImg
      cells[row][column].appendChild(flagImg)
    },
    deleteFlag([ row, column ]) {
      const flagImg = flags[row][column]
      if (flagImg) {
        cells[row][column].removeChild(flagImg)
      }
    },
    appendCellsTo(boardDOM) {
      cells.forEach(row => {
        row.forEach(cell => {
          boardDOM.appendChild(cell)
        })
      })
    },
    getCoordinates(mouseEvent, boardDOM) {
      const box = boardDOM.getBoundingClientRect()
      const left = mouseEvent.clientX - (box.left + window.pageXOffset),
        top = mouseEvent.clientY - (box.top + window.pageYOffset)

      return [
        Math.floor(top * amountOfColumns / boardDOM.offsetWidth),
        Math.floor(left * amountOfRows / boardDOM.offsetHeight),
      ]
    },
  }
}

export default View