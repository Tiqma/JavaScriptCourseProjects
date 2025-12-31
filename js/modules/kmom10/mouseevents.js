/**
 * @module mouseevents
 */

/**
 * If clicked it will be selected.
 * @param {HTMLElement} box The element to process.
 */
function selectBox (box) {
  const queryBoxes = document.getElementsByClassName('queryBox')
  for (let i = 0; i < queryBoxes.length; i++) {
    queryBoxes[i].classList.remove('selected')
  }

  box.classList.toggle('selected')
}

export { selectBox }
