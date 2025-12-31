/**
 * @module forms
 */

import { shufflePics } from './memory.js'
import { perceptionIntro } from './perception.js'

let valueScore = 0

let formsScore = 0
let gameoverTimer

/**
 * Function that adds to the scores.
 */
function addToResultForms () {
  const score = document.getElementById('score')
  score.innerHTML = valueScore
  sessionStorage.setItem('value', valueScore.toString())
  sessionStorage.setItem('formsScore', formsScore.toString())
}

const url = 'data/forms.json'
const data = await fetch(url)
const json = await data.json()

/**
 * Function that resets form indexes.
 */
function resetFormIndex () {
  const title = document.getElementById('title')
  rightCounter = 1
  formIndex = 1
  title.innerHTML = 'Visuell förmåga och läsförståelse'
  forms()
  gameoverTimer = setTimeout(gameoverForms, 15000)
}

/**
 * Function that introduces the shapes test.
 */
function formsIntro () {
  const title = document.getElementById('title')
  const cont = document.getElementById('query')
  const nextPhase = document.getElementById('nextPhase')

  nextPhase.addEventListener('click', function (event) {
    title.innerHTML = 'Visuell förmåga och läsförståelse'
    cont.innerHTML = `<h2>Välkommen till detta deltest där din visuella förmåga och läsförståelse
        sätts på test. Para ihop texten med den form som beskrivs!</h2><br>
        <button id="nextPhase" class="queryButton">Starta</button<br>`

    const btn = document.getElementById('nextPhase')
    btn.addEventListener('click', function (event) {
      forms()
      setTimeout(gameoverForms, 15000)
    })
  })
}

/**
 * Function that sets up the game of shapes.
 */
function forms () {
  formsScore = 0
  addToResultForms()
  const newModule = 'forms'
  sessionStorage.setItem('currentMod', newModule)

  const cont = document.getElementById('query')
  cont.innerHTML = ''

  const formContainer = document.createElement('div')
  formContainer.setAttribute('id', 'gallery')
  formContainer.classList.add('gallery')

  const shapeArray = []

  const shuffledShapes = shufflePics(json)
  const shuffleAgain = shufflePics(json)

  shuffledShapes.forEach(shape => {
    shapeArray.push(`${shape.color} ${shape.type}`)
    const div = document.createElement('div')
    div.className = `shape ${shape.type}`
    div.setAttribute('value', (shape.color + shape.type))
    if (shape.type === 'triangle') {
      div.style.borderBottom = `${shape.size * 1.1}px solid ${shape.color}`
    } else {
      div.style.backgroundColor = shape.color
    }
    formContainer.appendChild(div)
  })

  cont.appendChild(formContainer)

  let counter = 1

  shuffleAgain.forEach(function (shape) {
    const what = document.createTextNode(counter + ' : ' + shape.color + ' ' + shape.type)
    const newDiv = document.createElement('div')
    newDiv.setAttribute('value', (shape.color + shape.type))
    newDiv.id = counter
    newDiv.style.fontSize = '20px'
    newDiv.appendChild(what)
    cont.appendChild(newDiv)

    counter += 1
  })
  pickRightShape()
}

let formIndex = 1
let rightCounter = 1
/**
 * Function that adds eventListner to the shapes.
 */
function pickRightShape () {
  const shapes = document.getElementsByClassName('shape')

  for (let i = 0; i < shapes.length; i++) {
    shapes[i].addEventListener('click', selectCheck)
  }
}

/**
 * Function that checks if you clicked the right shape.
 * @param {Event} event The object that got clicked.
 */
function selectCheck (event) {
  const selectedElement = event.target
  const whatPic = document.getElementById(formIndex.toString())
  const selectedIndex = selectedElement.getAttribute('value')

  if (selectedIndex === whatPic.getAttribute('value')) {
    rightCounter += 1
    formIndex += 1
    selectedElement.style.filter = 'brightness(0)'
    whatPic.style.backgroundColor = 'green'
    selectedElement.removeEventListener('click', selectCheck)
    valueScore++
    formsScore++
    addToResultForms()
    if (formIndex === 11) {
      gameoverForms()
    }
  } else {
    formIndex += 1
    selectedElement.style.filter = 'brightness(1)'
    whatPic.style.backgroundColor = 'red'
    if (formIndex === 11) {
      gameoverForms()
    }
  }
}

/**
 * Function to end the game.
 */
function gameoverForms () {
  const cont = document.getElementById('query')
  const title = document.getElementById('title')
  const newDiv = document.createElement('div')
  const but = document.createElement('div')

  let whatText
  if (rightCounter === 10) {
    whatText = 'Bra jobbat, du lyckades få alla rätt!'
  } else if (rightCounter === 1) {
    whatText = 'Du fick inte ett enda rätt... dåligt.'
  } else {
    whatText = `Du lyckades få ${rightCounter - 1} rätt.`
  }

  const what = document.createTextNode(whatText)

  but.innerHTML = '<br><button id="nextPhase" class="queryButton"> Nästa del</button><br>'
  cont.appendChild(but)

  newDiv.appendChild(what)
  title.appendChild(newDiv)
  removeEventListenersx()
  clearTimeout(gameoverTimer)
  perceptionIntro()
}

/**
 * Funciton that removes eventlisteners.
 */
function removeEventListenersx () {
  const shapes = document.getElementsByClassName('shape')

  for (let i = 0; i < shapes.length; i++) {
    shapes[i].removeEventListener('click', selectCheck)
  }
}

export { formsIntro, forms, resetFormIndex }
