import { deleteCookie, getCookie } from "./utils/cookieHelper.js"
import { serverUrls } from "./utils/consts.js"

updateAvatar()

async function updateAvatar(){
    const name = await getName()
    if(!name) return
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
        if(!response.ok) return
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
const avatarLinkContainer = document.getElementById('avatar-a')
const token = getCookie('token')
avatarLinkContainer.addEventListener('click', () => {
    opcionesUsuario.classList.toggle('mostrar')
})

document.getElementById('boton-cerrar-sesion').addEventListener('click', () => {
    fetch(`${serverUrls.oauth}/api/v1/logout`, {
        headers: {
            Authorization:  `Bearer ${token}`
        }
    })
    deleteCookie('token')
    window.location.href = '/login'
})