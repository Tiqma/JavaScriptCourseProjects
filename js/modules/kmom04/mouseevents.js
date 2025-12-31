/**
 * If clicked it will be selected.
 * @param {HTMLElement} box The element to process.
 */
function select (box) {
  box.classList.toggle('selected')
}

/**
 * If doubleclicked it will be removed.
 * @param {HTMLElement} box The element to process.
 */
function doubleclick (box) {
  box.classList.add('dblClicked')
  window.setTimeout(() => {
    box.remove()
  }, 2000)
}

export { select, doubleclick }
