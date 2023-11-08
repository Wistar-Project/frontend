import { getCookie, setCookie } from "./cookieHelper.js"
import { serverUrls } from "./consts.js"

export async function actualizarParrafos(){
    const parrafos = document.querySelectorAll('[data-text-id]')
    const traducciones = await obtenerTraducciones()
    parrafos.forEach(parrafo => {
        const texto = obtenerTextoTraducido({
            traducciones,
            id: parrafo.getAttribute('data-text-id'),
            idioma: getCookie('language') || 'es'
        })
        parrafo.innerHTML = texto
    })
}

actualizarParrafos()

async function obtenerTraducciones(){
    const traduccionesEnCache = getCookie('translations')
    if(!traduccionesEnCache){
        const traduccionesParseadas = await pedirTraducciones()
        setCookie('translations', JSON.stringify(traduccionesParseadas), 15)
        return traduccionesParseadas
    }
    return JSON.parse(traduccionesEnCache)
}

async function pedirTraducciones(){ 
    const response = await fetch(`${serverUrls.traducciones}/api/v1/traduccion`)
    return await response.json()
}

function obtenerTextoTraducido({ traducciones, id, idioma }){
    const traduccion = traducciones.filter(
        traduccion => 
            traduccion.id == id && traduccion.idioma === idioma
    )
    return traduccion[0].texto
}

export function formatearFecha(fecha){
    const date = new Date(fecha)
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      }
    return new Intl.DateTimeFormat("en-US", options).format(date).toString()
}