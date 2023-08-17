import { setCookie } from "./cookieHelper.js"
import { actualizarParrafos } from "./updateText.js"

const spanishButton = document.querySelector('#bandera-es')
const englishButton = document.querySelector('#bandera-en')

spanishButton.addEventListener('click', () => {
    setCookie("language", "es", 1000)
    actualizarParrafos()
})

englishButton.addEventListener('click', () => {
    setCookie("language", "en", 1000)
    actualizarParrafos()
})