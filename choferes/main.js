import { serverUrls } from "../utils/consts.js"
import { getCookie } from "../utils/cookieHelper.js"

const todos = document.getElementById('mostrar-todos')
const pendientes = document.getElementById('mostrar-pendientes')
pendientes.addEventListener('click', function(){
    todos.style.display='flex'
    pendientes.style.display='none'
})
todos.addEventListener('click', function(){
    todos.style.display='none'
    pendientes.style.display='flex'
})




/*
checkPersonalizado.addEventListener('click',function(){
    if(activado){
        check.checked = true
        listo.style.display ='block'   
    }else{
        check.checked = false
        listo.style.display = 'none'

    }
    })
    
*/


async function obtenerDestinos(){
    const response = await fetch(`${serverUrls.transito}/api/v1/entregas`, {
        headers: {
            Authorization: `Bearer ${getCookie('token')}`,
            Accept: "application/json"
        }
    })
    return await response.json()
}

mostrarDestinos(await obtenerDestinos())

function mostrarDestinos(destinos){
    destinos.forEach(destino => {
        const entregas = document.getElementById('entregas')
        entregas.innerHTML += `
            <div class="entrega-container">
                <button class="boton-entregar" data-id-direccion="${destino.idDireccion}" ${destino.entregada && "style='background-image:url(/img/checkmark.png)'"}></button>
                <button class="boton-ver-descargas">${destino.direccion}</button>
            </div>
            `
    })

    document.querySelectorAll('.boton-entregar').forEach(boton => {
        boton.addEventListener('click', () => {
            boton.style.backgroundImage = "url(/img/checkmark.png)"
        })
    })
    mostrarMapa(destinos.filter(destino => !destino.entregada))
}

function mostrarMapa(destinos){
    if(destinos.length === 0) return mostrarAvisoNadaPorHacer()
    console.log(obtenerWaypoints(destinos.map(destino => destino.direccion)))
    const mapaContenedor = document.getElementById('mapa-o-descargas-container')
    mapaContenedor.innerHTML = `
    <iframe
        width="90%"
        height="90%"
        style="border:0;margin:25px"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyDpUoy6VuYXwuO7qHE7CR3P84UHgiEdV68
            &origin=Avenida General San Martín Dr Carlos Fosalba, Montevideo Departamento de Montevideo
            &destination=${destinos[0]}
            ${obtenerWaypoints(destinos)}"
    </iframe>
    `

    function obtenerWaypoints(destinos){
        if(destinos.length - 1 === 0) return ""
        return `&waypoints=${destinos.slice(1).join('|')}`
    }
}

function mostrarAvisoNadaPorHacer(){
    document.getElementById('aviso').style.display = "flex"
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    const botonVolver = document.getElementById('volver')
    botonVolver.style.filter = 'grayscale(1)'
    document.body.style.backdropFilter = 'grayscale(1)'
    header.style.filter = 'grayscale(1)'
    footer.style.filter = 'grayscale(1)'
    botonVolver.style.pointerEvents = 'all'
    document.getElementById('entregas').style.filter = 'grayscale(1)'
    document.getElementById('mostrar-pendientes').style.filter = 'grayscale(1)'
    document.getElementById('field-mapa-o-descargas').style.filter = 'grayscale(1)'
}