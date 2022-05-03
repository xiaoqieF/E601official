import axios from "axios";
const baseUrl = 'http://127.0.0.1:8086/'

const service = axios.create({
    baseURL: baseUrl,
    timeout: 6000  // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(config => {
    let token = window.sessionStorage.getItem('token')
    if (token) {
        config.headers.Authorization = token
    }
    return config
})

// 相应拦截器
service.interceptors.response.use(response => {
    return response.data
}, error => {
    console.log(error.response)
    return Promise.reject(error)
})

export {service as axios}