const nav = document.querySelector('header')

window.addEventListener('scroll', () => {
    nav.classList.toggle('activar', this.window.scrollY > 0)
})