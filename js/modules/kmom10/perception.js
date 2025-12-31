/**
 * @module perception
 */

import { shufflePics } from './memory.js'
import { result } from './result.js'
let valueScore = 0
let perceptionScore = 0

/**
 * Function that adds to the results.
 */
function addToResultPerception () {
  const score = document.getElementById('score')
  score.innerHTML = valueScore
  sessionStorage.setItem('value', valueScore.toString())
  sessionStorage.setItem('perceptionScore', perceptionScore.toString())
}

const url = 'data/forms.json'
const data = await fetch(url)
const json = await data.json()

/**
 * Function that introduces the shapes test.
 */
function perceptionIntro () {
  const title = document.getElementById('title')
  const cont = document.getElementById('query')
  const nextPhase = document.getElementById('nextPhase')
  nextPhase.addEventListener('click', function (event) {
    title.innerHTML = 'Uppfattningsförmåga'
    cont.innerHTML = `<h2>Välkommen till detta deltest där din uppfattningsförmåga
          sätts på test. I testet visas ett objekt under 1 sekund. Testpersonen skall 
          välja att klicka på objektet eller ej. När objektet försvinner så är det en paus 
          på en sekund, sedan visas nästa objekt. Allt som allt visas tio objekt. Objekten 
          är samma som i föregående övningen . !</h2><br>
          <button id="nextPhase" class="queryButton">Starta</button<br>`

    const btn = document.getElementById('nextPhase')
    btn.addEventListener('click', function (event) {
      perception()
    })
  })
}

/**
 * Function that sets up the game of perception.
 */
function perception () {
  perceptionScore = 0
  addToResultPerception()
  const newModule = 'perception'
  sessionStorage.setItem('currentMod', newModule)

  const cont = document.getElementById('query')
  cont.innerHTML = ''

  const formContainer = document.createElement('div')
  formContainer.setAttribute('id', 'figure-container')
  formContainer.classList.add('gallery')
  formContainer.style.height = '100px'

  const descriptionsContainer = document.createElement('div')
  descriptionsContainer.innerHTML = `<h3>1. Har en annan färg än röd.</h3><br>
                                        <h3>2. Har en annan form än kvadrat...</h3><br>
                                        <h3>3. ...eller är röd och kvadrat.</h3><br>`

  cont.appendChild(formContainer)
  cont.appendChild(descriptionsContainer)

  const shuffledShapes = shufflePics(json)

  formContainer.innerHTML = ''

  shuffledShapes.forEach((shape, index) => {
    setTimeout(() => {
      const div = document.createElement('div')
      div.className = `shape ${shape.type}`
      div.setAttribute('value', `${shape.color} ${shape.type}`)
      if (shape.type === 'triangle') {
        div.style.borderBottom = `${shape.size * 1.1}px solid ${shape.color}`
      } else {
        div.style.backgroundColor = shape.color
      }
      formContainer.appendChild(div)

      div.addEventListener('click', function (event) {
        selectCheckPerception()
      })

      setTimeout(() => {
        formContainer.innerHTML = ''
      }, 1000)
    }, index * 2000)
  })
  gameoverQuery()
}

/**
 * Function that checks that you clicked right shape.
 */
function selectCheckPerception () {
  const selectedElement = document.querySelector('.shape')
  const selectedIndex = selectedElement.getAttribute('value')

  if (selectedIndex === 'red square') {
    valueScore++
    addToResultPerception()
    perceptionScore++
  } else if (selectedIndex.includes('red')) {
    valueScore--
    addToResultPerception()
    perceptionScore--
  } else if (selectedIndex.includes('square')) {
    valueScore--
    addToResultPerception()
    perceptionScore--
  } else {
    valueScore++
    addToResultPerception()
    perceptionScore++
  }
}

/**
 * Funciton that ends the game.
 */
function gameoverQuery () {
  const cont = document.getElementById('query')
  const title = document.getElementById('title')
  const newDiv = document.createElement('div')
  const but = document.createElement('div')

  const whatText = `Du fick ${perceptionScore} poäng.`

  const what = document.createTextNode(whatText)

  but.innerHTML = '<br><button id="nextPhase" class="queryButton"> Resultat</button><br>'
  cont.appendChild(but)

  newDiv.appendChild(what)
  title.appendChild(newDiv)
  const nextPhase = document.getElementById('nextPhase')
  nextPhase.addEventListener('click', function (event) {
    result()
  })
}

export { perceptionIntro, perception }
