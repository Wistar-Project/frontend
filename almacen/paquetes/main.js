import { serverUrls } from '../../utils/consts.js'
const header= document.querySelector('header')

document.getElementById('boton-crear').addEventListener('click', function(){
    const form=document.getElementById('container-crear');
    form.classList.toggle('mostrar');
})
document.getElementById('close').addEventListener('click' , function(){
    const form= document.getElementById('container-crear')
    form.classList.toggle('mostrar')
})


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
            "Content-Type": "application/json"  
        },
        body: JSON.stringify(data)
    })
    .then(function(response){
        if(response.ok){
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
    })
     
    
})
const paquetesContainer = document.getElementById('paquetes')

async function obtenerYMostrarPaquetes(){
    const paquetes= await obtenerPaquetes()
    mostrarPaquetes(paquetes)

    async function obtenerPaquetes(){
        const response = await fetch(`${serverUrls.almacenes}/api/v1/paquetes`)
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
            paquetesContainer.appendChild(button).style.width1 = "100%"
            
        })
    }
 
}
obtenerYMostrarPaquetes()

const paqueteInfo = document.getElementById("informacion")

async function mostrarInformacionDePaquete(idPaquete){
    const { 
        pesoEnKg, 
        camionAsignado, 
        fechaModificacion, 
        direccionDestino
    } = await obtenerInformacionDePaquete(idPaquete)

    paqueteInfo.innerHTML = `
        <legend>Información</legend>
        <br>
        <p> Id del paquete: ${idPaquete}</p>
        <br>
        <p> Peso (kg): ${pesoEnKg}</p>
        <br>
        <div id="camion">
        <p>Vehiculo asignado: ${camionAsignado}</p>
        </div>
        <br>
        <p>Fecha de modificación: ${fechaModificacion}</p>
        <br>
        <p>Dirección destino: ${direccionDestino}</p>
    
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
        const response = await fetch(`${serverUrls.almacenes}/api/v1/paquetes/${idPaquete}`)
        return await response.json()
    }
}

const lotesContainer = document.getElementById('lotes')

async function obtenerYMostrarLotes(){
    const lotes = await obtenerLotes()
    mostrarLotes(lotes)

    async function obtenerLotes(){
        const response = await fetch(`${serverUrls.almacenes}/api/v1/lotes`)
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
            lotesContainer.appendChild(button).style.margin = "10px"
            lotesContainer.appendChild(button).style.width1 = "100%"
            
        })
    }
}


obtenerYMostrarLotes();