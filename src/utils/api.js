import {axios} from "@/utils/request";

const api = {
    signup: 'public/signup',
    uploadAvatar: axios.defaults.baseURL + 'public/signup/upload',
}

export default api

export function signup(data) {
    return axios({
        url: api.signup,
        method: 'post',
        data: data
    })
}

