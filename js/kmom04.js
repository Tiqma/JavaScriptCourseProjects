/*
let allClass = document.getElementsByClassName("boxx")
let allQuery = document.querySelectorAll(".boxx")

console.log("class before: " + allClass.length)
console.log("query before: " + allQuery.length)

let temp = document.createElement('div')
temp.className = "boxx"
document.body.appendChild(temp)

console.log("class after: " + allClass.length)
console.log("query after: " + allQuery.length) */

import { center, info } from './modules/kmom04/helpers.js'
import { doubleclick, select } from './modules/kmom04/mouseevents.js'
import { move, circle, smaller, bigger, changeColor, copy, deselect, removeSelected, selectAll, randomBox, wide } from './modules/kmom04/keyboardevents.js'

const box1 = document.getElementById('box1')

center()

window.addEventListener('resize', center)
box1.addEventListener('click', function (event) {
  select(event.target)
})

document.addEventListener('keydown', function (event) {
  const key = event.key
  const steps = 10

  switch (key) {
    case 'ArrowUp':
      move(0, -steps)
      break
    case 'ArrowDown':
      move(0, steps)
      break
    case 'ArrowRight':
      move(steps, 0)
      break
    case 'ArrowLeft':
      move(-steps, 0)
      break
  }
})

box1.addEventListener('dblclick', function (event) {
  doubleclick(event.target)
})

document.addEventListener('keypress', function (event) {
  if (event.key === 'e') {
    circle()
  } else if (event.key === 'w') {
    smaller()
  } else if (event.key === 'q') {
    bigger()
  } else if (event.key === 'r') {
    changeColor()
  } else if (event.key === 't') {
    copy()
  } else if (event.key === 'u') {
    deselect()
  } else if (event.key === 'y') {
    removeSelected()
  } else if (event.key === 'i') {
    selectAll()
  } else if (event.key === 'p') {
    randomBox()
  } else if (event.key === 'k') {
    wide()
  }
})

info()
