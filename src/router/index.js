import Vue from "vue"
import VueRouter from "vue-router"

const index = () => import('../page/index')
const home = () => import('../page/home')

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
                }
            ]
        }
    ]
})

export default router