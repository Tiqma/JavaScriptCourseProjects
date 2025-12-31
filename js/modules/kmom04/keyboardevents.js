import { doubleclick, select } from './mouseevents.js'

/**
 * Moving around figures.
 * @param {number} x For horizontal placment.
 * @param {number} y For vertical movement.
 */
function move (x, y) {
  const all = document.getElementsByClassName('selected')

  for (const box of all) {
    const oldTop = parseInt(box.style.top)
    const oldLeft = parseInt(box.style.left)

    if (oldTop - 15 + y >= -1 && (oldTop + 30 + box.clientHeight) + y <= window.innerHeight && oldLeft + x > -1 && (oldLeft + 45 + box.clientWidth) + y <= window.innerWidth) {
      box.style.top = `${oldTop + y}px`
      box.style.left = `${oldLeft + x}px`
    }
  }
}

/**
 * Making selected boxes into circles.
 */
function circle () {
  const all = document.querySelectorAll('.selected')
  all.forEach(element => {
    if (element.classList.contains('circle')) {
      element.classList.remove('circle')
    } else {
      element.classList.add('circle')
    }
  })
}

/**
 * Making figures smaller.
 */
function smaller () {
  const all = document.querySelectorAll('.selected')
  all.forEach(element => {
    const currentWidth = element.offsetWidth
    const currentHeight = element.offsetHeight

    const newWidth = currentWidth - 10
    const newHeight = currentHeight - 10

    element.style.width = newWidth + 'px'
    element.style.height = newHeight + 'px'

    const oldTop = parseInt(element.style.top)
    const oldLeft = parseInt(element.style.left)

    element.style.top = `${oldTop + 5}px`
    element.style.left = `${oldLeft + 5}px`
  })
}

/**
 * Making figures bigger.
 */
function bigger () {
  const all = document.querySelectorAll('.selected')
  all.forEach(element => {
    const currentWidth = element.offsetWidth
    const currentHeight = element.offsetHeight

    const newWidth = currentWidth + 10
    const newHeight = currentHeight + 10

    element.style.width = newWidth + 'px'
    element.style.height = newHeight + 'px'

    const oldTop = parseInt(element.style.top)
    const oldLeft = parseInt(element.style.left)

    element.style.top = `${oldTop - 5}px`
    element.style.left = `${oldLeft - 5}px`
  })
}

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
let counter = 1
/**
 * Change figures background color.
 */
function changeColor () {
  const all = document.querySelectorAll('.selected')
  all.forEach(element => {
    element.style.backgroundColor = colors[counter]
  })

  counter += 1
  if (counter > 6) {
    counter = 0
  }
}

let cloneCounter = 0

/**
 * Making an copy of every selected figure.
 */
function copy () {
  const main = document.getElementById('main')

  const all = document.querySelectorAll('.selected')

  all.forEach(element => {
    const clone = element.cloneNode(false)

    cloneCounter += 1
    clone.id = `cloned${cloneCounter}`

    clone.style.position = 'absolute'
    const randomTop = Math.random() * (window.innerHeight - element.clientHeight)
    const randomLeft = Math.random() * (window.innerWidth - element.clientWidth)

    clone.style.top = randomTop + 'px'
    clone.style.left = randomLeft + 'px'

    clone.addEventListener('click', function (event) {
      select(event.target)
    })
    clone.addEventListener('dblclick', function (event) {
      doubleclick(event.target)
    })

    main.appendChild(clone)
  })
}

/**
 * Deselects all selected figures.
 */
function deselect () {
  const all = document.querySelectorAll('.selected')
  all.forEach(element => {
    element.classList.toggle('selected')
  })
}

/**
 * Removes all selected figures.
 */
function removeSelected () {
  const all = document.querySelectorAll('.selected')
  all.forEach(element => {
    element.remove()
  })
}

/**
 * Selects all figures.
 */
function selectAll () {
  const all = document.querySelectorAll('.box')
  all.forEach(element => {
    element.classList.add('selected')
  })
}

/**
 * Makes an random figure.
 */
function randomBox () {
  const main = document.getElementById('main')
  const orig = document.getElementById('box1')

  const clone = orig.cloneNode('true')
  const randomInd = Math.floor(Math.random() * colors.length)
  clone.style.backgroundColor = colors[randomInd]

  const coin = Math.random()
  if (coin < 0.5) {
    clone.classList.add('circle')
  }

  clone.style.position = 'absolute'
  const randomTop = Math.random() * (window.innerHeight - clone.clientHeight)
  const randomLeft = Math.random() * (window.innerWidth - clone.clientWidth)

  clone.style.top = randomTop + 'px'
  clone.style.left = randomLeft + 'px'
  main.appendChild(clone)
}

/**
 * Cuts all selected figures in half.
 */
function wide () {
  const all = document.querySelectorAll('.selected')
  all.forEach(element => {
    if (element.classList.contains('wide')) {
      element.classList.remove('wide')
    } else {
      element.classList.add('wide')
    }
  })
}

export { move, circle, smaller, bigger, changeColor, copy, deselect, removeSelected, selectAll, randomBox, wide }
