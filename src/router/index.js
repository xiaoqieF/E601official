import Vue from "vue"
import VueRouter from "vue-router"

const index = () => import('../page/index')
const home = () => import('../page/home')
const users = () => import('../page/users')
const about = () => import('../page/about')
const detail = () => import('../page/detail')
const login = () => import('../page/login')
const blogAdmin = () => import('../page/blogAdmin')
const publish = () => import('../page/publish')
const album = () => import('../page/album')


Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: index,
            children: [
                {
                    path: '',
                    component: home,
                },
                {
                    path: '/users',
                    component: users,
                },
                {
                    path: '/about',
                    component: about,
                },
                {
                    path: '/detail/:blogId',
                    component: detail,
                },
            ]
        },
        {
            path: '/admin',
            component: login,
        },
        {
            // 用户id作为路径参数
            path: '/admin/:id',
            component: blogAdmin,
            children: [
                {
                    path: 'publish',
                    component: publish,
                    meta: 'needAuth'
                },
                {
                    path: 'album',
                    component: album,
                    meta: 'needAuth'
                },
            ]
        }
    ]
})

export default router