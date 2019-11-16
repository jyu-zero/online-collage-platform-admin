<template>
    <div id = "app">
            <el-breadcrumb separator = "/">
            <el-card>
                <el-row class = "question-description" :gutter = "10">
                    <el-col :span = "16">
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
                    <el-col :span = "8" class="question-title">
                        <el-button type="danger" @click='delectQuestion(questionId)' style="margin: 0px 17px;">删除问题<i class="el-icon-delete-solid"></i></el-button>
                        <el-button type="primary" @click="open">添加回答<i class="el-icon-edit"></i></el-button>
                    </el-col>
                </el-row>
            </el-card>
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
            <el-row class = "answer" v-for = "(item,index) in answers" :key = "index" style = "border:0px solid black;border-radius: 2px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding:10px;">
                <el-col :span = "2">
                    <el-avatar :size = "50" src = "circleUrl"></el-avatar>
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
                <el-row class = "answer-buttom" :gutter = "20">
                    <el-col :span = "3">
                        <el-badge :value = "item.pointTimes" :max = "99" class = "item">
                            <el-button size = "small" @click = 'like(item.solutionId,index)'>点赞</el-button>
                        </el-badge>
                    </el-col>
                    <el-col :span = "17">
                        <el-button size = "small" @click = 'dislike(item.solutionId,index)'>踩</el-button>
                    </el-col>
                    <el-col :span = "4">
                        <el-button type = "primary" @click = 'adoptAsBest(item.solutionId)'>采纳为最佳</el-button>
                    </el-col>
                </el-row>
            </el-row>
            <el-row type = "flex" class = "row-bg" justify = 'center' style="margin: 50px 0px;">
                <el-col :span = "6">
                    <div class = "grid-content bg-purple"></div>
                </el-col>
                <el-col :span = "18">
                    <div class = "grid-content bg-purple-light">
                        <el-pagination
                        class = "paging"
                        @current-change="handleCurrentChange"
                        background
                        layout = " prev, pager, next"
                        :current-page = "currentpage"
                        :total = "100"
                        :page-size = 3>
                        </el-pagination>
                    </div>
                </el-col>
                <el-col :span = "0">
                    <div class = "grid-content bg-purple"></div>
                </el-col>
            </el-row>
    <!-- <el-button type = "primary" @click = "open" class = "setanswer">
        添加回答<i class = "el-icon-edit"></i>
    </el-button> -->
    <Editor style = "display:none;"></Editor>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import E from 'wangeditor'
import Vue from 'vue'
import Editor from '@/components/question-answer/Editor.vue'
import { prefix, responseHandler, questionApi } from '@/api'
import { Breadcrumb, Card, Button, Message, MessageBox, Pagination, Avatar, Badge, Col, Row } from 'element-ui'
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
export default {
    name: 'QuestionSpecific',
    components: {
        [Breadcrumb.name]: Breadcrumb,
        [Card.name]: Card,
        [Button.name]: Button,
        [Message.name]: Message,
        [MessageBox.name]: MessageBox,
        [Pagination.name]: Pagination,
        [Avatar.name]: Avatar,
        [Badge.name]: Badge,
        [Col.name]: Col,
        [Row.name]: Row,
        Editor
    },
    data(){
        return {
            allPage: '100', // 总页数
            currentpage: 1, // 当前页数
            submitanswer: '',
            anonymous: true,
            questionId: this.$route.params.id,
            questionTitle: '如何进行？',
            questionOwer: 'XXXX',
            questionTime: '2019-09-23 12:01:22',
            browseTimes: 12,
            questionType: '生活帮助',
            questionDescription: '这里是一段问题描述，由提问人设置的问题描述',
            answers: []
        }
    },
    mounted(){
        this.getQuestion(this.questionId)// 进入页面时预设我们页面的问题资料
        this.getAnswer()// 进入页面时预设我们问题相关回答的资料
    },
    methods: {
        // 处理点踩的逻辑
        dislike(solutionId, index){
            this.answers[index].pointTimes--
            this.$axios.post(prefix.api + questionApi.dislikes, {
                solutionId }).then(response =>{
                if (response.data.code === '0000') {
                    alert(response.data.msg)
                }
            })
        },
        // 处理点赞的逻辑
        like(solutionId, index){
            this.answers[index].pointTimes++
            this.$axios.post(prefix.api + questionApi.likes, {
                solutionId }).then(response => {
                if (response.data.code === '0000') {
                    alert(response.data.msg)
                }
            })
        },
        // 处理采纳为最佳的逻辑
        adoptAsBest(solutionId){
            this.$axios.post(prefix.api + questionApi.adoptAsBest, {
                solutionId }).then(response => {
                if (response.data.code === '0000') {
                    alert(response.data.msg)
                }
            })
        },
        //  处理删除问题的逻辑
        delectQuestion(id){
            this.$axios.post(prefix.api + questionApi.deleteQuestion, {
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
        // 点击分页按钮的逻辑
        handleCurrentChange(val){
            this.currentpage = val
            this.$message({
                type: 'success',
                message: '请求成功!'
            })
            this.answers = [] // 清空页面的回答数据
            this.getAnswer(this.currentpage, this.questionId)
        },
        // 获取问题的逻辑
        getQuestion(questionId = 1){
            this.$axios.get(prefix.api + questionApi.getCheckQuestions, {
                questionId: this.$route.params.id }).then(response => {
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
        // 获取回答的逻辑
        getAnswer(page = 1, questionsId = 1){
            this.$axios.get(prefix.api + questionApi.getSolutions, {
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
                    })
                    this.allpage = response.data.data.pageCount
                }
            })
        },
        // 获取回答框里的内容
        getEditor(html){
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
                        let content = this.submitanswer // 问题内容
                        let questionsId = this.questionId // 问题id
                        let anonymous = this.anonymous // 是否匿名
                        this.$axios.post(prefix.api + questionApi.publishAnswer, {
                            content, questionsId, anonymous }).then(response => {
                            if (response.data.code === '0000') {
                                this.$message({
                                    message: response.data.msg,
                                    type: 'success'
                                })
                                this.submitanswer = ''
                            }
                        })
                        setTimeout(() => {
                            setTimeout(() => {
                                instance.confirmButtonLoading = false
                                done()
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

<style lang = 'less' scoped>
    #app{
    height: 100%;
    position: relative;
    background: #f0f0f0;
        .setanswer{
            position: fixed;
            top: 65%;
            right: 18px;
        }
    }
    main{
        padding: 20px 110px;
        background: #f0f0f0;
        &>div{
            padding: 20px 110px;
            background: #f0f0f0;
        }
    }
    .el-message-box{
        width: 55%;
    }
    .el-main{
    padding-left:20%;
    padding-right: 10%;
    padding: 0px 100px;
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
    background: white;
    margin: 10px 0px;
}
  .question-title{
    margin: 10px 0px;
}
  .answer-user{
    padding:5px 0 ;
}
  .description{
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); */
    box-sizing: border-box;
    margin: 10px 0;
    padding: 10px;
}


</style>

<style lang="less">
.el-message-box  {
    width: 50% !important;
    height: 67%;
    .w-e-text-container{
        height: 359px;
    }
}
</style>
