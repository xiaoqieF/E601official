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
const manage = () => import('../page/manage')
const signUp = () => import('../page/signUp')
const edit = () => import('../page/edit')
const newAlbum = () => import('../page/newAlbum')
const editAlbum = () => import('../page/editAlbum')
const personPage = () => import('../page/personPage')

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
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
                {
                    path: '/person/:userId',
                    component: personPage,
                },
            ]
        },
        {
            path: '/admin',
            component: login,
        },
        {
            path: '/signUp',
            component: signUp,
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
                {
                    path: 'manage',
                    component: manage,
                    meta: 'needAuth'
                },
                {
                    path: 'edit/:blogId',
                    component: edit,
                    meta: 'needAuth'
                },
                {
                    path: 'newAlbum',
                    component: newAlbum,
                    meta: 'needAuth'
                },
                {
                    path: 'editAlbum/:albumId',
                    component: editAlbum,
                    meta: 'needAuth'
                },
            ]
        }
    ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
    if (to.meta === 'needAuth' && !window.sessionStorage.getItem('token')) {
        return next('/admin')
    } else {
        return next()
    }
})

export default router