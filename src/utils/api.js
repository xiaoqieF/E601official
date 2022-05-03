import {axios} from "@/utils/request";

const api = {
    signup: 'public/signup',
    uploadAvatar: axios.defaults.baseURL + 'public/signup/upload',
    login: 'public/login',
}

export default api

export function signup(data) {
    return axios({
        url: api.signup,
        method: 'post',
        data: data
    })
}

export function login(data) {
    return axios({
        url: api.login,
        method: 'post',
        data: data
    })
}