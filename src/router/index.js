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
    {
        // 新闻管理页面
        path: '/newsMange',
        component: () => import('@/views/Wrapper.vue'),
        children: [{
            path: '/',
            name: 'Newsmange',
            component: () => import('@/views/menus/newsMange/index.vue')
        }]
    },
    {
        // 新闻创建页面
        path: '/newsMange',
        component: () => import('@/views/Wrapper.vue'),
        children: [{
            path: '/',
            name: 'Createnews',
            component: () => import('@/views/menus/newsMange/createnews.vue')
        }]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
