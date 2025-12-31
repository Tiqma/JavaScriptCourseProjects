/**
 * Function that centers the box.
 */
function center () {
  const box1 = document.getElementById('box1')
  box1.style.top = (window.innerHeight / 2) - (box1.clientHeight / 2) + 'px'
  box1.style.left = (window.innerWidth / 2) - (box1.clientWidth / 2) + 'px'
}

/**
 * Function that prints out useful information in the web terminal.
 */
function info () {
  const box1 = document.getElementById('box1')

  const boxHeight = box1.offsetHeight
  const boxWidth = box1.offsetWidth

  const winHeight = window.innerHeight
  const winWidth = window.innerWidth

  const posTop = box1.offsetTop
  const posLeft = box1.offsetLeft

  console.log(`Window height: ${winHeight}
    Window width: ${winWidth}
    Box height: ${boxHeight}
    Box width: ${boxWidth}
    Box position top: ${posTop}
    Box position lef: ${posLeft}`)

  console.log('Cut every selected figure in half by pressing "k"')
}

export { center, info }
