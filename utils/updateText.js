import { getCookie, setCookie } from "./cookieHelper.js"
import { serverUrls } from "./consts.js"

const parrafos = document.querySelectorAll('[data-text-id]')

let traducciones = getCookie('translations')
if(!traducciones){
    traducciones = await obtenerTraducciones()
    setCookie('translations', JSON.stringify(traducciones), 15)
}
const traduccionesParseadas = JSON.parse(traducciones)
parrafos.forEach(parrafo => {
    const texto = obtenerTextoTraducido({
        traducciones: traduccionesParseadas,
        id: parrafo.getAttribute('data-text-id'),
        idioma: getCookie('language') ?? 'es'
    })
    parrafo.innerHTML = texto
})

async function obtenerTraducciones(){ 
    const response = await fetch(`${serverUrls.traducciones}/api/v1/traduccion`)
    return await response.json()
}

function obtenerTextoTraducido({ traducciones, id, idioma }){
    const traduccion = traducciones.filter(
        traduccion => 
            traduccion.id == id && traduccion.idioma === idioma
    )g
    return traduccion[0].texto
}