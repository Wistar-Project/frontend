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
            const p = document.createElement('p')
            p.textContent = lote.id
            lotesContainer.appendChild(p)
            lotesContainer.appendChild(p).classList.toggle('lotes-creados')
            lotesContainer.appendChild(p).style.cursor = "pointer"
            lotesContainer.appendChild(p).style.margin = "20px"
            lotesContainer.appendChild(p).style.width1 = "100%"
            
        })
    }
 
}


obtenerYMostrarLotes();