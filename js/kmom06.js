import { hangman } from './modules/kmom06/hangman.js'
import { selecter } from './modules/kmom06/mouseevents.js'

for (const part of hangman.validParts) {
  hangman.hide(part)
}

const alphabet = 'abcdefghijklmnopqrstuvwxyzåäö'.split('')
const bokstav = document.getElementById('hangcontent')

for (let i = 0; i < alphabet.length; i++) {
  bokstav.innerHTML += `
    <button id="letter ${alphabet[i]}">${alphabet[i]}</button>
    `
}

const theWord = document.getElementById('theWord')

let partCounter = 0

for (let i = 0; i < alphabet.length; i++) {
  const letterBtn = document.getElementById(`letter ${alphabet[i]}`)
  const content = document.getElementById('hangcontent')
  letterBtn.addEventListener('click', function (event) {
    const missed = document.getElementById('missedLetters')
    const selectedLetter = letterBtn.textContent
    if (partCounter === 8) {
      content.innerHTML = '<h1>Game Over</h1>'
    }
    if (wordList.includes(selectedLetter)) {
      console.log(selectedLetter)
      const placeholders = document.querySelectorAll(`.letters[id^="letter${selectedLetter}"]`)
      placeholders.forEach((placeholder) => {
        placeholder.textContent = selectedLetter
        if (!theWord.textContent.includes('-')) {
          bokstav.innerHTML = '<h1> You Won The Game!</h1>'
        }
      })
    } else {
      hangman.show(hangman.validParts[partCounter])
      partCounter += 1
      missed.innerHTML += ` ${selectedLetter}`
    }

    selecter(letterBtn)
  })
}

const word = await hangman.peek()
const wordList = word.split('')
console.log(wordList)
for (let i = 0; i < wordList.length; i++) {
  theWord.innerHTML += `<h1 id="letter${wordList[i]}" class="letters">-</h1>`
}

hangman.wordlist()
hangman.peek()

console.log(hangman)
