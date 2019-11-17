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
    // 在线问答组界限 ----------
    {
        // 在线问答首页
        path: '/questions',
        component: () => import('@/views/Wrapper.vue'),
        children: [
            {
                path: '/',
                name: 'Questions',
                component: () => import('@/views/menus/questions/index.vue')
            },
            {
                path: 'questions-specific/:id',
                name: 'QuestionSpecific',
                props: true,
                component: () => import('@/views/menus/questions/specificQuestion.vue')
            },
            {
                path: 'questions-setting',
                name: 'QuestionSetting',
                component: () => import('@/views/menus/questions/settingQuestion.vue')
            }
        ]
    },

    // 在线问答组界限 ---------- [完]
    // 新闻管理组界限 -----------
    {
        path: '/news',
        component: () => import('@/views/Wrapper.vue'),
        children: [
            {
                // 新闻管理页面
                path: '/',
                name: 'News',
                component: () => import('@/views/menus/news')
            },
            {
                // 创建新闻页面
                path: 'create',
                name: 'CreateNews',
                component: () => import('@/views/menus/news/CreateNews.vue')
            }
        ]
    },
    // 新闻管理组界限 ----------- [完]

    // 失物招领组界限 ---------
    {
        // 失物招领页面
        path: '/lost-and-found',
        component: () => import('@/views/Wrapper.vue'),
        children: [
            {
                path: '/',
                name: 'LostAndFound',
                component: () => import('@/views/menus/lost-and-found')
            }
        ]
    },
    // 失物招领组界限 --------- [完]
    // 值班管理组界限 ----------
    {
        // 值班管理页面
        path: '/duty-scheduling',
        component: () => import('@/views/Wrapper.vue'),
        children: [{
            path: '/',
            name: 'DutyScheduling',
            component: () => import('@/views/menus/duty-scheduling')
        }]
    },
    // 值班管理组界限 ---------- [完]
    // 文件分享组界限 ----------
    {
        // 文件分享页面
        path: '/file-share',
        component: () => import('@/views/Wrapper.vue'),
        children: [
            {
                path: '/',
                name: 'FileShare',
                component: () => import('@/views/menus/file-share/index.vue')
            },
            {
                path: 'setting-share',
                name: 'SettingShare',
                component: () => import('@/views/menus/file-share/settingShare.vue')
            }
        ]
    }
    // 文件分享组界限 ---------- [完]
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
