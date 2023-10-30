document.getElementById('boton-buscar').addEventListener('click', function(){
    const form=document.getElementById('container-buscar');
    form.classList.toggle('mostrar');
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    document.body.style.backdropFilter = 'grayscale(1)'
    header.style.filter = 'grayscale(1)'
    footer.style.filter = 'grayscale(1)'
    
})
document.getElementById('cerrar').addEventListener('click' , function(){
    const form=document.getElementById('container-buscar');
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    form.classList.toggle('mostrar');
    document.body.style.backdropFilter = 'grayscale(0)'
    header.style.filter = 'grayscale(0)'
    footer.style.filter = 'grayscale(0)'
})