import { africanAnimals, americanAnimals, europeanAnimals } from './modules/kmom02/animals.js'

/**
 * Function to generate random animals from different regions.
 * @param {Array} continentArray What continent animals.
 * @returns {string} A random animal from a specific continent.
 */
function randomAnimal (continentArray) {
  const randomAnimal = Math.floor(Math.random() * continentArray.length)
  return continentArray[randomAnimal]
}
const africanAnimal = randomAnimal(africanAnimals)
const americanAnimal = randomAnimal(americanAnimals)
const europeanAnimal = randomAnimal(europeanAnimals)
const container = document.getElementById('container')
container.innerHTML = `<h1>${africanAnimal}<h1>\n<h1>${americanAnimal}<h1>\n<h1>${europeanAnimal}<h1>\n`
