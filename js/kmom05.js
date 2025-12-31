import { addToChooser, addToTablex, paintWinner, addToResult, resetStorage } from './modules/kmom05/functions.js'

const myselect = document.getElementById('myselect')
const reset = document.getElementById('reset')

addToResult()

const url = 'https://raw.githubusercontent.com/dbwebb-se/js-v2/master/example/co2-json/sweden.json'
const urlNorway = 'https://raw.githubusercontent.com/dbwebb-se/js-v2/master/example/co2-json/norway.json'
const urlDenmark = 'https://raw.githubusercontent.com/dbwebb-se/js-v2/master/example/co2-json/denmark.json'

myselect.addEventListener('change', function (event) {
  const staff = document.getElementById('mytable')
  console.log(event.target.value)
  const headerRow = `
        <tr>
            <th>Year</th>
            <th>Country</th>
            <th>CO2</th>
            <th>co2_per_capita</th>
            <th>coal_co2</th>
            <th>Population</th>
        </tr>
    `
  staff.innerHTML = headerRow

  addToTablex(countryData, 'Sweden')
  addToTablex(countryDataNorway, 'Norway')
  addToTablex(countryDataDenmark, 'Denmark')
  paintWinner()
})

const data = await fetch(url)
const json = await data.json()

const dataNorway = await fetch(urlNorway)
const jsonNorway = await dataNorway.json()

const dataDenmark = await fetch(urlDenmark)
const jsonDenmark = await dataDenmark.json()

const countryData = json.data
const countryDataNorway = jsonNorway.data
const countryDataDenmark = jsonDenmark.data
addToChooser(countryData)

reset.addEventListener('click', function (event) {
  resetStorage()
})
