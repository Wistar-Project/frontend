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