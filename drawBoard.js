const createCellContent = {
  bomb() {
    const cellContent = document.createElement('img')
    cellContent.src = './assets/bomb.svg'
    cellContent.alt = 'B'
    cellContent.width = 20
    return cellContent
  },
  // Cells from 1 to 8
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
    flag.alt = 'F'
    flag.width = 20
    return flag
  },
}


const newCell = brightness => {
  const cell = document.createElement('div')
  cell.classList.add('covered')
  cell.classList.add(brightness)
  return cell
}

const brightnessLevels = ['dark', 'light']


/* exported drawBoard */
const drawBoard = ({
  element: board,
  rows: totalRows,
  columns: totalColumns,
  cellWidth,
}) => {
  board.style['grid-template-rows'] = `repeat(${totalRows}, ${cellWidth}px)`
  board.style['grid-template-columns'] = `repeat(${totalColumns}, ${cellWidth}px)`
  for (let row = 0; row < totalRows; row++) {
    for (let column = 0; column < totalColumns; column++) {
      const brightness = brightnessLevels[(row + column) % 2]
      board.appendChild(newCell(brightness))
    }
  }

  return {
    uncoverCell({ row, column, content }) {
      const cell = board.children.item((row * totalColumns) + column)
      cell.classList.replace('covered', 'uncovered')
      if (createCellContent[content]) {
        cell.appendChild(createCellContent[content]())
      }
    },
    placeFlag({ row, column }) {
      const cell = board.children.item((row * totalColumns) + column)
      if (cell.classList.contains('uncovered')) { return }
      while (cell.firstChild) {
        cell.removeChild(cell.firstChild)
      }
      cell.appendChild(createCellContent.flag())
    },
    removeFlag({ row, column }) {
      const cell = board.children.item((row * totalColumns) + column)
      if (cell.classList.contains('uncovered')) { return }
      while (cell.firstChild) {
        cell.removeChild(cell.firstChild)
      }
    },
    reset({ rows, columns, cellWidth: newCellWidth }) {
      if (rows > 0) {
        totalRows = rows
      }
      if (columns > 0) {
        totalColumns = columns
      }
      if (newCellWidth > 0) {
        cellWidth = newCellWidth
      }
    },
  }
}