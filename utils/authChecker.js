import { getCookie } from "./cookieHelper.js"

if(!getCookie('token')) window.location.href = '/login'