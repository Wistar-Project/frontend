const nav = document.querySelector('header')

window.addEventListener('scroll', () => {
    nav.classList.toggle('activar', this.window.scrollY > 0)
})

function crearLoteYPaquete(){
    const form=document.getElementById('container-crear');
    form.classList.toggle('mostrar');
    
}

function asignarLoteYPaquete(){
    const asignar=document.getElementById('asignar');
    asignar.classList.toggle('ver');
}
function cerrarVentanaAsignar(){
    document.getElementById('asignar').classList.toggle("ver");
}

document.querySelector('form')
.addEventListener('submit', e =>{
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )
    console.log(JSON.stringify(data))
    fetch("http://localhost:8000/api/v1/lotes", {
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

const lotesContainer = document.getElementById('mostrar')

async function obtenerYMostrarLotes(){
    const lotes = await obtenerLotes()
    mostrarLotes(lotes)

    async function obtenerLotes(){
        const response = await fetch('http://localhost:8000/api/v1/lotes')
        return await response.json()
    }

    function mostrarLotes(lotes){
        lotes.map(lote => {
            const button = document.createElement('button')
            button.textContent = lote.id
            button.className = "loteBoton"
            button.addEventListener('click', () => {
                mostrarInformacionDeLote(lote)
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

function mostrarInformacionDeLote(lote){
    loteInfo.innerHTML = `
        <legend>Información</legend>
        <br>
        <p> Id del lote: ${lote.id}</p>
        <br>
        <p> Peso (kg):</p>
        <br>
        <p>Vehiculo asignado:</p>
        <br>
        <p>Fecha de modificación:</p>
        <br>
        <p>Dirección destino: ${lote.destino}</p>
        <br>
        <p>Cantidad de paquetes:</p>
    `
}