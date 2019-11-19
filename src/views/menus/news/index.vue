<template>
    <div class="news-manage">
        <!-- 新闻页面 -->
        <el-menu class="button">
            <el-button id="button" type="primary" @click="gotoCreateNews">创建新闻</el-button>
            <el-button id="button" type="primary">删除</el-button>
            <el-button id="button" type="primary" @click="top">置顶</el-button>
            <div class="search">
                <el-input
                    placeholder="请输入内容"
                    v-model="input">
                    <i slot="prefix" class="el-input__icon el-icon-search" @click="search"></i>
                </el-input>
            </div>
        </el-menu>
        <!-- 新闻页面 【完】-->

        <!-- 新闻列表 -->
        <div class="main">
            <div class="news-item" v-for="newsItem of newsList" :key="newsItem.title">
                <!-- 勾选框还需修改 -->
                <el-checkbox v-model="checked" :id="index" :value="id"></el-checkbox>
                <p class="title">{{newsItem.news_title}}</p>
                <!-- <p class="top">{{newsItem.is_pinned}}</p>
                <p class="draft">{{newsItem.is_draft}}</p> -->
                <p class="time">{{newsItem.created_at}}</p>
                <p class="writer">撰稿人：{{newsItem.author}}</p>
                <p class="reviewer">审稿人：{{newsItem.publisher}}</p>
                <!-- <p class="publish">{{newsItem.is_published}}</p> -->
                <i class="fa fa-eye" aria-hidden="true"></i>
                <p class="views">{{newsItem.views}}</p>
                <div class="editer">
                    <el-button id="button" type="text" @click="untop">{{newsItem.is_pinned}}</el-button>
                    <el-button id="button" type="primary" @click="publish">{{newsItem.is_published}}</el-button>
                    <el-link id="edit" icon="el-icon-edit" @click="edit">编辑</el-link>
                    <template>
                        <el-button id="delete" type="text" @click="open">删除</el-button>
                    </template>
                </div>
            </div>
        </div>
        <!-- 新闻列表 【完】-->
    
        <!-- TODO -->
        <div class="page">
            <el-pagination
                :hide-on-single-page="value"
                :page-count="pageCount"
                @current-change="getNewsList"
                layout="prev, pager, next">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { prefix, responseHandler, newsApi } from '@/api'
import { Button, Menu, Input, Checkbox, Link, Pagination } from 'element-ui'

export default {
    name: 'News',
    components: {
        [Button.name]: Button,
        [Menu.name]: Menu,
        [Input.name]: Input,
        [Checkbox.name]: Checkbox,
        [Link.name]: Link,
        [Pagination.name]: Pagination
    },
    data(){
        return {
            input: '',
            checked: false,
            isShow: false,
            newsLists: [2],
            newsUnpinLists: [2],
            news_delete_id: [2],
            news_publish_id: [],
            pageCount: 1,
            index: []
        }
    },
    created(){
        this.getNewsList()
    },
    methods: {
        gotoCreateNews(){
            this.$router.push({ name: 'CreateNews' })
        },
        // 搜索框
        // TODO
        search(){
            this.$axios
                .post(prefix.api + newsApi.search, {

                })
        },
        // 置顶新闻
        top(){
            this.$axios
                .post(prefix.api + newsApi.top, {
                    newsList: this.newsLists
                })
                .then(response => {
                    this.getNewsList(1)
                })
        },
        // 取消置顶
        untop(){
            this.$axios
                .post(prefix.api + newsApi.untop, {
                    newsUnpinList: this.newsUnpinLists
                })
                .then(response => {
                    this.getNewsList(1)
                })
        },

        // 判断是否发布
        isPublish: function() {
            for(let i = 0; i <= (this.newsList.length - 1); i++){
                if(this.newsList[i].is_published === 1) {
                    this.newsList[i].is_published = '取消发布'
                }else{
                    this.newsList[i].is_published = '发布'
                }
            }
        },
        // 判断是否置顶
        isPinned: function() {
            for(let i = 0; i <= (this.newsList.length - 1); i++){
                if(this.newsList[i].is_pinned === 1) {
                    this.newsList[i].is_pinned = '取消置顶'
                }else{
                    this.newsList[i].is_pinned = ''
                }
            }
        },

        // 删除新闻
        deleted(){
            this.$axios
                .post(prefix.api + newsApi.delete, {
                    news_id: this.news_delete_id
                })
                .then(response => {
                    this.getNewsList(1)
                })
        },
        // TODO
        // 获取新闻列表
        getNewsList(page = 1){
            this.$axios
                .get(prefix.api + newsApi.getNewsList, {
                    params: {
                        page
                    }
                })
                .then(response => {
                    if(!responseHandler(response.data, this)){
                        // TODO: 在这里处理错误
                        return {}
                    }
                    this.newsList = response.data.data.news
                    this.pageCount = response.data.data.pageCount
                    this.isPublish()
                    this.isPinned()
                })
        },
        // 发布新闻
        publish(){
            this.$axios
                .post(prefix.api + newsApi.publish, {
                    news_id: this.news_publish_id
                })
                .then(response => {
                    this.getNewsList(1)
                })
        },

        // 编辑新闻
        edit(){
            this.$router.push({ name: 'CreateNews' })
        },

        // 单独删除一条新闻
        open(){
            this.$confirm('此操作将永久删除该条新闻，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleted()
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        }
    }
}
</script>

<style lang="less" scoped>
.news-manage{
    height:100%;
    display: flex;
    flex-direction: column;
    margin: 20px;

    .button{
        display: flex;
        flex-direction: row;

        .search{
            margin-left: auto;
        }

        #button{
            padding: 8px 10px;
        }
    }

    .main{
        flex: 1;
    }

    .news-item{
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        border: 1px solid #ccc;
        padding: 6px;

        p{
            margin: 0 0 0 16px;
            font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';
            font-size: 14px;
        }

        i{
            margin-left: 16px;
        }

        .title{
            font-weight: 650;
            font-size: 18px;
            
        }
        .editer{
            margin-left: auto;
            text-align: center;

            #button{
                padding: 8px 10px;
                margin-left: 16px;
            }

            #edit{
                margin-left: 16px;
            }

            #delete{
                margin-left: 16px;
            }
        }
    }

    .page{
        text-align: center;
        
    }
}
</style>
