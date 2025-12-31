import { colors, persons, years } from './modules/kmom03/info.js'

const btn = document.getElementById('startButton')

// const content = document.querySelector('.content'); // Use querySelector instead of getElementsByClassName

// content.innerHTML = `<h1>${colors}</h1>\n<h1>${persons}</h1>\n<h1>${years}</h1>\n`;

const newTop = (window.innerHeight / 2) - (btn.clientHeight / 2)
const newLeft = (window.innerWidth / 2) - (btn.clientWidth / 2)
btn.style.top = `${newTop}px`
btn.style.left = `${newLeft}px`

let counter = 0

btn.addEventListener('click', function (event) {
  const temp = document.createElement('div')
  temp.className = 'box'
  temp.style.backgroundColor = colors[counter]
  temp.id = persons[counter]
  btn.style.backgroundColor = colors[counter + 1]

  /**
   * Adds an click event that summons Childelements to an parent.
   * @param {Event} event Click elements added.
   */
  function innerClickListener (event) {
    event.target.innerHTML = temp.id + '\n'
    const fist = document.createElement('img')
    fist.src = './img/logo.png'
    fist.classList.add('fist')

    temp.appendChild(fist)
    temp.appendChild(document.createTextNode(years[counter]))

    temp.classList.add('myborder')

    temp.removeEventListener('click', innerClickListener)

    /**
     * Function if the mouse enters the card area.
     * @param {Event} event Adds an border.
     */
    function mouseEnter (event) {
      temp.classList.add('bord')
    }

    /**
     * Function if the mouse leaves the card area.
     * @param {Event} event Removes the border.
     */
    function mouseLeave (event) {
      temp.classList.remove('bord')
    }

    temp.addEventListener('mouseenter', mouseEnter)
    temp.addEventListener('mouseleave', mouseLeave)
  }

  temp.addEventListener('click', innerClickListener)

  counter = counter < colors.length - 1 ? counter + 1 : 0
  document.getElementsByClassName('content')[0].appendChild(temp)

  if (counter === 6) {
    btn.remove()
  }
})

// console.log(window.getComputedStyle(btn). backgroundColor)
