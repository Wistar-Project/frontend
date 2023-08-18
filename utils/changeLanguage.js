import { getCookie, setCookie } from "./cookieHelper.js"
import { actualizarParrafos } from "./updateText.js"

const banderaSiguiente = document.getElementById('bandera-siguiente')
const banderaActual = document.getElementById('bandera-actual')

banderaSiguiente.addEventListener('click', () => {
    const TIEMPO_MUY_LARGO = 1000
    setCookie("language", siguienteIdioma(), TIEMPO_MUY_LARGO)
    actualizarParrafos()
    intercambiarAtributos()
})

function siguienteIdioma(){
    const idiomaActual = getCookie('language') ?? "es"
    return idiomaActual === "es" ? "en" : "es"
}

function intercambiarAtributos(){
    const ATRIBUTOS_A_INTERCAMBIAR = ["src", "alt"]
    ATRIBUTOS_A_INTERCAMBIAR.forEach(atributo => {
        intercambiarAtributo(atributo)
    })
}

function intercambiarAtributo(atributo){
    const temp = banderaActual[atributo]
    banderaActual[atributo] = banderaSiguiente[atributo]
    banderaSiguiente[atributo] = temp
}