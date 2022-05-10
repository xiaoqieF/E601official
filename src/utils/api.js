import {axios} from "@/utils/request";

const api = {
    signup: 'public/signup/',
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
    getBlogsByUserId: `private/allBlogs/`,
    uploadFirstPicture: axios.defaults.baseURL + 'private/blog/firstPicture',
    removeFirstPicture: 'private/blog/firstPicture/',
    addBlog: 'private/blog',
    deleteBlog: `private/blog/`,
    getRawBlogById: `private/blog/`,
    updateBlog:'private/blog',
    uploadPicture:axios.defaults.baseURL + 'private/album/picture/',
    removePicture:'/private/album/picture/',
    addAlbum: 'private/album',
    getAlbums: 'private/allAlbums/',
    deleteAlbum: 'private/album/',
    getAlbumById: 'private/album/',
    updateAlbum: 'private/album',
    getAllBlogs: 'public/allBlogs/',
    getAllAlbums: 'public/allAlbums',
    getAllUsers: 'public/allUsers',
    getRenderedBlogById: 'public/blog/',
    uploadBlogPicture: 'private/blog/blogPictures',
    getCommentsByBlogId: 'public/comment/',
    addComment: 'private/comment'
}

export default api

// 注册用户接口
export function signup(data, authCode) {
    return axios({
        url: api.signup + authCode,
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

// 删除博客
export function deleteBlog(blogId) {
    return axios({
        url: api.deleteBlog + blogId,
        method: 'delete',
    })
}

// 根据博客id获取博客内容
export function getRawBlogById(blogId) {
    return axios({
        url: api.getRawBlogById + blogId,
        method: 'get'
    })
}

// 更新博客
export function updateBlog(blog) {
    return axios({
        url: api.updateBlog,
        method: 'put',
        data: blog
    })
}

// 添加相册
export function addAlbum(album) {
    return axios({
        url: api.addAlbum,
        method: 'post',
        data: album
    })
}

// 删除图片
export function removePicture(userId, fileName) {
    return axios({
        url: api.removePicture + userId + "/" +fileName,
        method: 'delete'
    })
}

// 根据用户ID获取相册
export function getAlbums(userId) {
    return axios({
        url: api.getAlbums + userId,
        method: 'get'
    })
}

// 根据相册id删除相册
export function deleteAlbum(albumId) {
    return axios({
        url: api.deleteAlbum + albumId,
        method: 'delete'
    })
}

// 根据相册id获取相册
export function getAlbumById(albumId) {
    return axios({
        url: api.getAlbumById + albumId,
        method: 'get'
    })
}

// 更新相册
export function updateAlbum(album) {
    return axios({
        url: api.updateAlbum,
        method: 'put',
        data: album
    })
}

// 获取全部博客（分页形式）
export function getAllBlogs(queryInfo) {
    return axios({
        url: api.getAllBlogs,
        method: 'get',
        params: queryInfo
    })
}

// 获取全部用户的全部相册
export function getAllAlbums() {
    return axios({
        url: api.getAllAlbums,
        method: 'get',
    })
}

// 获取所有用户信息
export function getAllUsers() {
    return axios({
        url: api.getAllUsers,
        method: 'get'
    })
}

// 获取html形式的博客
export function getRenderedBlogById(blogId) {
    return axios({
        url: api.getRenderedBlogById + blogId,
        method: 'get'
    })
}

// 上传文章内的图片
export function uploadBlogPicture(data) {
    return axios({
        url: api.uploadBlogPicture,
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': window.sessionStorage.getItem('token')
        }
    })
}

// 获取博客评论
export function getCommentsByBlogId(blogId) {
    return axios({
        url: api.getCommentsByBlogId + blogId,
        method: 'get',
    })
}

// 添加评论
export function addComment(comment) {
    return axios({
        url: api.addComment,
        method: 'post',
        data: comment
    })
}