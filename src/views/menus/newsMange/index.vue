<template>
    <div class="news-mange">
        <!-- 新闻页面 -->
        <el-menu class="button">
            <el-button id="button" type="primary" @click="createnews">创建新闻</el-button>
            <el-button id="button" type="primary">删除</el-button>
            <el-button id="button" type="primary">置顶</el-button>
            <div class="search">
                <el-input
                    placeholder="请输入内容"
                    v-model="input">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </div>
        </el-menu>
        <!-- 新闻页面 【完】-->

        <!-- 新闻列表 -->
        <div class="main">
            <div class="news-item" v-for="newsItem of newsList" :key="newsItem.title">
                <!-- 勾选框还需修改 -->
                <el-checkbox v-model="checked"></el-checkbox>
                <p class="title">{{newsItem.title}}</p>
                <p class="top">{{newsItem.top}}</p>
                <p class="draft">{{newsItem.draft}}</p>
                <p class="time">{{newsItem.time}}</p>
                <p class="writer">撰稿人：{{newsItem.writer}}</p>
                <p class="reviewer">审稿人：{{newsItem.reviewer}}</p>
                <p class="publish">{{newsItem.publish}}</p>
                <i class="fa fa-eye" aria-hidden="true"></i>
                <p class="views">{{newsItem.views}}</p>
                <div class="editer">
                    <el-button id="button" type="primary">发布</el-button>
                    <el-link id="edit" icon="el-icon-edit">编辑</el-link>
                    <template>
                        <el-button id="delete" type="text" @click="open">删除</el-button>
                    </template>
                </div>
            </div>
        </div>
        <!-- 新闻列表 【完】-->
        <!-- <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
        </el-pagination> -->
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
import api from '@/api.js'

export default {
    name: 'Newsmange',
    data(){
        return {
            input: '',
            checked: false,
            newsList: [
                {
                    title: '这是文章的标题',
                    top: '(置顶)',
                    draft: '(草稿)',
                    time: '2019-11-11',
                    writer: 'xxx',
                    reviewer: 'xxx',
                    publish: 0,
                    views: 1
                },
                {
                    title: '这是文章的标题',
                    top: '(置顶)',
                    draft: '(草稿)',
                    time: '2019-11-11',
                    writer: 'xxx',
                    reviewer: 'xxx'
                },
                {
                    title: '这是文章的标题',
                    top: '(置顶)',
                    draft: '(草稿)',
                    time: '2019-11-11',
                    writer: 'xxx',
                    reviewer: 'xxx'
                },
                {
                    title: '这是文章的标题',
                    top: '(置顶)',
                    draft: '(草稿)',
                    time: '2019-11-11',
                    writer: 'xxx',
                    reviewer: 'xxx'
                },
                {
                    title: '这是文章的标题',
                    top: '(置顶)',
                    draft: '(草稿)',
                    time: '2019-11-11',
                    writer: 'xxx',
                    reviewer: 'xxx'
                }
            ]
        }
    },
    methods: {
        createnews(){
            this.$router.push({ name: 'Createnews' })
        },
        // TODO
        getNewsList(page = 1){
            this.axios
                .get('/api' + api.getNewsList, {
                    params: {
                        page
                    }
                })
                .then(response => {
                    if(response.data.code === '0000') { return }
                    this.newsList = response.data.data.news
                    this.pageCount = response.data.data.pageCount
                })
        },
        open(){
            this.$confirm('此操作将永久删除该条新闻，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
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
.news-mange{
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
