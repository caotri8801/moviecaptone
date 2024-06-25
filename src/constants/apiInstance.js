import axios from "axios"
import { TOKEN_CYBERSOFT } from "../util/settings/config"
import { getUserLogin } from "../util/getUserLogin"



export const apiIntance = 
 {
    create: (configDefault) => {
        const api = axios.create(configDefault)

        api.interceptors.request.use((config)=>{
            return {
                ...config,
                headers: {
                    TokenCybersoft: TOKEN_CYBERSOFT,
                    Authorization: 'Bearer ' + getUserLogin()?.content.accessToken || ''
              
                },
            } 
        })

        return api
    }
}