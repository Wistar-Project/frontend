import { serverUrls } from "./utils/consts.js";
import { getCookie, setCookie } from "./utils/cookieHelper.js";

const rol = await obtenerRol()
if(rol === "funcionario") window.location.href = "almacen"
if(rol === "conductor") window.location.href = "choferes"


async function obtenerRol(){
    if(getCookie('rol')) return getCookie('rol')
    const response = await fetch(`${serverUrls.oauth}/api/v1/rol`, {
        headers: {
            Authorization: `Bearer ${getCookie('token')}`
        }
    })
    const rol = await response.text()
    setCookie('rol', rol)
    return rol
}