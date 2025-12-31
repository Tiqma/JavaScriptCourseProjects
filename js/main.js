console.log('Hejsan')

const today = new Date()
const options = { year: 'numeric', month: 'long', day: 'numeric' }
const formattedDate = today.toLocaleDateString('sv-SV', options)

console.log(`Dagens datum är ${formattedDate}`)
