import { serverUrls } from '../../utils/consts.js'
import { getCookie } from '../../utils/cookieHelper.js' 
document.getElementById('boton-buscar').addEventListener('click', function(){
    const form=document.getElementById('container-buscar');
    form.classList.toggle('mostrar');
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    const botonBuscar = document.getElementById('boton-buscar')
    const botonVolver = document.getElementById('volver')
    const general = document.getElementById('general')
    general.style.filter = 'grayscale(1)'
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
    const botonBuscar = document.getElementById('boton-buscar')
    const botonVolver = document.getElementById('volver')
    const general = document.getElementById('general')
    general.style.filter = 'grayscale(0)'
    botonVolver.style.filter = 'grayscale(0)'
    botonBuscar.style.filter = 'grayscale(0)'
    document.body.style.backdropFilter = 'grayscale(0)'
    header.style.filter = 'grayscale(0)'
    footer.style.filter = 'grayscale(0)'
    botonBuscar.style.pointerEvents = 'all'
    botonVolver.style.pointerEvents = 'all'
    form.classList.toggle('mostrar');
})

document.querySelector('form')
.addEventListener('submit', e =>{
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )
    console.log(JSON.stringify(data))
    var id = data.buscar
    console.log(data)
    mostrarInformacionDePaquete(id)
    const form=document.getElementById('container-buscar');
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    const botonBuscar = document.getElementById('boton-buscar')
    const botonVolver = document.getElementById('volver')
    const general = document.getElementById('general')
    general.style.filter = 'grayscale(0)'
    botonVolver.style.filter = 'grayscale(0)'
    botonBuscar.style.filter = 'grayscale(0)'
    document.body.style.backdropFilter = 'grayscale(0)'
    header.style.filter = 'grayscale(0)'
    footer.style.filter = 'grayscale(0)'
    botonBuscar.style.pointerEvents = 'all'
    botonVolver.style.pointerEvents = 'all'
    form.classList.toggle('mostrar');
    
})

const paqueteInfo = document.getElementById("informacion")

async function mostrarInformacionDePaquete(id){
    const { 
        destino,
        paqueteId,
        vehiculoAsignado,
        conductor,
        estado,
        loteAsignado
    } = await obtenerInformacionDePaquete(id)
    paqueteInfo.innerHTML = `
    <p> Id del paquete: ${paqueteId}</p>
    <p> Estado: ${estado}</p>
    <p>Vehiculo asignado: ${vehiculoAsignado}</p>
    <p>Conductor a cargo: ${conductor}</p>
    <p>Destino: ${destino}</p>
      `
      paqueteInfo.style.height = '390px'
    if(loteAsignado)
        paqueteInfo.innerHTML = paqueteInfo.innerHTML + `<br>
        <p>Lote asignado: ${loteAsignado} </p>`
    async function obtenerInformacionDePaquete(id){
        console.log(serverUrls.transito)
        const response = await fetch(`${serverUrls.transito}/api/v1/paquete/${id}`,{
            headers : {
                "Content-Type": "application/json" , 
                "Authorization":`Bearer ${getCookie("token")}`,   
            }
        }
        )
        return await response.json()
    }
}