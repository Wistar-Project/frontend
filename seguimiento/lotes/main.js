

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
    mostrarInformacionDeLote(data)
})

const loteInfo = document.getElementById("informacion")

async function mostrarInformacionDeLote(idLote){
    const { 
        estado, 
        camionAsignado, 
        conductorAsignado, 
        destino 
    } = await obtenerInformacionDeLote(idLote)

    loteInfo.innerHTML = `
        <legend>Información</legend>
        <br>
        <p> Id del lote: ${idLote}</p>
        <br>
        <p> estado: ${estado}</p>
        <br>
        <p>Vehiculo asignado: ${camionAsignado}</p>
        <br>
        <p>Conductor a cargo: ${conductorAsignado}</p>
        <br>
        <p>Destino: ${destino}</p>
          `
    async function obtenerInformacionDeLote(idLote){
        const response = await fetch(`https://localhost:8003/api/v1/lote/${idLote}`)
        return await response.json()
    }
}