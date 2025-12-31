const scoreSweden = document.getElementById('scoreSweden')
const scoreNorway = document.getElementById('scoreNorway')
const scoreDenmark = document.getElementById('scoreDenmark')

const storage = window.sessionStorage
let valueSweden = storage.getItem('valueS') || 0
let valueDenmark = storage.getItem('valueD') || 0
let valueNorway = storage.getItem('valueN') || 0

/**
 * Function that adds all the years from the array.
 * @param {Array} data What years gonna be used.
 */
function addToChooser (data) {
  const years = document.getElementById('myselect')

  for (const row of data) {
    years.innerHTML += `
            <option value="${row.year}">${row.year}</option>
        `
  }
}

/**
 * Function that adds to the table specific datas.
 * @param {Array} data Data from different years.
 * @param {string} country What country the data is from.
 */
function addToTablex (data, country) {
  const difData = document.getElementById('mytable')
  const selectedYear = document.getElementById('myselect').value

  for (const row of data) {
    if (String(row.year) === `${selectedYear}`) {
      difData.innerHTML += `
            <tr id="${country}">
                <td>${row.year}</td>
                <td>${country}</td>
                <td id="co2">${row.co2}</td>
                <td id="co2_per_capita">${row.co2_per_capita}</td>
                <td id="coal_co2">${row.coal_co2}</td>
                <td>${row.population}</td>
            </tr>
            `
    }
  }
}

/**
 * Function to set storage values.
 */
function addToResult () {
  scoreSweden.innerHTML = valueSweden
  storage.setItem('valueS', valueSweden)

  scoreDenmark.innerHTML = valueDenmark
  storage.setItem('valueD', valueDenmark)

  scoreNorway.innerHTML = valueNorway
  storage.setItem('valueN', valueNorway)
}

/**
 * Function that keeps score of winning countries.
 * @param {string} winner Who won the data contest.
 */
function scoreboard (winner) {
  if (winner === 'Sweden') {
    valueSweden++
    addToResult()
  } else if (winner === 'Norway') {
    valueNorway++
    addToResult()
  } else {
    valueDenmark++
    addToResult()
  }
}

/**
 * Function that paints the winner of data green, and calls another function to keep score.
 */
function paintWinner () {
  const countryIds = ['Sweden', 'Denmark', 'Norway']
  const dataIds = ['co2', 'co2_per_capita', 'coal_co2']

  const minValues = {}

  dataIds.forEach(dataId => {
    minValues[dataId] = { value: Infinity, country: '' }
  })

  countryIds.forEach(countryId => {
    dataIds.forEach(dataId => {
      const data = document.getElementById(countryId).querySelector(`#${dataId}`)
      const dataValue = parseFloat(data.textContent.trim())
      if (dataValue < minValues[dataId].value) {
        minValues[dataId] = { value: dataValue, country: countryId }
      }
    })
  })

  dataIds.forEach(dataId => {
    const winner = document.getElementById(minValues[dataId].country).querySelector(`#${dataId}`)
    winner.classList.add('winner')

    scoreboard(minValues[dataId].country)
  })
}

/**
 * Function that resets the session storage and reloads the site.
 */
function resetStorage () {
  sessionStorage.clear()
  location.reload()
}

export { addToChooser, addToTablex, paintWinner, addToResult, resetStorage }
