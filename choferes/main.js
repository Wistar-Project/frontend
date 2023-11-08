const todos = document.getElementById('mostrar-todos')
const pendientes = document.getElementById('mostrar-pendientes')
pendientes.addEventListener('click', function(){
    todos.style.display='flex'
    pendientes.style.display='none'
})
todos.addEventListener('click', function(){
    todos.style.display='none'
    pendientes.style.display='flex'
})

const checkPersonalizado = document.getElementById('entrega')
const check = document.getElementById('check')
const listo = document.getElementById('listo')
var activado =false
checkPersonalizado.addEventListener('click',function(){
    activado = !activado
    if(activado){
        check.checked = true
        listo.style.display ='block'   
    }else{
        check.checked = false
        listo.style.display = 'none'

    }
    })
    const mapaContenedor = document.getElementById('mapa')
    mapaContenedor.innerHTML = `
        <iframe
            width="90%"
            height="90%"
            style="border:0;margin:25px"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDpUoy6VuYXwuO7qHE7CR3P84UHgiEdV68 
                &q=esi-buceo">
        </iframe>
        `