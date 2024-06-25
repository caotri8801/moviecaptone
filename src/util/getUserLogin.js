
// import { UserLogin } from "types"
import { LOCALE_USER_LOGIN_KEY } from "./settings/config"


export const getUserLogin = () => {
    const userLogin = localStorage.getItem(LOCALE_USER_LOGIN_KEY)
    
    if(!userLogin) return

    return JSON.parse(userLogin) 
}