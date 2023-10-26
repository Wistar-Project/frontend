import  {serverUrls}from '../../utils/consts.js'

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
    fetch(`${serverUrls.almacenes}/api/v1/lotes`, {
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
            lotesContainer.appendChild(button).style.margin = "20px"
            lotesContainer.appendChild(button).style.width1 = "100%"
            
        })
    }
}


obtenerYMostrarLotes();

const loteInfo = document.getElementById("informacion")

async function mostrarInformacionDeLote(idLote){
    const { 
        pesoEnKg, 
        camionAsignado, 
        fechaModificacion, 
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
        <p>Vehiculo asignado: ${camionAsignado}</p>
        <br>
        <p>Fecha de modificación: ${fechaModificacion}</p>
        <br>
        <p>Dirección destino: ${direccionDestino}</p>
        <br>
        <p>Cantidad de paquetes: ${cantidadPaquetes}</p>
    `

    async function obtenerInformacionDeLote(idLote){
        const response = await fetch(`${serverUrls.almacenes}/api/v1/lotes/${idLote}`)
        return await response.json()
    }
}