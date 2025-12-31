import { selectBox } from './mouseevents.js'
import { memoryIntro } from './memory.js'

let valueScore = 0

let fizzScore = 0

/**
 * Function to add to scores.
 */
function addToResultFizz () {
  const score = document.getElementById('score')
  score.innerHTML = valueScore
  sessionStorage.setItem('value', valueScore.toString())
  sessionStorage.setItem('fizzScore', fizzScore.toString())
}

/**
 * Checks if right option was clicked.
 * @param {HTMLElement} selectedElement The element that was clicked.
 * @param {string} last The value of the right option.
 */
function fizzCheck (selectedElement, last) {
  const queryContainer = document.getElementById('query')
  const selectedIndex = selectedElement.getAttribute('data-value')

  if (selectedIndex.toString() === last.toString()) {
    selectedElement.classList.add('rightAnswer')
    valueScore += 3
    fizzScore += 3
    addToResultFizz()
    const success = document.createElement('h2')
    success.textContent = `Helt rätt, svaret är ${last}.`
    queryContainer.appendChild(success)
  } else {
    selectedElement.classList.add('wrongAnswer')
    const wrong = document.createElement('h2')
    wrong.textContent = `FEL, svaret är ${last}.`
    queryContainer.appendChild(wrong)
  }
  const newButton = document.createElement('button')
  newButton.textContent = 'Nästa del'
  newButton.classList.add('queryButton')
  newButton.setAttribute('id', 'nextPhase')
  queryContainer.appendChild(newButton)
  memoryIntro()
}

/**
 * Gives the box an eventListener.
 * @param {string} last The value of the right option.
 */
function giveBoxEvent (last) {
  const queryBoxes = document.getElementsByClassName('queryBox')
  let isBoxClicked = false
  for (let i = 0; i < queryBoxes.length; i++) {
    queryBoxes[i].addEventListener('click', function (event) {
      if (isBoxClicked) {
        return
      }
      isBoxClicked = true
      selectBox(event.target)
      fizzCheck(event.target, last)
    })
  }
}

/**
 * Function that builds up the game FizzBuzz.
 */
function fizzBuzz () {
  fizzScore = 0
  addToResultFizz()
  const newModule = 'fizzbuzz'
  sessionStorage.setItem('currentMod', newModule)
  const numbers = []
  const randomNum = Math.floor(Math.random() * 100) + 1
  const lastNum = randomNum + 8
  for (let i = randomNum; i <= lastNum; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      numbers.push('FizzBuzz')
    } else if (i % 3 === 0) {
      numbers.push('Fizz')
    } else if (i % 5 === 0) {
      numbers.push('Buzz')
    } else {
      numbers.push(i)
    }
  }
  const query = document.getElementById('query')
  const title = document.getElementById('title')

  const serie = numbers.slice(0, -1).join(', ')

  query.innerHTML = `<h2>${serie}, ...</h2><br>
                    <div class="queryBox" data-value="FizzBuzz"> FizzBuzz</div><br>
                    <div class="queryBox" data-value="Fizz"> Fizz</div><br>
                    <div class="queryBox" data-value="Buzz"> Buzz</div><br>
                    <div class="queryBox" data-value="${lastNum}"> ${lastNum}</div><br>
    `

  const answer = numbers[numbers.length - 1]
  title.innerHTML = 'FizzBuzz'
  console.log(answer)
  giveBoxEvent(answer)
}

export { fizzBuzz }
