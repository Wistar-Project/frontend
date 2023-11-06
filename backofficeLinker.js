import { serverUrls } from "./utils/consts.js"
import { getCookie } from "./utils/cookieHelper.js"

document.getElementById('administracion-container').addEventListener('click', () => {
    window.location.href = `${serverUrls.backoffice}?token=${getCookie('token')}`
})