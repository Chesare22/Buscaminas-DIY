const initialConfigIndex = 1
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
Object.freeze(difficulties)


function createDifficultySelector({ element }) {
  difficulties.forEach((difficulty, index) => {
    const option = document.createElement('option')
    option.text = difficulty.label
    option.value = index
    if (index === initialConfigIndex) {
      option.selected = true
    }
    element.appendChild(option)
  })

  const listeners = []
  function addListener(listener) {
    listeners.push(listener)
  }
  element.addEventListener('change', () => {
    listeners.forEach(listener => {
      listener(difficulties[element.value].config)
    })
  })

  return { addListener }
}

/* exported configHelper */
const configHelper = {
  initialConfig: difficulties[initialConfigIndex].config,
  createDifficultySelector,
}
