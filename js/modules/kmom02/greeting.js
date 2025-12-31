/**
 * A function to know if its AM or PM.
 * @returns {string} A string that gives the appropriate greeting.
 */
function tid () {
  const nu = new Date()
  const hour = nu.getHours()
  if (hour < 12) {
    return 'God förmiddag'
  } else {
    return 'God eftermiddag'
  }
}

const meddelande = tid()
document.getElementById('tid-meddelande').textContent = meddelande
