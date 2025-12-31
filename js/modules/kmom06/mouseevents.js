/**
 * Function that adds an class and disables the button.
 * @param {HTMLButtonElement} btn A button with a letter.
 */
function selecter (btn) {
  btn.classList.add('clicked')
  btn.disabled = true
}

export { selecter }
