/**
 * @namespace kmom10
 * @property {module:query} query - For the query test.
 * @property {module:fizzbuzz} fizzbuzz - For the fizzbuzz test.
 * @property {module:mouseevents} mouseevents - For eventlisteners.
 * @property {module:memory} memory - For memory test.
 * @property {module:forms} forms - For shapes test.
 * @property {module:perception} perception - For second shapes test.
 * @property {module:result} result - To see the result.
 */

import { selectBox } from './modules/kmom10/mouseevents.js'
import { tipspromenad, selectCheckQuery, showSubmitButton } from './modules/kmom10/query.js'
import { resetPicIndexMem } from './modules/kmom10/memory.js'
import { fizzBuzz } from './modules/kmom10/fizzbuzz.js'
import { resetFormIndex } from './modules/kmom10/forms.js'
import { perception } from './modules/kmom10/perception.js'

sessionStorage.clear()
/**
 * Function to reset scores.
 */
function resetScores () {
  sessionStorage.setItem('queryScore', '0')
  sessionStorage.setItem('fizzScore', '0')
  sessionStorage.setItem('memoryScore', 0)
  sessionStorage.setItem('formsScore', 0)
  sessionStorage.setItem('perceptionScore', 0)
  sessionStorage.setItem('value', 0)
}

const currentMod = sessionStorage.getItem('currentMod')
console.log(currentMod)
window.reset = function () {
  const currentMod = sessionStorage.getItem('currentMod')
  if (currentMod === 'fizzbuzz') {
    fizzBuzz()
    sessionStorage.setItem('fizzScore', 0)
  } else if (currentMod === 'memory') {
    sessionStorage.setItem('memoryScore', 0)
    resetPicIndexMem()
  } else if (currentMod === 'tipspromenad') {
    sessionStorage.setItem('queryScore', 0)
    window.location.reload()
  } else if (currentMod === 'forms') {
    sessionStorage.setItem('formsScore', 0)
    resetFormIndex()
  } else if (currentMod === 'perception') {
    sessionStorage.setItem('perceptionScore', 0)
    perception()
  }
  console.log(currentMod)
}

const btn = document.getElementById('queryButton')

const quest = await tipspromenad.queryQuestion(0)

const query = document.getElementById('query')

query.innerHTML += `<div class="question">${quest.explanation}<div`
console.log(quest.question)

let queryCounter = 1

btn.addEventListener('click', async function (event) {
  resetScores()
  const newModule = 'tipspromenad'
  sessionStorage.setItem('currentMod', newModule)
  const questy = await tipspromenad.queryQuestion(queryCounter)
  query.innerHTML = `<div class="question">${questy.question}<div><br>
                        <div class="queryBox" data-value="0"> ${questy.options[0]}</div><br>
                        <div class="queryBox" data-value="1"> ${questy.options[1]}</div><br>
                        <div class="queryBox" data-value="2"> ${questy.options[2]}</div><br>`
  queryCounter += 1

  const queryBoxes = document.getElementsByClassName('queryBox')
  let isBoxClicked = false

  if (queryCounter === 6) {
    showSubmitButton()
  }

  for (let i = 0; i < queryBoxes.length; i++) {
    queryBoxes[i].addEventListener('click', function (event) {
      if (isBoxClicked) {
        return
      }
      selectBox(event.target)
      selectCheckQuery(event.target, questy, questy.trivia, questy.triviaWrong)

      isBoxClicked = true
    })
  }

  btn.innerHTML = 'Svara'
})
