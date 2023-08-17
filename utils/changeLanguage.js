import { setCookie } from "./cookieHelper.js"
import { actualizarParrafos } from "./updateText.js"

const botonBandera = document.querySelectorAll('.bandera')

botonBandera.forEach(boton => {
    boton.addEventListener('click', () => {
        console.log(boton.getAttribute('data-language'))
        const TIEMPO_MUY_LARGO = 1000
        setCookie("language", boton.getAttribute('data-language'), TIEMPO_MUY_LARGO)
        actualizarParrafos()
        intercambiarAtributos()
    })
})

function intercambiarAtributos(){
    const ATRIBUTOS_A_INTERCAMBIAR = ["src", "alt", "id", "data-language"]
    ATRIBUTOS_A_INTERCAMBIAR.forEach(atributo => {
        intercambiarAtributo(atributo)
    })
}

function intercambiarAtributo(atributo){
    const temp = botonBandera[0][atributo]
    botonBandera[0][atributo] = botonBandera[1][atributo]
    botonBandera[1][atributo] = temp
}