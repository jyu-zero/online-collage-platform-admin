<template>
    <div class="news-manage">
        <!-- 新闻页面 -->
        <el-menu class="button">
            <el-button id="button" type="primary" @click="gotoCreateNews">创建新闻</el-button>
            <el-button id="button" type="danger" @click="deleted">删除</el-button>
            <el-button id="button" type="primary" @click="top">置顶</el-button>
            <el-button id="button" type="primary" @click="untop">取消置顶</el-button>
            <div class="search">
                <el-input placeholder="请输入内容" v-model="keyWords" class="input-with-select">
                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="新闻标题" value="1"></el-option>
                        <el-option label="撰稿人" value="2"></el-option>
                        <el-option label="创建时间" value="3"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="search(1)"></el-button>
                </el-input>
            </div>
        </el-menu>
        <!-- 新闻页面 【完】-->

        <!-- 新闻列表 -->
        <div class="main">
            <el-checkbox-group id="main" v-model="checked">
                <div class="news-item" v-for="newsItem of newsList" :key="newsItem.title">
                    <!-- 勾选框还需修改 -->
                    <el-checkbox class="my-checkbox" :label="newsItem.news_id"></el-checkbox>
                    <p class="title">{{newsItem.news_title}}</p>
                    <p class="top">{{newsItem.is_pinned}}</p>
                    <p class="draft">{{newsItem.is_draft}}</p>
                    <p class="time">{{newsItem.created_at}}</p>
                    <p class="writer">撰稿人：{{newsItem.author}}</p>
                    <p class="reviewer" v-show="isShow">审稿人：{{newsItem.publisher}}</p>
                    <!-- <p class="publish">{{newsItem.is_published}}</p> -->
                    <font-awesome-icon class="eye" icon="eye" />
                    <p class="views">{{newsItem.views}}</p>
                    <div class="editer">
                        <el-button id="button" type="primary" v-show="newsItem.isShow1" @click="publish(newsItem.news_id)">{{newsItem.is_published}}</el-button>
                        <el-button id="edit" type="text" icon="el-icon-edit" @click="edit(newsItem.news_id, newsItem.news_title, newsItem.created_at)">编辑</el-button>
                        <template>
                            <el-button id="delete" type="text" @click="singalDeleted(newsItem.news_id)">删除</el-button>
                        </template>
                    </div>
                </div>
            </el-checkbox-group>
        </div>
        <!-- 新闻列表 【完】-->
    
        <!-- TODO -->
        <div class="page">
            <el-pagination
                :hide-on-single-page="true"
                :page-count="pageCount"
                @current-change="getNewsList"
                layout="prev, pager, next">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { prefix, responseHandler, newsApi } from '@/api'
import { Button, Menu, Input, Checkbox, CheckboxGroup, Link, Pagination, Select, Option } from 'element-ui'

export default {
    name: 'News',
    components: {
        [Button.name]: Button,
        [Menu.name]: Menu,
        [Input.name]: Input,
        [Checkbox.name]: Checkbox,
        [CheckboxGroup.name]: CheckboxGroup,
        [Link.name]: Link,
        [Pagination.name]: Pagination,
        [Select.name]: Select,
        [Option.name]: Option
    },
    data(){
        return {
            input: '',
            keyWords: '',
            select: '',
            checked: [],
            isShow: false,
            isShow1: true,
            newsList: [],
            newsLists: [],
            pageCount: 1,
            active1: true,
            newsId: '', // 新闻id
            newsIds: [] // 单独删除新闻的id
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
        search(page = 1){
            this.$axios
                .get(prefix.api + newsApi.search, {
                    params: {
                        page,
                        select: this.select,
                        keyWords: this.keyWords
                    }
                })
                .then(response => {
                    this.newsList = ''
                    this.newsList = response.data.data.news
                    this.pageCount = response.data.data.pageCount
                    this.isPublish()
                    this.isPinned()
                    this.isDraft()
                    console.log(this.select)
                    console.log(this.keyWords)
                })
        },
        // 置顶新闻
        top(){
            console.log(this.checked)
            this.$axios
                .post(prefix.api + newsApi.top, {
                    newsId: this.checked
                })
                .then(response => {
                    this.getNewsList(1)
                })
        },
        // 取消置顶
        untop(){
            this.$axios
                .post(prefix.api + newsApi.untop, {
                    newsId: this.checked
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
                    this.newsList[i].isShow = true
                }else{
                    this.newsList[i].is_published = '发布'
                    this.newsList[i].isShow = false
                }
            }
        },
        // 判断是否置顶
        isPinned() {
            for(let i = 0; i <= (this.newsList.length - 1); i++){
                if(this.newsList[i].is_pinned === 1) {
                    this.newsList[i].is_pinned = '(置顶)'
                }else{
                    this.newsList[i].is_pinned = ''
                }
            }
        },
        // 判断是否草稿
        isDraft() {
            for(let i = 0; i <= (this.newsList.length - 1); i++){
                if(this.newsList[i].is_draft === 1) {
                    this.newsList[i].is_draft = '(草稿)'
                    this.$set(this.newsList[i], 'isShow1', false)
                    // console.log(this.newsList[i].isShow1)
                }else{
                    this.newsList[i].is_draft = ''
                    this.$set(this.newsList[i], 'isShow1', true)
                }
            }
        },

        // 删除新闻
        deleted(){
            this.$axios
                .post(prefix.api + newsApi.deleted, {
                    newsId: this.checked
                })
                .then(response => {
                    this.getNewsList(1)
                })
        },
        // 单独删除新闻
        singalDeleted(newsId){
            this.newsIds.push(newsId)
            this.$axios
                .post(prefix.api + newsApi.deleted, {
                    newsId: this.newsIds
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
                    this.isDraft()
                })
        },
        // 发布新闻
        publish(newsId){
            this.$axios
                .post(prefix.api + newsApi.publish, {
                    newsId: newsId
                })
                .then(response => {
                    this.getNewsList(1)
                })
        },

        // 编辑新闻
        edit(newsId, newsTitle, newsTime){
            this.$router.push({
                name: 'EditorNews',
                params: {
                    id: newsId
                }
            })
        },

        // 单独删除一条新闻
        // TODO
        open(){
            this.$confirm('此操作将永久删除该条新闻，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.singalDeleted()
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

            /deep/ .el-select .el-input {
                width: 100px;
            }
        }

        #button{
            padding: 8px 10px;
        }
    }

    .main{
        flex: 1;

        #main{
            font-size: 16px
        }
    }

    .my-checkbox{
        /deep/ .el-checkbox__label{
            display: none;
        }
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

        .eye{
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
