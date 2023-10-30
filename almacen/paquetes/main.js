import { serverUrls } from '../../utils/consts.js'
import { getCookie } from '../../utils/cookieHelper.js'
import { formatearFecha } from '../../utils/updateText.js'

const lotesContainer = document.getElementById('lotes')
const destinoSelector = document.getElementById("destino-selector")
let loteParaAsignarSeleccionado

destinoSelector.addEventListener('change', () => {
    vaciarLotes()
    obtenerYMostrarLotes()
})

mostrarDestinos()
    .then(() => {
        obtenerYMostrarLotes()
    })
async function mostrarDestinos(){
    (await obtenerDestinos()).map(destino => {
        const opcion = document.createElement("option")
        opcion.text = destino.direccion
        opcion.value = destino.id
        destinoSelector.add(opcion)
    })
}

async function obtenerDestinos(){
    const destinos = await fetch(`${serverUrls.almacenes}/api/v1/destinos`, {
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${getCookie('token')}`
        }
    })
    return destinos.json()
}

function vaciarLotes(){
    lotesContainer.innerHTML = ""
}

document.getElementById('boton-crear').addEventListener('click', function(){
    const form=document.getElementById('container-crear');
    form.classList.toggle('mostrar');
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    document.body.style.backdropFilter = 'grayscale(1)'
    header.style.filter = 'grayscale(1)'
    footer.style.filter = 'grayscale(1)'
    
})
document.getElementById('close').addEventListener('click' , function(){
    const form=document.getElementById('container-crear');
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    form.classList.toggle('mostrar');
    document.body.style.backdropFilter = 'grayscale(0)'
    header.style.filter = 'grayscale(0)'
    footer.style.filter = 'grayscale(0)'
    loteParaAsignarSeleccionado = undefined
    deseleccionarLotes()
})

async function asignarALote(data){
    const response = await data
    const datosPaquete = await response.json()
    fetch(`${serverUrls.almacenes}/api/v1/lotes/asignar`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${getCookie('token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            lote: loteParaAsignarSeleccionado,
            paquete: datosPaquete.id
        })
    })
}

document.querySelector('form')
.addEventListener('submit', e =>{
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )
    console.log(JSON.stringify(data))
    fetch(`${serverUrls.almacenes}/api/v1/paquetes`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${getCookie('token')}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(function(response){
        if(response.ok){
            if(loteParaAsignarSeleccionado){
                asignarALote(response).then(() => {
                    loteParaAsignarSeleccionado = undefined
                })
            }
            const divAlerta = document.createElement('div')
            divAlerta.className = 'alerta-creada'
            divAlerta.textContent = "Paquete creado con exito"
            document.body.appendChild(divAlerta)
            divAlerta.style.display =  "flex"
            setTimeout(function(){
                divAlerta.style.display = "none"
                document.body.removeChild(divAlerta)
            }, 3500)
        } 
    })
    .catch(err =>{
        const divAlerta = document.createElement('div')
        divAlerta.className = 'alerta-error'
        divAlerta.textContent = "Fallo al crear el paquete"
        document.body.appendChild(divAlerta)
        divAlerta.style.display =  "flex"
        setTimeout(function(){
            divAlerta.style.display = "none"
            document.body.removeChild(divAlerta)
        }, 3500)
        console.log(err)
        loteParaAsignarSeleccionado = undefined
    })
     
    
})
const paquetesContainer = document.getElementById('paquetes')

async function obtenerYMostrarPaquetes(){
    const paquetes= await obtenerPaquetes()
    mostrarPaquetes(paquetes)

    async function obtenerPaquetes(){
        const response = await fetch(`${serverUrls.almacenes}/api/v1/paquetes`, {
            headers: {
                "Authorization": `Bearer ${getCookie('token')}`
            }
        })
        return await response.json()
    }

    function mostrarPaquetes(paquetes){
        paquetes.map(paquete => {
            const button = document.createElement('button')
            button.textContent = paquete.id
            button.className = "paqueteBoton"
            button.addEventListener('click', function() {
                mostrarInformacionDePaquete(paquete.id)
            })
            paquetesContainer.appendChild(button)
            paquetesContainer.appendChild(button).classList.toggle('paquetes-creados')
            paquetesContainer.appendChild(button).style.cursor = "pointer"
            paquetesContainer.appendChild(button).style.margin = "20px"
        })
    }
 
}
obtenerYMostrarPaquetes()

const paqueteInfo = document.getElementById("informacion")

async function mostrarInformacionDePaquete(idPaquete){
    const { 
        pesoEnKg, 
        vehiculoAsignado, 
        fechaModificacion, 
        direccionDestino,
        email,
        loteAsignado
    } = await obtenerInformacionDePaquete(idPaquete)
    const fechaFormateada = formatearFecha(fechaModificacion)
    paqueteInfo.innerHTML = `
        <legend>Información</legend>
        <br>
        <p> Id del paquete: ${idPaquete}</p>
        <br>
        <p> Peso (kg): ${pesoEnKg}</p>
        <br>
        <div id="camion">
        <p>Vehiculo asignado: ${vehiculoAsignado}</p>
        </div>
        <br>
        <p>Fecha de modificación: ${fechaFormateada}</p>
        <br>
        <p>Dirección destino: ${direccionDestino}</p>
        <br>
        <p>Lote asignado: ${loteAsignado}</p>
        <br>
        <p>Email: ${email}</p>
    
    `
    let svgCode = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
  </svg>
  `
    const camion = document.getElementById('camion')
  let parser = new DOMParser();
let doc = parser.parseFromString(svgCode,"image/svg+xml");
    camion.appendChild(doc.documentElement).setAttribute('id' , 'boton-asignar');
    document.getElementById('boton-asignar').addEventListener('click', function(){
        document.getElementById('container-asignar').classList.toggle('ver')
    })
    document.getElementById('cerrar').addEventListener('click', function(){
        document.getElementById('container-asignar').classList.toggle('ver')
    })
    async function obtenerInformacionDePaquete(idPaquete){
        const response = await fetch(`${serverUrls.almacenes}/api/v1/paquetes/${idPaquete}`, {
            headers: {
                "Authorization": `Bearer ${getCookie('token')}`
            }
        })
        return await response.json()
    }
}

function deseleccionarLotes(){
    const lotesContainer = document.getElementById('lotes')
    for(let i = 0; i < lotesContainer.children.length; i++){
        lotesContainer.children[i].style.backgroundColor = "#253e41"
        lotesContainer.children[i].style.border = "1px solid #000"
    }
}

async function obtenerYMostrarLotes(){
    const destinoSelector = document.getElementById('destino-selector')
    const lotes = await obtenerLotes()
    mostrarLotes(lotes)

    async function obtenerLotes(){
        const response = await fetch(`${serverUrls.almacenes}/api/v1/lotes/asignar/${destinoSelector.value}`, {
            headers: {
                "Authorization": `Bearer ${getCookie('token')}`
            }
        })
        return await response.json()
    }

    function mostrarLotes(lotes){
        lotes.map(idLote => {
            const button = document.createElement('button')
            button.textContent = idLote
            button.className = "loteBoton"
            button.classList.toggle('lotes-creados')
            button.style.cursor = "pointer"
            button.style.margin = "10px"
            button.addEventListener('click', e => {
                e.preventDefault()
                deseleccionarLotes()
                button.style.backgroundColor = "#73b094"
                button.style.border = "1px solid #fff"
                loteParaAsignarSeleccionado = button.innerHTML
                console.log(loteParaAsignarSeleccionado)
            })
            lotesContainer.appendChild(button)
        })
    }
}