import { mapMatrix } from './UsefulFunctions.js'

const possibleCells = {
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
}


const createCells = game => mapMatrix(game.board, () => {
  const button = document.createElement('button')
  button.className = 'covered no-browser-styling'

  return button
})

export {
  createCells,
  possibleCells,
}