function daysToMiliseconds(days){
    const MILISECONDS_IN_A_SECOND = 1000
    const SECONDS_IN_A_MINUTE = 60
    const MINUTES_IN_AN_HOUR = 60
    const HOURS_IN_A_DAY = 24
    return days * HOURS_IN_A_DAY * MINUTES_IN_AN_HOUR * SECONDS_IN_A_MINUTE * MILISECONDS_IN_A_SECOND
}

export function setCookie(name, value, expirationDays) {
    const date = new Date()
    date.setTime(date.getTime() + daysToMiliseconds(expirationDays))
    const expires = `expires=${date.toUTCString()}`
    document.cookie = `${name} = ${value}; ${expires}; path=/`
}

export function getCookie(cname) {
    let name = cname + "="
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ""
}

export function deleteCookie(name){
  setCookie(name, "", "Thu, 01 Jan 1970 00:00:00 UTC")
}