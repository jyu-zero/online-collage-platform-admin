<template>
    <div class="wrapper">
        <!-- 顶部导航栏 -->
        <header>
            <h1>线上学院后台管理系统</h1>
            <el-dropdown @command="handleProfileOperation">
                <span class="el-dropdown-link">
                    {{name}}
                    {{account}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
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
import { prefix, userApi } from '@/api'
import { Menu, MenuItem, Dropdown, DropdownMenu, DropdownItem } from 'element-ui'
export default {
    components: {
        [Menu.name]: Menu,
        [MenuItem.name]: MenuItem,
        [Dropdown.name]: Dropdown,
        [DropdownMenu.name]: DropdownMenu,
        [DropdownItem.name]: DropdownItem
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
                }
            ]
        }
    },
    methods: {
        goToMenu(menuItem) {
            this.$router.push({ name: menuItem.routeName })
        },
        gotoMainPage(){
            this.$router.push({ name: 'overview' })
        },
        handleProfileOperation(command){
            switch(command){
                case 'login':
                    this.login()
                    break
                default:
                    break
            }
        },
        logout(){
            this.$axios.post(prefix.api + userApi.logout).then((response)=>{
                this.$route.push({ name: 'Login' })
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
</style>
