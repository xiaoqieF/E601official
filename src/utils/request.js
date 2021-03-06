import axios from "axios";
import Vue from "vue";

let baseUrl;
if (process.env.NODE_ENV === 'production') {
    baseUrl = 'http://e601.top:8086/'
} else {
    baseUrl = 'http://localhost:8086/'
}

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
    if(response.data.code === 506) {
        Vue.prototype.$message.error("token超时，请重新登录！");
    }
    return response.data
}, error => {
    console.log(error.response)
    return Promise.reject(error)
})

export {service as axios}