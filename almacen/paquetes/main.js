import { serverUrls } from '../../utils/consts.js'
const header= document.querySelector('header')

window.addEventListener('scroll', () => {
    header.classList.toggle('activar', this.window.scrollY > 0)
})

document.getElementById('boton-crear').addEventListener('click', function(){
    const form=document.getElementById('container-crear');
    form.classList.toggle('mostrar');
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
        divAlerta.textContent = "Fallo al crear el paquete"
        document.body.appendChild(divAlerta)
        divAlerta.style.display =  "block"
        setTimeout(function(){
            divAlerta.style.display = "none"
            document.body.removeChild(divAlerta)
        }, 3500)
        console.log(err)
    })
     
    
})
const paquetesContainer = document.getElementById('mostrar')

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
        <p>Vehiculo asignado: no</p>
        <br>
        <p>Fecha de modificación: ${fechaModificacion}</p>
        <br>
        <p>Dirección destino: ${direccionDestino}</p>
    
    `

    async function obtenerInformacionDePaquete(idPaquete){
        const response = await fetch(`${serverUrls.almacenes}/api/v1/paquetes/${idPaquete}`)
        return await response.json()
    }
}