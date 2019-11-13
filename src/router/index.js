import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        // TODO: 首页应该设置为后台的首页
        path: '/',
        name: 'Test',
        component: () => import('@/views/Test.vue')
    },
    {
        // 登录页
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    },
    {
        // 概览页
        path: '/overview',
        component: () => import('@/views/Wrapper.vue'),
        children: [{
            path: '/',
            name: 'Overview',
            component: () => import('@/views/menus/overview/index.vue')
        }]
    },
    {
        // 账号管理页面
        path: '/accounts',
        component: () => import('@/views/Wrapper.vue'),
        children: [{
            path: '/',
            name: 'Accounts',
            component: () => import('@/views/menus/accounts/index.vue')
        }]
    },

    // 失物招领组界限 ---------
    {
        // 失物招领页面
        path: '/lost-and-found',
        component: () => import('@/views/Wrapper.vue'),
        children: [
            {
                path: '/',
                name: 'LostAndFound',
                component: () => import('@/views/menus/lost-and-found'),
                children: [
                    {
                        path: 'lost',
                        name: 'Lost',
                        component: () => import('@/views/menus/lost-and-found/pages/Lost.vue')
                    },
                    {
                        path: 'found',
                        name: 'Found',
                        component: () => import('@/views/menus/lost-and-found/pages/Found.vue')
                    }
                ]
            }
        ]
    }
    // 失物招领组界限 --------- [完]

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
