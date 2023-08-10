import { setCookie } from '../utils/cookieHelper.js'
import { client, serverUrls } from '../utils/consts.js'

const loginBtn = document.getElementById('iniciar-sesion-btn')
loginBtn.addEventListener('click', async () => {
    const emailInput = document.querySelector("#email")
    const passInput = document.querySelector("#contra")
    const response = await sendLoginRequest(emailInput.value, passInput.value)
    if(!response.ok) return showErrorMessage()
    const { access_token, expires_in } = await response.json()
    setCookie("token", access_token, expires_in)
})

async function sendLoginRequest(email, pass){
    return await fetch(`${serverUrls.oauth}/oauth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: email,
            password: pass,
            grant_type: "password",
            client_id: client.id,
            client_secret: client.secret
        })
    })
}

function showErrorMessage(){
    alert("Ha ocurrido un error al iniciar sesión.")
}