import Vue from "vue"
import VueRouter from "vue-router"

const index = () => import('../page/index')
const home = () => import('../page/home')
const users = () => import('../page/users')

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
            ]
        }
    ]
})

export default router