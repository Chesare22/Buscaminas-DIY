const createCellContent = {
  bomb(cellWidth) {
    const cellContent = document.createElement('img')
    cellContent.src = './assets/bomb.svg'
    cellContent.alt = 'B'
    cellContent.width = cellWidth * 0.8
    return cellContent
  },
  flag(cellWidth) {
    const flag = document.createElement('img')
    flag.src = './assets/flag.svg'
    flag.className = 'flag'
    flag.alt = 'F'
    flag.width = cellWidth * 0.8
    return flag
  },
  // Cells from 0 to 8
  ...Array(9).fill().map((foo, index) => cellWidth => {
    const cellContent = document.createElement('span')
    cellContent.className = `_${index}`
    cellContent.innerText = index
    cellContent.style['font-size'] = `${cellWidth * 0.8}px`
    return cellContent
  }),
}
delete createCellContent['0']

const newCell = brightness => {
  const cell = document.createElement('div')
  cell.classList.add('covered')
  cell.classList.add(brightness)
  return cell
}

const brightnessLevels = ['dark', 'light']

const clearContent = element => {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

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
        cell.appendChild(createCellContent[content](cellWidth))
      }
    },
    placeFlag({ row, column }) {
      const cell = board.children.item((row * totalColumns) + column)
      if (cell.classList.contains('uncovered')) { return }
      clearContent(cell)
      cell.appendChild(createCellContent.flag(cellWidth))
    },
    removeFlag({ row, column }) {
      const cell = board.children.item((row * totalColumns) + column)
      if (cell.classList.contains('uncovered')) { return }
      clearContent(cell)
    },
    reset({ rows = totalRows, columns = totalColumns, cellWidth: newCellWidth = cellWidth } = {}) {
      const previousAmountOfCells = totalColumns * totalRows
      const currentAmountOfCells = rows * columns
      totalRows = rows
      totalColumns = columns
      cellWidth = newCellWidth

      // Resize board
      board.style['grid-template-rows'] = `repeat(${totalRows}, ${cellWidth}px)`
      board.style['grid-template-columns'] = `repeat(${totalColumns}, ${cellWidth}px)`

      // Create or remove cells
      if (currentAmountOfCells > previousAmountOfCells) {
        for (let index = previousAmountOfCells; index < currentAmountOfCells; index++) {
          board.appendChild(document.createElement('div'))
        }
      } else if (currentAmountOfCells < previousAmountOfCells) {
        for (let index = currentAmountOfCells; index < previousAmountOfCells; index++) {
          board.removeChild(board.firstChild)
        }
      }

      // Style all cells
      for (let row = 0; row < totalRows; row++) {
        for (let column = 0; column < totalColumns; column++) {
          const brightness = brightnessLevels[(row + column) % 2]
          const cell = board.children.item((row * totalColumns) + column)
          cell.className = `covered ${brightness}`
          clearContent(cell)
        }
      }
    },
    getCoordinates(mouseEvent) {
      const box = board.getBoundingClientRect()
      const left = mouseEvent.clientX - (box.left + window.pageXOffset - window.scrollX),
        top = mouseEvent.clientY - (box.top + window.pageYOffset - window.scrollY)

      return {
        row: Math.floor(top * totalColumns / board.offsetWidth),
        column: Math.floor(left * totalRows / board.offsetHeight),
      }
    },
    addResetListener(cb) {
      document.getElementById('reset-button').addEventListener('click', cb)
    },

    // The above functions work because the overlay's z-index is 20
    showResetOverlay() {
      board.style['z-index'] = 10
    },
    hideResetOverlay() {
      board.style['z-index'] = 30
    },
  }
}