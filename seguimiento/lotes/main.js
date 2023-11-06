import { getCookie } from '../../utils/cookieHelper.js'
import { serverUrls } from '../../utils/consts.js' 

document.getElementById('boton-buscar').addEventListener('click', function(){
    const form=document.getElementById('container-buscar');
    form.classList.toggle('mostrar');
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    const botonBuscar = document.getElementById('boton-buscar')
    const botonVolver = document.getElementById('volver')
    botonVolver.style.filter = 'grayscale(1)'
    botonBuscar.style.filter = 'grayscale(1)'
    document.body.style.backdropFilter = 'grayscale(1)'
    header.style.filter = 'grayscale(1)'
    footer.style.filter = 'grayscale(1)'
    botonBuscar.style.pointerEvents = 'none'
    botonVolver.style.pointerEvents = 'none'
    
})
document.getElementById('cerrar').addEventListener('click' , function(){
    const form=document.getElementById('container-buscar');
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    form.classList.toggle('mostrar');
    const botonBuscar = document.getElementById('boton-buscar')
    const botonVolver = document.getElementById('volver')
    botonVolver.style.filter = 'grayscale(0)'
    botonBuscar.style.filter = 'grayscale(0)'
    document.body.style.backdropFilter = 'grayscale(0)'
    header.style.filter = 'grayscale(0)'
    footer.style.filter = 'grayscale(0)'
    botonBuscar.style.pointerEvents = 'all'
    botonVolver.style.pointerEvents = 'all'
})
document.querySelector('form')
.addEventListener('submit', e =>{
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )
    console.log(JSON.stringify(data))
    var id = data.id
    mostrarInformacionDeLoteYPaquetesAsignados(id)
})

async function mostrarPaquetesAsignados(paquetes){
    const paquetesContainer = document.getElementById('paquetes-asignados-container')
    paquetes.map(paquete => {
        console.log(paquete)
        const button = document.createElement('button')
        button.textContent = paquete
        button.className = "loteBoton"
        button.addEventListener('click', function() {
            window.location.href = `/seguimiento/paquetes/?id=${paquete}`
        })
        button.classList.toggle('paquetes-creados')
        button.style.cursor = "pointer"
        button.style.margin = "20px"
        paquetesContainer.appendChild(button)  
    })
}

const loteInfo = document.getElementById("informacion")

async function mostrarInformacionDeLoteYPaquetesAsignados(idLote){
    const { 
        estado, 
        camionAsignado, 
        conductor, 
        destino,
        paquetes
    } = await obtenerInformacionDeLote(idLote)
    mostrarPaquetesAsignados(paquetes)
    loteInfo.innerHTML = `
        <legend>Información del lote</legend>
        <p>Id del lote: ${idLote}</p>
        <p>Estado: ${estado}</p>
        <p>Camión asignado: ${camionAsignado}</p>
        <p>Conductor a cargo: ${conductor}</p>
        <p>Destino: ${destino}</p>
          `
    async function obtenerInformacionDeLote(idLote){
        const response = await fetch(`${serverUrls.transito}/api/v1/lote/${idLote}`,{
            headers : {
                "Content-Type": "application/json" , 
                "Authorization":`Bearer ${getCookie("token")}`,   
            }
        }
        )
        if(!response.ok){
            const alerta = document.createElement('div')
            alerta.textContent = 'El lote no está asignado a un vehículo'
            alerta.className= 'alerta'
            document.body.appendChild(alerta)
            setTimeout(function(){
                alerta.style.display = 'none'
            },3500)
            throw "No asignado a camión"
        }
        return await response.json()
    }
}