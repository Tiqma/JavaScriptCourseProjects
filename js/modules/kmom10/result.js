/**
 * @module result
 */

/**
 * Function that shows all the results from all the tests and puts an iq quote for it.
 */
function result () {
  const queryScore = parseInt(sessionStorage.getItem('queryScore')) || 0
  const fizzScore = parseInt(sessionStorage.getItem('fizzScore')) || 0
  const memoryScore = parseInt(sessionStorage.getItem('memoryScore')) || 0
  const formsScore = parseInt(sessionStorage.getItem('formsScore')) || 0
  const perceptionScore = parseInt(sessionStorage.getItem('perceptionScore')) || 0
  const totalScore = queryScore + fizzScore + memoryScore + formsScore + perceptionScore
  const scoreboard = document.getElementById('scoreboard')
  let iq = ''
  if (totalScore < 15) {
    iq = 'dummare än tåget'
  } else if (totalScore < 20) {
    iq = 'iallafall inte helt hjärndöd'
  } else if (totalScore < 25) {
    iq = 'smartare än en 5:e klassare'
  } else if (totalScore < 35) {
    iq = 'ganska duktig'
  } else if (totalScore < 40) {
    iq = 'mensa material'
  } else {
    iq = 'ett geni'
  }
  scoreboard.remove()
  const cont = document.getElementById('query')
  const title = document.getElementById('title')
  title.innerHTML = 'Resultat'
  cont.innerHTML = `<h2>Bra kämpat! Här kan du se dina resultat!</h2><br>
                    <h3>Tipspromenad: ${queryScore} / 15 poäng</h3><br>
                    <h3>FizzBuzz: ${fizzScore} / 3 poäng</h3><br>
                    <h3>Minnesspelet: ${memoryScore} / 9 poäng</h3><br>
                    <h3>Visuell förmåga och läsförståelse: ${formsScore} / 10 poäng</h3><br>
                    <h3>Uppfattningsförmåga: ${perceptionScore} </h3><br>
                    <h3>Totalt: ${totalScore} / 44 poäng</h3><br>
                    <h3>Du är ${iq}.
                    `
}

export { result }
