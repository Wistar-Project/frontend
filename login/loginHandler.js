import { setCookie } from '../utils/cookieHelper.js'
import { client, serverUrls } from '../utils/consts.js'

document.querySelector('form').addEventListener('submit', async e => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    const response = await sendLoginRequest(data)
    if(!response.ok) return showErrorMessage()
    const { access_token, expires_in } = await response.json()
    setCookie("token", access_token, expires_in)
    window.location.href = '/'
})

async function sendLoginRequest(data){
    return await fetch(`${serverUrls.oauth}/oauth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...data,
            grant_type: "password",
            client_id: client.id,
            client_secret: client.secret
        })
    })
}

function showErrorMessage(){
    const errorContainer = document.getElementById('error-container')
    errorContainer.className = "mostrar"
}

const passwordElement = document.getElementById("contra")

document.getElementById('show-pass-btn').addEventListener('click', event => {
    const { checked } = event.target
    if(checked)
        return passwordElement.type = "text"
    passwordElement.type = "password"
})