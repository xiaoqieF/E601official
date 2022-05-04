import {axios} from "@/utils/request";

const api = {
    signup: 'public/signup',
    uploadAvatar: axios.defaults.baseURL + 'public/signup/upload',
    login: 'public/login',
    getUserById: `public/user/`,
    getUserByIdPrivate: `private/user/`,
    updateUser: `private/user/`,
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

export function getUserById(id) {
    return axios({
        url: api.getUserById + id,
        method: 'get',
    })
}

export function getUserByIdPrivate(id) {
    return axios({
        url: api.getUserByIdPrivate + id,
        method: 'get',
    })
}

export function updateUser(id, data) {
    return axios({
        url: api.updateUser + id,
        method: 'put',
        data: data
    })
}