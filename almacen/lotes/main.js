import  {serverUrls}from '../../utils/consts.js'
import { getCookie } from '../../utils/cookieHelper.js';

const paquetesPorAsignar = new Set()

const destinoSelector = document.getElementById("destino-selector")

function limpiarPaquetes(){
    document.getElementById('agregar-paquetes').innerHTML = ""
}

destinoSelector.addEventListener('change', () => {
    paquetesPorAsignar.clear()
    limpiarPaquetes()
    obtenerYMostrarPaquetesConMismoDestino()
})

async function obtenerYMostrarPaquetesConMismoDestino(){
    const paquetes = await obtenerPaquetes()
    console.log(paquetes)
    mostrarPaquetes(paquetes)
    async function obtenerPaquetes(){
        const response = await fetch(`${serverUrls.almacenes}/api/v1/paquetes/asignar/${destinoSelector.value}`,
        {
            headers:{
                "Authorization":`Bearer ${getCookie("token")}`
            }
        })
        return await response.json()
    }

    function mostrarPaquetes(paquetes){
        paquetes.map(paquete => {
            const button = document.createElement('button')
            button.textContent = paquete
            button.className = "paqueteBoton"
            button.addEventListener('click', e => {
                e.preventDefault()
                button.style.backgroundColor = "#73b094"
                button.style.border = "1px solid #fff"
                paquetesPorAsignar.add(paquete)
                console.log(paquetesPorAsignar)
            })
            button.classList.toggle('paquetes-creados')
            button.style.cursor = "pointer"
            button.style.margin = "20px"
            paquetesContainer.appendChild(button)
            
        })
    }

}

mostrarDestinos()
    .then(() => {
        obtenerYMostrarPaquetesConMismoDestino()
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
document.getElementById('boton-crear').addEventListener('click', function(){
    const form=document.getElementById('container-crear');
    form.classList.toggle('mostrar');
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    const botonCrear = document.getElementById('boton-crear')
    const botonVolver = document.getElementById('volver')
    botonCrear.style.filter ='grayscale(1)'
    botonVolver.style.filter = 'grayscale(1)'
    botonCrear.style.pointerEvents = 'none'
    botonVolver.style.pointerEvents = 'none'
    document.body.style.backdropFilter = 'grayscale(1)'
    header.style.filter = 'grayscale(1)'
    footer.style.filter = 'grayscale(1)'
    
})
document.getElementById('close').addEventListener('click' , function(){
    const form=document.getElementById('container-crear');
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    form.classList.toggle('mostrar');
    const botonCrear = document.getElementById('boton-crear')
    const botonVolver = document.getElementById('volver')
    botonCrear.style.filter ='grayscale(0)'
    botonVolver.style.filter = 'grayscale(0)'
    botonCrear.style.pointerEvents = 'all'
    botonVolver.style.pointerEvents = 'all'
    document.body.style.backdropFilter = 'grayscale(0)'
    header.style.filter = 'grayscale(0)'
    footer.style.filter = 'grayscale(0)'
})

async function asignarPaquetes(response){
    const lote = await response.json()
    paquetesPorAsignar.forEach(paquete => {
        fetch(`${serverUrls.almacenes}/api/v1/lotes/asignar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json" , 
                "Authorization":`Bearer ${getCookie("token")}`, 
            },
            body: JSON.stringify({
                lote: lote.id,
                paquete: paquete
            })
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
    fetch(`${serverUrls.almacenes}/api/v1/lotes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json" , 
            "Authorization":`Bearer ${getCookie("token")}`,   
        },
        body: JSON.stringify(data)
        })
    .then(function(response){
        if(response.ok){
            asignarPaquetes(response)
            const divAlerta = document.createElement('div')
            divAlerta.className = 'alerta-creada'
            divAlerta.textContent = "Lote creado con exito"
            document.body.appendChild(divAlerta)
            divAlerta.style.display =  "block"
            setTimeout(function(){
                divAlerta.style.display = "none"
                document.body.removeChild(divAlerta)
            }, 3500)
        } 
    })
    .catch(err =>{
        const divAlerta = document.createElement('div')
        divAlerta.className = 'alerta-error'
        divAlerta.textContent = "Fallo al crear el lote"
        document.body.appendChild(divAlerta)
        divAlerta.style.display =  "block"
        setTimeout(function(){
            divAlerta.style.display = "none"
            document.body.removeChild(divAlerta)
        }, 3500)
        console.log(err)
    })
     
    
})

const lotesContainer = document.getElementById('lotes')
const paquetesAgregar = document.getElementById('agregar-paquetes')

async function obtenerYMostrarLotes(){
    const lotes = await obtenerLotes()
    mostrarLotes(lotes)

    async function obtenerLotes(){
        const response = await fetch(`${serverUrls.almacenes}/api/v1/lotes` ,
        {
            headers:{
                "Authorization":`Bearer ${getCookie("token")}`
            }
        }
        )
        return await response.json()
    }

    function mostrarLotes(lotes){
        lotes.map(lote => {
            const button = document.createElement('button')
            button.textContent = lote.id
            button.className = "loteBoton"
            button.addEventListener('click', function() {
                mostrarInformacionDeLote(lote.id)
            })
            lotesContainer.appendChild(button)
            lotesContainer.appendChild(button).classList.toggle('lotes-creados')
            lotesContainer.appendChild(button).style.cursor = "pointer"
            lotesContainer.appendChild(button).style.margin = "20px"
            lotesContainer.appendChild(button).style.width1 = "100%"
            
        })
    }
}


/*obtenerYMostrarLotes();*/

const loteInfo = document.getElementById("informacion")

async function mostrarInformacionDeLote(idLote){
    const { 
        pesoEnKg, 
        camionAsignado, 
        direccionDestino, 
        cantidadPaquetes 
    } = await obtenerInformacionDeLote(idLote)
    loteInfo.innerHTML = `
        <legend>Información</legend>
        <br>
        <p> Id del lote: ${idLote}</p>
        <br>
        <p> Peso (kg): ${pesoEnKg}</p>
        <br>
        <div id="camion">
        <p>Vehiculo asignado: ${camionAsignado}</p>
       
        </div>
        <br>
        <p>Dirección destino: ${direccionDestino}</p>
        <br>
        <p>Cantidad de paquetes: ${cantidadPaquetes}</p>
    `
    document.getElementById('cerrar').addEventListener('click', function(){
        document.getElementById('container-asignar').classList.toggle('ver')
    })
    async function obtenerInformacionDeLote(idLote){
        const response = await fetch(`${serverUrls.almacenes}/api/v1/lotes/${idLote}`,
        {
            headers:{
                "Authorization":`Bearer ${getCookie("token")}`
            }
        }
        )
        return await response.json()
    }
}

const paquetesContainer = document.getElementById('agregar-paquetes')



