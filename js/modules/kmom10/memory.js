/**
 * @module memory
 */

import { formsIntro } from './forms.js'

let valueScore = 0

let memoryScore = 0

/**
 * Function that adds to the scores.
 */
function addToResultMemory () {
  const score = document.getElementById('score')
  score.innerHTML = valueScore
  sessionStorage.setItem('value', valueScore.toString())
  sessionStorage.setItem('memoryScore', memoryScore.toString())
}

/**
 * Function that resets the picIndex.
 */
function resetPicIndexMem () {
  picIndex = 1
  memory()
}

/**
 * Shuffle the arrays.
 * @param {Array} shuffledPictures List that names the different pictures.
 * @returns {Array} A new shuffled array.
 */
function shufflePics (shuffledPictures) {
  const pictures = shuffledPictures.slice(0)
  for (let i = pictures.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = pictures[i]
    pictures[i] = pictures[j]
    pictures[j] = temp
  }
  return pictures
}

/**
 * Function that builds up the game "memory".
 */
function memory () {
  memoryScore = 0
  addToResultMemory()
  const newModule = 'memory'
  sessionStorage.setItem('currentMod', newModule)
  const cont = document.getElementById('query')
  cont.innerHTML = ''
  const mem = document.createElement('div')
  mem.setAttribute('id', 'gallery')
  mem.classList.add('gallery')
  const pictures = ['einstein', 'anime', 'banan', 'blomma', 'fågelholk', 'fisk', 'golfboll', 'lykta', 'uggla']
  const shufflePictures = shufflePics(pictures.slice(0))
  const shuffleAgain = shufflePics(pictures.slice(0))

  shufflePictures.forEach(function (name) {
    const src = 'img/' + name + '.jpg'

    const img = document.createElement('img')
    img.src = src
    img.id = name
    img.setAttribute('value', name)
    img.className = 'image'

    img.style.backgroundColor = 'white'
    img.style.height = '200px'
    img.style.width = '200px'
    img.style.objectFit = 'cover'
    mem.appendChild(img)

    setTimeout(function () {
      img.style.filter = 'brightness(0)'
      img.classList.add('hoverPic')
    }, 5000)

    img.addEventListener('click', function (event) {
      event.target.classList.add('selected')
    })
  })
  cont.appendChild(mem)
  let counter = 1

  setTimeout(function () {
    shuffleAgain.forEach(function (pic) {
      const what = document.createTextNode(counter + ' : ' + pic)
      const newDiv = document.createElement('div')
      newDiv.setAttribute('value', pic)
      newDiv.id = counter
      newDiv.style.fontSize = '20px'
      newDiv.appendChild(what)
      cont.appendChild(newDiv)

      counter += 1
    })
  }, 5000)
  pickRight()
}

let picIndex = 1

/**
 * Function that adds eventListner to the pictures.
 */
function pickRight () {
  const pictures = document.getElementsByClassName('image')

  for (let i = 0; i < pictures.length; i++) {
    pictures[i].addEventListener('click', selectCheckMemory)
  }
}

/**
 * Function that checks if you clicked the right picture.
 * @param {Event} event The object that got clicked.
 */
function selectCheckMemory (event) {
  const selectedElement = event.target
  const whatPic = document.getElementById(picIndex.toString())
  const selectedIndex = selectedElement.getAttribute('value')

  if (selectedIndex === whatPic.getAttribute('value')) {
    selectedElement.classList.add('rightAnswerMem')
    picIndex += 1

    selectedElement.style.filter = 'brightness(1)'
    whatPic.style.backgroundColor = 'green'
    selectedElement.removeEventListener('click', selectCheckMemory)
    valueScore++
    memoryScore++
    addToResultMemory()
    if (picIndex === 10) {
      gameoverMemory()
    }
  } else {
    selectedElement.classList.add('wrongAnswerMem')
    selectedElement.style.filter = 'brightness(1)'
    whatPic.style.backgroundColor = 'red'
    gameoverMemory()
  }
}

/**
 * Function that removes all eventlisteners from the pictures.
 */
function removeEventListeners () {
  const pictures = document.getElementsByClassName('image')

  for (let i = 0; i < pictures.length; i++) {
    pictures[i].removeEventListener('click', selectCheckMemory)
  }
}

/**
 * Function that ends the game.
 */
function gameoverMemory () {
  const cont = document.getElementById('query')
  const title = document.getElementById('title')
  const newDiv = document.createElement('div')
  const but = document.createElement('div')

  let whatText
  if (picIndex === 10) {
    whatText = 'Bra jobbat, du lyckades få alla rätt!'
  } else if (picIndex === 1) {
    whatText = 'Du fick inte ett enda rätt... dåligt.'
  } else {
    whatText = `Du lyckades få ${picIndex - 1} rätt.`
  }

  const what = document.createTextNode(whatText)

  but.innerHTML = '<br><button id="nextPhase" class="queryButton"> Nästa del</button><br>'
  cont.appendChild(but)

  newDiv.appendChild(what)
  title.appendChild(newDiv)
  removeEventListeners()
  formsIntro()
}

/**
 * Function that gives an intro to the game "memory".
 */
function memoryIntro () {
  const title = document.getElementById('title')
  const cont = document.getElementById('query')
  const nextPhase = document.getElementById('nextPhase')

  nextPhase.addEventListener('click', function (event) {
    title.innerHTML = 'Minnesspelet'
    cont.innerHTML = `<h2>Välkommen till minnesspelet! Du kommer få se 9 bilder i 5 sekunder.
        Efter det kommer du få en lista som beskriver dessa bilder. Du ska nu klicka var denna bild låg
        efter ordningen på listan. Lycka till!</h2><br>
        <button id="nextPhase" class="queryButton">Starta</button<br>`

    const btn = document.getElementById('nextPhase')
    btn.addEventListener('click', function (event) {
      memory()
    })
  })
}

export { memory, memoryIntro, shufflePics, resetPicIndexMem }
