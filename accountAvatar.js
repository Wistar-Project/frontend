import { deleteCookie, getCookie, setCookie } from "./utils/cookieHelper.js"
import { serverUrls } from "./utils/consts.js"

updateAvatar()

async function updateAvatar(){
    if(!getCookie('name'))
        setCookie('name', await getName())
    
    const name = getCookie('name')
    changeAvatar(name)

    async function getName(){
        const token = getCookie('token')
        if(!token) return
        const response = await fetch(`${serverUrls.oauth}/api/v1/persona`, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const { nombre, apellido } = await response.json()
        return `${nombre} ${apellido}`
    }

    async function changeAvatar(name){ 
        const avatar = document.getElementById('account-avatar')
        const urlParams = new URLSearchParams({ 
            name, 
            bold: true,
            color: "fff",
            background: "000"
        })
        avatar.src = `https://ui-avatars.com/api?${urlParams}`
    }
}

const opcionesUsuario = document.getElementById('opciones-usuario')
const accountAvatar = document.getElementById('account-avatar')
accountAvatar.addEventListener('click', () => {
    opcionesUsuario.classList.toggle('mostrar')
})

document.getElementById('boton-cerrar-sesion').addEventListener('click', () => {
    fetch(`${serverUrls.oauth}/api/v1/logout`, {
        headers: {
            Authorization:  `Bearer ${getCookie('token')}`
        }
    })
    deleteCookie('token')
    deleteCookie('name')
    window.location.href = '/login'
})