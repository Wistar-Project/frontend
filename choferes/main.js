import { serverUrls } from "../utils/consts.js"
import { getCookie } from "../utils/cookieHelper.js"

const todos = document.getElementById('mostrar-todos')
const pendientes = document.getElementById('mostrar-pendientes')
pendientes.addEventListener('click', async function(){
    todos.style.display='flex'
    pendientes.style.display='none'
    const entregas = document.getElementById('entregas')
    entregas.innerHTML = "<legend>Entregas pendientes</legend>"
    const destinos = await obtenerDestinos()
    mostrarDestinos(destinos.filter(destino => !destino.entregada))
})
todos.addEventListener('click', async function(){
    todos.style.display='none'
    pendientes.style.display='flex'
    const entregas = document.getElementById('entregas')
    entregas.innerHTML = "<legend>Todas las entregas</legend>"
    mostrarDestinos(await obtenerDestinos())
})

function destinosRestantes(){
    return Array.from(document.querySelectorAll('.boton-entregar')).filter(boton => {
        return boton.style.backgroundImage !== 'url("/img/checkmark.png")'
    }).length
}

async function obtenerDestinos(){
    const response = await fetch(`${serverUrls.transito}/api/v1/entregas`, {
        headers: {
            Authorization: `Bearer ${getCookie('token')}`,
            Accept: "application/json"
        }
    })
    if(!response.ok){
        mostrarAvisoNadaPorHacer()
        throw 'No tiene vehículo asignado'
    }
    return await response.json()

}

mostrarDestinos(await obtenerDestinos())

function mostrarDestinos(destinos){
    destinos.forEach(destino => {
        const entregas = document.getElementById('entregas')
        entregas.innerHTML += `
            <div class="entrega-container">
                <button class="boton-entregar" data-direccion-id="${destino.idDireccion}" ${destino.entregada && "style='background-image:url(/img/checkmark.png)'"}></button>
                <button class="boton-ver-descargas" data-direccion-id="${destino.idDireccion}">${destino.direccion}</button>
            </div>
            `
    })

    document.querySelectorAll('.boton-ver-descargas').forEach(boton => {
        boton.addEventListener('click', async () => {
            mostrarDescarga(await obtenerDescarga(boton.dataset.direccionId))
        })
    })

    document.querySelectorAll('.boton-entregar').forEach(boton => {
        boton.addEventListener('click', async () => {
            if(boton.style.backgroundImage === 'url("/img/checkmark.png")') return
            boton.style.backgroundImage = "url(/img/checkmark.png)"
            document.getElementById('mapa-o-descargas-container').innerHTML = "Actualizando mapa..."
            if(destinosRestantes() === 0) {
                mostrarAvisoNadaPorHacer()
                document.getElementById('mapa-o-descargas-container').innerHTML = ""
            }
            await marcarComoEntregada(boton.dataset.direccionId)
            mostrarMapa((await obtenerDestinos()).filter(destino => !destino.entregada))
        })
    })
    mostrarMapa(destinos.filter(destino => !destino.entregada))
}

function mostrarMapa(destinos){
    if(destinos.length === 0) return mostrarAvisoNadaPorHacer()
    const direccionDestinos = destinos.map(destino => destino.direccion)
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
            &destination=${direccionDestinos[0]}
            ${obtenerWaypoints(direccionDestinos)}"
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

async function marcarComoEntregada(idDireccion){
   await fetch(`${serverUrls.transito}/api/v1/entregas/${idDireccion}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getCookie('token')}`
        }
    })
}

async function obtenerDescarga(idDireccion){
    console.log(idDireccion)
    const response = await fetch(`${serverUrls.transito}/api/v1/entregas/${idDireccion}`, {
        headers: {
            Authorization: `Bearer ${getCookie('token')}`
        }
    })
    return await response.json()
}

async function mostrarDescarga(descargas){
    document.getElementById('texto-leyenda').innerHTML = "Lotes o paquetes a descargar"
    document.getElementById('mapa-o-descargas-container').innerHTML = ""
    descargas.forEach(descarga => {
        document.getElementById('mapa-o-descargas-container').innerHTML += `
            <p class="lote-o-paquete">${descarga}</p>
        `
    })
    document.getElementById('volver').href = "#"
    const event = document.getElementById('volver').addEventListener('click', async () => {
        mostrarMapa((await obtenerDestinos()).filter(destino => !destino.entregada))
        document.getElementById('volver').href = "/"
        document.getElementById('texto-leyenda').innerHTML = "Mapa con ruta"
    })
}