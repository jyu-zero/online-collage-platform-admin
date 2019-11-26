<template>
    <div class="wrapper">
        <!-- 顶部导航栏 -->
        <header>
            <h1>线上学院后台管理系统</h1>
            <a href="http://localhost:8082/">前往官网</a>
            <el-dropdown @command="logout">
                <span class="el-dropdown-link">
                    <div class="get-account-box">
                        <span>{{name}}</span>
                        <span>{{account}}</span>
                    </div>
                    <i class="el-icon-arrow-down el-icon--right el-dropdown-link"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command>注销</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </header>
        <!-- 顶部导航栏 [完] -->
        <div class="wrapper-body">
            <el-menu
                :default-active="currentRouteName"
                class="menu"
                background-color="#22466f"
                text-color="#779cc6"
                active-text-color="#fff">
                <el-menu-item @click="goToMenu(menuItem)" v-for="(menuItem,index) of menus" :index="menuItem.routeName" :key="index" :route="menuItem.route">
                    <span slot="title">{{menuItem.title}}</span>
                </el-menu-item>
            </el-menu>
            <main>
                <router-view/>
            </main>
        </div>
    </div>
</template>

<script>
import { prefix, responseHandler, userApi } from '@/api'
import { Menu, MenuItem, Dropdown, DropdownMenu, DropdownItem, Message } from 'element-ui'
export default {
    components: {
        [Menu.name]: Menu,
        [MenuItem.name]: MenuItem,
        [Dropdown.name]: Dropdown,
        [DropdownMenu.name]: DropdownMenu,
        [DropdownItem.name]: DropdownItem,
        [Message.name]: Message
    },
    name: 'Wrapper',
    computed: {
        currentRouteName(){
            return this.$route.name
        }
    },
    data() {
        return {
            name: '',
            account: '',
            menus: [
                {
                    title: '概览',
                    routeName: 'Overview'
                },
                {
                    title: '后台账号管理',
                    routeName: 'Accounts'
                },
                {
                    title: '新闻管理',
                    routeName: 'News'
                },
                {
                    title: '失物招领',
                    routeName: 'LostAndFound'
                },
                {
                    title: '在线问答',
                    routeName: 'Questions'
                },
                {
                    title: '值班管理',
                    routeName: 'DutyScheduling'
                },
                {
                    title: '资料共享',
                    routeName: 'FileShare'
                }
            ]
        }
    },
    methods: {
        goToMenu(menuItem) {
            this.$router.push({ name: menuItem.routeName })
        },
        getLoginAccount(){
            this.$axios.get(prefix.api + userApi.getLoginAccount).then((response)=>{
                console.log(response)
                if(!responseHandler(response.data, this)){
                // 在这里处理错误
                    Message.error('请求失败')
                }
                Message.success('请求成功')
            })
        },
        logout(){
            this.$axios.post(prefix.api + userApi.logout).then((response)=>{
                if(!responseHandler(response.data, this)){
                // 在这里处理错误
                    Message.error('请求失败')
                }
                Message.success('请求成功')
                this.$router.push({ name: 'Login' })
            })
        }

    }
}
</script>

<style lang="less" scoped>
.wrapper{
    height:100%;
    display: flex;
    flex-direction: column;

    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height:60px;
        padding: 0 20px;
        background:#5e91fa;
        color:#fff;
        h1{
            margin:0;
            font-size:20px;
        }
        a{
            margin-left: 520px;
        }
    }

    .wrapper-body{
        flex: 1;
        display: flex;
        overflow: hidden;

        .menu{
            width:200px;
            height:100%;
            font-family: 'Source Han Sans CN',sans-serif;
            font-weight: normal;
            margin: 0;
        }

        main{
            flex:1;
            height:100%;
            overflow: auto;
        }
    }
}
.el-dropdown-link{
    display: flex;
}
.get-account-box{
    display: flex;
    flex-direction:column;
}

</style>
