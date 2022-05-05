import {axios} from "@/utils/request";

const api = {
    signup: 'public/signup',
    uploadAvatar: axios.defaults.baseURL + 'public/signup/upload',
    login: 'public/login',
    getUserById: `public/user/`,
    getUserByIdPrivate: `private/user/`,
    updateUser: `private/user/`,
    getCateByUserId: `public/categories/`,
    addCate: `private/categories/`,
    deleteCate: `private/categories/`,
    getTagsByUserId: `public/tags/`,
    addTag: `private/tags/`,
    deleteTag: `private/tags/`,
    getBlogsByUserId: `private/blog/`,
    uploadFirstPicture: axios.defaults.baseURL + 'private/blog/firstPicture',
    removeFirstPicture: 'private/blog/firstPicture/',
    addBlog: 'private/blog'
}

export default api

// 注册用户接口
export function signup(data) {
    return axios({
        url: api.signup,
        method: 'post',
        data: data
    })
}

// 用户登录接口
export function login(data) {
    return axios({
        url: api.login,
        method: 'post',
        data: data
    })
}

// 获取用户信息接口(公开接口，不含用户密码)
export function getUserById(id) {
    return axios({
        url: api.getUserById + id,
        method: 'get',
    })
}

// 获取用户信息接口(私有接口，可获得用户密码)
export function getUserByIdPrivate(id) {
    return axios({
        url: api.getUserByIdPrivate + id,
        method: 'get',
    })
}

// 用户上传头像接口
export function updateUser(id, data) {
    return axios({
        url: api.updateUser + id,
        method: 'put',
        data: data
    })
}

// 获取某个用户的所有分类
export function getCateByUserId(userId) {
    return axios({
        url: api.getCateByUserId + userId,
        method: 'get'
    })
}

// 添加分类
export function addCate(userId, cateName) {
    return axios({
        url: api.addCate + userId,
        method: 'post',
        data: {
            name: cateName
        }
    })
}

// 删除分类
export function deleteCate(cateId) {
    return axios({
        url: api.deleteCate + cateId,
        method: 'delete',
    })
}

// 获取某个用户的所有标签
export function getTagsByUserId(userId) {
    return axios({
        url: api.getTagsByUserId + userId,
        method: 'get'
    })
}

// 添加标签
export function addTag(userId, tagName) {
    return axios({
        url: api.addTag + userId,
        method: 'post',
        data: {
            name: tagName
        }
    })
}

// 删除标签
export function deleteTag(tagId) {
    return axios({
        url: api.deleteTag + tagId,
        method: 'delete',
    })
}

// 获取用户的所有博客
export function getBlogsByUserId(userId, queryInfo) {
    return axios({
        url: api.getBlogsByUserId + userId,
        method: 'get',
        params: queryInfo
    })
}

// 删除文章首图
export function removeFirstPicture(relativePath) {
    return axios({
        url: api.removeFirstPicture + relativePath,
        method: 'delete',
    })
}

// 添加博客
export function addBlog(blog) {
    return axios({
        url: api.addBlog,
        method: 'post',
        data: blog
    })
}