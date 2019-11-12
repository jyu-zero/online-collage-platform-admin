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
                <p class="time">{{newsItem.time}} by {{newsItem.title}}</p>
                <p class="writer">撰稿人：{{newsItem.writer}}</p>
                <p class="reviewer">审稿人：{{newsItem.reviewer}}</p>
                <i class="fa fa-eye" aria-hidden="true"></i>
                <div class="editer">
                    <el-button id="button" type="primary">发布</el-button>
                    <p class="edit">编辑</p>
                    <p class="delete">删除</p>
                </div>
            </div>
        </div>
        <!-- 新闻列表 【完】-->
        <!-- <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
        </el-pagination> -->
        <div class="page">
            <el-pagination
                :hide-on-single-page="value"
                :total="100"
                layout="prev, pager, next">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Newsmange',
    data(){
        return {
            input: '',
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
            newsList: [
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
    // TODO
    methods: {
        createnews(){
            this.$router.push('Createnews')
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
        // overflow-y: scroll;
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

            p{
                margin-left: 0;
                font-size: 14px;
            }

            #button{
                padding: 8px 10px;
            }
        }
    }

    .page{
        text-align: center;
        
    }
}
</style>
