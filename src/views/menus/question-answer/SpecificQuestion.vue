<template>
    <div id = "app">
        <el-container style = "height: 100%; border: 1px solid #eee">
        <el-asid></el-asid>
        <el-header style = "text-align: left; font-size: 12px;padding-top:20px;">
            <el-row>
                <el-col :span = "6"><div class = "grid-content bg-purple-dark"><h1>线上学院后台管理系统</h1></div></el-col>
                <el-col :span = "12"><div class = "grid-content bg-purple-dark"></div></el-col>
                <el-col :span = "6"><div class = "grid-content bg-purple-dark"></div>
                    <div class = "grid-content bg-purple-dark"></div>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-breadcrumb separator = "/">
                <el-row>
                    <el-col :span = "24">
                        <div class = "grid-content bg-purple-dark">
                            <el-breadcrumb-item :to = "{ path: '/' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item><a href = "/">在线问答</a></el-breadcrumb-item>
                            <el-breadcrumb-item>问题页</el-breadcrumb-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row class = "question-description" :gutter = "10">
                    <el-col :span = "20">
                        <div class = "grid-content bg-purple-dark">
                            <h1 class = "question-title">{{questionTitle}}</h1>
                        </div>
                        <div class = "grid-content bg-purple-dark">
                            提问人:<span>{{questionOwer}}</span>
                            提问时间:<span>{{questionTime}}</span>
                            <i class = "el-icon-user-solid"></i><span>{{browseTimes}}</span>
                            <i class = "el-icon-s-order"></i><span>{{questionType}}</span>
                        </div>
                    </el-col>
                    <el-col :span = "4">
                        <el-button type = "primary" @click = 'delectQuestion(questionId)'>删除该问题</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span = "24">
                        <div class = "grid-content bg-purple-dark description">
                            {{questionDescription}}
                        </div>
                    </el-col>
                </el-row>
            </el-breadcrumb>
            <el-row>
                <el-col :span = "24">
                    <h1>所有回答</h1>
                </el-col>
            </el-row>
            <el-row class = "answer" v-for = "(item,index) in answers" :key = "index" style = "border:1px solid black;border-radius: 2px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding:10px;">
                <el-col :span = "2">
                    <el-avatar :size = "50" :src = "circleUrl"></el-avatar>
                </el-col>
                <el-col :span = "22">
                    <el-row>
                        <el-col :span = "24" class = "answer-user">{{item.answer}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span = "24">{{item.phone}}</el-col>
                    </el-row>
                </el-col>
                <el-row class = "answer-contant">
                    <el-col :span = "24" class = "description">{{item.content}}</el-col>
                </el-row>
                <el-row class = "answer-buttom" gutter = '20'>
                    <el-col :span = "3">
                        <el-badge :value = "item.pointTimes" :max = "99" class = "item">
                            <el-button size = "small" @click = 'like(item.solutionId)'>点赞</el-button>
                        </el-badge>
                    </el-col>
                    <el-col :span = "17">
                        <el-button size = "small" @click = 'dislike(solutionId)'>踩</el-button>
                    </el-col>
                    <el-col :span = "4">
                        <el-button type = "primary" @click = 'adoptAsBest(item.solutionId)'>采纳为最佳</el-button>
                    </el-col>
                </el-row>
            </el-row>
            <el-row type = "flex" class = "row-bg" justify = 'center'>
                <el-col :span = "6">
                    <div class = "grid-content bg-purple"></div>
                </el-col>
                <el-col :span = "6">
                    <div class = "grid-content bg-purple-light">
                        <el-pagination
                        background
                        layout = "prev, pager, next"
                        :total = "1000" class = "paging">
                        </el-pagination>
                    </div>
                </el-col>
                <el-col :span = "6">
                    <div class = "grid-content bg-purple"></div>
                </el-col>
            </el-row>
      </el-main>
    </el-container>
    <el-button type = "primary" @click = "open" class = "setanswer">
        添加回答<i class = "el-icon-edit"></i>
    </el-button>
    <Editor style = "display:none;"></Editor>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import E from 'wangeditor'
import Editor from '@/components/question-answer/Editor.vue'
import axios from 'axios'
import { Button, Message, Pagination, Avatar, Badge } from 'element-ui'
export default {
    name: 'Question-a',
    components: {
        [Button.name]: Button,
        [Message.name]: Message,
        [Pagination.name]: Pagination,
        [Avatar.name]: Avatar,
        [Badge.name]: Badge,
        Editor
    },
    data(){
        return {
            submitanswer: '',
            questionId: '',
            questionTitle: '如何进行XXXXXXXXXXXXX？',
            questionOwer: 'XXXX',
            questionTime: '2019-09-23 12:01:22',
            browseTimes: 12,
            questionType: '生活帮助',
            questionDescription: '这里是一段问题描述，由提问人设置的问题描述',
            answers: []
        }
    },
    mounted(){
        this.getquestion()
        this.getanswer()
        // this.answers.sort();
    },
    methods: {
        dislike(solutionId){
            axios.post('/api' + api.dislikes, {
                solutionId }).then(response =>{
                if (response.data.code === '0000') {
                    alert(response.data.msg)
                }
            })
        },
        like(solutionId){
            axios.post('/api' + api.like, {
                solutionId }).then(response => {
                if (response.data.code === '0000') {
                    alert(response.data.msg)
                }
            })
        },
        adoptAsBest(solutionId){
            axios.post('/api' + api.adoptAsBest, {
                solutionId }).then(response => {
                if (response.data.code === '0000') {
                    alert(response.data.msg)
                }
            })
        },
        delectQuestion(id){
            this.$axios.post('/api' + api.delectQuestion, {
                questionId: id }).then(response => {
                if (response.data.code === '0000') {
                    alert(response.data.msg)
                }
            })
        },
        catchData(value){
            this.submitanswer = value//  在这里接受子组件传过来的参数，赋值给data里的参数
            alert(value)
        },
        getquestion(questionId = 1){
            this.$axios.get('/api' + api.getCheckQuestions, {
                questionId }).then(response => {
                if (response.data.code === '0000') {
                    this.questionId = response.data.data.questionId
                    this.questionTitle = response.data.data.title
                    this.questionOwer = response.data.data.name
                    this.questionTime = response.data.data.time
                    this.browseTimes = response.data.data.watch
                    this.questionType = response.data.data.typeName
                    this.questionDescription = response.data.data.description
                }
            })
        },
        getanswer(page = 1, questionsId = 1){
            axios.get('/api' + api.getSolutions, {
                page, questionsId }).then(response => {
                if (response.data.code === '0000') {
                    response.data.data.information.forEach((item) => {
                        var obj = {}
                        obj.solutionId = item.solutionId
                        obj.content = item.contentPath
                        obj.pointTimes = item.likeNum
                        obj.phone = item.userContact
                        obj.answer = item.userName
                        this.answers.push(obj)
                        // this.answers[index].content = item.contentPath
                        // this.answers[index].pointTimes = item.likeNum
                        // this.answers[index].phone = item.userContact
                        // this.answers[index].answer = item.userName
                    })
                }
            })
        },
        geteditor(html){
            this.submitanswer = html
        },
        open(){
            const h = this.$createElement
            this.$msgbox({
                title: '问题提交框',
                message: h('p', null, [
                    h('span', null, '请输入您的回答 '),
                    h('Editor', {
                        props: {
                            catchData: this.submitanswer
                        },
                        on: {
                            input: (html) =>{
                                this.submitanswer = html
                            }
                        } }, this.submitanswer)
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true
                        instance.confirmButtonText = '执行中...'
                        window.console.log(this.submitanswer)
                        alert(this.submitanswer)
                        setTimeout(() => {
                            done()
                            setTimeout(() => {
                                instance.confirmButtonLoading = false
                            }, 300)
                        }, 3000)
                    } else {
                        done()
                    }
                }
            }).then(action => {
                this.$message({
                    type: 'info',
                    message: 'action: ' + action
                })
            })
            var editor1 = new E('#div4')
            editor1.customConfig.uploadImgShowBase64 = true
            editor1.create()
        }
    }
}
</script>

<style lang = 'less'>
    #app{
    height: 100%;
    position: relative;
        .setanswer{
            position: fixed;
            top: 65%;
            right: 18px;
        }
    }
    .el-main{
    padding-left:20%;
    padding-right: 10%;
    }
    .question-description{
    border:0px solid black;
    border-radius: 2px;
    // box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    padding:10px 0px;
    box-sizing: border-box;
    span{
        padding: 0px 10px
    }
    }
  .answer-buttom{
    margin: 20px 0px;
    span{
        padding: 0 10px;
    }
    &>div{
        display: flex;
        flex-direction:row;
        // justify-content: center;
        align-content: center;
        margin: 10px 0px;
    }
}
  .answer{
    margin: 10px 0px;
    div{
      // margin: 10px 0px;
    }
}
  .question-title{
    margin: 10px 0px;
}
  .answer-user{
    padding:5px 0 ;
}
  .description{
    // box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    box-sizing: border-box;
    margin: 10px 0;
    padding: 10px;
}
    .el-message-box{
    width: 50%;
    height: 67%;
    .w-e-text-container{
        height: 359px;
    }
}
</style>
