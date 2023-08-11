const header= document.querySelector('header')

window.addEventListener('scroll', () => {
    header.classList.toggle('activar', this.window.scrollY > 0)
})

function crearPaquete(){
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
    fetch("http://localhost:8000/api/v1/paquetes", {
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
        const response = await fetch('http://localhost:8000/api/v1/paquetes')
        return await response.json()
    }

    function mostrarPaquetes(paquetes){
        paquetes.map(paquete => {
            const p = document.createElement('p')
            p.textContent = paquete.id
            paquetesContainer.appendChild(p)
            paquetesContainer.appendChild(p).classList.toggle('paquetes-creados')
            paquetesContainer.appendChild(p).style.cursor = "pointer"
            paquetesContainer.appendChild(p).style.margin = "20px"
            paquetesContainer.appendChild(p).style.width1 = "100%"
            
        })
    }
 
}
obtenerYMostrarPaquetes()