import { getCookie } from "./utils/cookieHelper.js"

if(!getCookie('token')) window.location.href = '/login'