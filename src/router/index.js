import Vue from "vue"
import VueRouter from "vue-router"

const index = () => import('../page/index')

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
        }
    ]
})

export default router