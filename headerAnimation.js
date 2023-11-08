const nav = document.querySelector('header')

window.addEventListener('scroll', function(){
    nav.classList.toggle('activar', this.window.scrollY > 0)
})