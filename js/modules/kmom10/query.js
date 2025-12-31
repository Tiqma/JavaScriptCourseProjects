/**
 * @module query
 */

import { fizzBuzz } from './fizzbuzz.js'

let valueScore = 0

let queryScore = 0

/**
 * Function that adds to the scores.
 */
function addToResultQuery () {
  const score = document.getElementById('score')
  score.innerHTML = valueScore
  sessionStorage.setItem('value', valueScore.toString())
  sessionStorage.setItem('queryScore', queryScore.toString())
}

const tipspromenad = {
  querylist: async function () {
    const url = 'data/query.json'
    const data = await fetch(url)
    const json = await data.json()
    return json
  },
  queryQuestion: async function (index) {
    const queries = await this.querylist()
    const query = queries[index]
    return query
  }
}

/**
 * Function that checks if you selected right option and gives some trivia.
 * @param {HTMLElement} selectedElement - The selected option element.
 * @param {object} questy - The question object containing the correct answer.
 * @param {string} trivia - Text to display for a correct answer.
 * @param {string} wrong - Text to display for an incorrect answer.
 */
function selectCheckQuery (selectedElement, questy, trivia, wrong) {
  const cont = document.getElementById('query')
  const selectedIndex = selectedElement.getAttribute('data-value')

  if (selectedIndex === questy.rightanswer.toString()) {
    selectedElement.classList.add('rightAnswer')
    const h1Element = document.createElement('h1')
    h1Element.textContent = `${trivia}`
    cont.appendChild(h1Element)
    valueScore += 3
    queryScore += 3
    addToResultQuery()
  } else {
    selectedElement.classList.add('wrongAnswer')
    const h1Element = document.createElement('h1')
    h1Element.textContent = `${wrong}`
    cont.appendChild(h1Element)
  }
}

/**
 * Function that ends the section.
 */
function showSubmitButton () {
  const newButton = document.createElement('button')
  newButton.id = 'resButton'
  newButton.textContent = 'Lämna in'
  newButton.classList.add('queryButton')

  const queryContainer = document.getElementById('query')
  queryContainer.appendChild(newButton)

  const oldButton = document.getElementById('queryButton')
  oldButton.remove()

  const resultBtn = document.getElementById('resButton')
  resultBtn.addEventListener('click', fizzBuzzStart)
}

/**
 * Function that setsup the next phase.
 * @param {HTMLElement} event The button that was pressed.
 */
function fizzBuzzStart (event) {
  const query = document.getElementById('query')
  query.innerHTML = `<h1> Bra jobbat!</h1>
                     <br><button id="nextPhase" class="queryButton"> Nästa del</button>`

  const nextPhase = document.getElementById('nextPhase')
  nextPhase.addEventListener('click', function (event) {
    query.innerHTML = 'Välkommen till FizzBuzz'
    console.log(queryScore)
    fizzBuzz()
  })
}

export { tipspromenad, selectCheckQuery, showSubmitButton }
