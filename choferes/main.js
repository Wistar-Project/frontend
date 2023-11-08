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