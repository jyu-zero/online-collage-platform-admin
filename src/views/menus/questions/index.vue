<template>
    <div class="online-question-and-answer">
        <div id='questions-container'>
            <header>
                <div class="left-btn">
                    <el-button type="danger" @click="deleteQuestion">删除</el-button>
                    <el-button @click="questionToTop">置顶</el-button>
                    <el-button @click="lockQuestion">锁定</el-button>
                    <el-button type="primary" @click="gotosettingquestion">问答系统设置</el-button>
                </div>
                <div class="search-bar">
                    <div>
                        <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
                            <el-select v-model="selectStatus" slot="prepend" placeholder="请选择">
                                <el-option label="待解决" value="0"></el-option>
                                <el-option label="已解决" value="1"></el-option>
                            </el-select>
                            <el-button slot="append" icon="el-icon-search" @click="searchQuestions"></el-button>
                        </el-input>
                    </div>
                </div>
            </header>
            <main>
                <div id="choose">
                    <span>筛选：</span>
                    <button class="choose-btn" @click="focus($event)" ref="btn" v-for="(typeItems,index) in typeName" :key="index">
                        {{typeItems}}
                    </button>
                </div>
                <h1>问题列表</h1>
                <div class="question-box" v-for="questionItem of questionList" :key="questionItem.questionId">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div class="grid-content bg-purple left-align">
                                <el-checkbox @change="checkId(questionItem.questionId)">{{questionItem.title}}
                                    <el-button type="text" disabled>
                                        {{questionItem.status}}
                                    </el-button>
                                </el-checkbox>
                                <p class="description">提问人{{questionItem.name}} {{questionItem.time}}</p>
                            </div>
                        </el-col>
                        <el-col :span="8" :offset="10">
                            <div class="grid-content bg-purple right-align">
                                <i class="el-icon-s-promotion">{{questionItem.typeName}}</i>
                                <i class="el-icon-view">{{questionItem.views}}</i>
                                <i class="el-icon-chat-dot-round">{{questionItem.solutionsNum}}</i>
                                <el-button @click.native="skip(questionItem.questionId)">查看</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </main>
            <footer>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :page-count="pageCount">
                </el-pagination>
            </footer>
        </div>
    </div>
</template>

<script>
import { prefix, responseHandler, questionApi } from '@/api'
import { Button, Message, Checkbox, Input, Select, Option, Row, Col, Pagination } from 'element-ui'
export default {
    name: 'Questions',
    components: {
        [Button.name]: Button,
        [Message.name]: Message,
        [Checkbox.name]: Checkbox,
        [Input.name]: Input,
        [Select.name]: Select,
        [Option.name]: Option,
        [Row.name]: Row,
        [Col.name]: Col,
        [Pagination.name]: Pagination
    },
    data(){
        return {
            typeName: [],
            selectName: [],
            selectStatus: '',
            questionList: [],
            checkQuestionId: [],
            pageCount: 1,
            input: '',
            checked1: '',
            checked2: ''
        }
    },
    mounted(){
        this.getTypeName()
        this.getQuestions()
    },
    methods: {
        skip(questionId){
            this.$router.push({ path: `/questions/questions-specific/${questionId}` })
        },
        handleCurrentChange(val){
            this.getQuestions(val)
            this.page = val
        },
        // 删除问题
        deleteQuestion(){
            this.$axios.post(prefix.api + questionApi.deleteQuestion, {
                'questionId': this.checkQuestionId
            }).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // TODO 在这里处理错误
                    Message.error('请求失败')
                }
                this.getQuestions()
            })
        },
        // 问题置顶
        questionToTop(){
            this.$axios.post(prefix.api + questionApi.questionToTop, {
                'questionId': this.checkQuestionId
            }).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // TODO 在这里处理错误
                    Message.error('请求失败')
                }
                this.getQuestions()
            })
        },
        // 锁定问题
        lockQuestion(){
            this.$axios.post(prefix.api + questionApi.lockQuestion, {
                'questionId': this.checkQuestionId
            }).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // TODO 在这里处理错误
                    Message.error('请求失败')
                }
                this.getQuestions()
            })
        },
        // 搜索问题
        searchQuestions(){
            this.$axios.post(prefix.api + questionApi.searchQuestions, {
                'typeName': this.selectName,
                'status': this.selectStatus === '' ? -1 : parseInt(this.selectStatus),
                'content': this.input
            }).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // 在这里处理错误
                    Message.error('请求失败')
                }
                Message.success('请求成功')
                this.questionList = response.data.data.information
                for(var i = 0; i < this.questionList.length; i++){
                    if(this.questionList[i].status === 0){
                        this.questionList[i].status = '待解决'
                    } else{
                        this.questionList[i].status = '已解决'
                    }
                }
            })
        },
        // 给筛选按钮添加点击样式
        focus(event){
            let el = event.currentTarget
            if(!el.classList.contains('select')){
                el.classList.add('select')
                this.selectName.push(el.innerHTML)
                console.log(this.selectName)
                return
            }
            el.classList.remove('select')
            let index = this.selectName.indexOf(el.innerHTML)
            this.selectName.splice(index, 1)
            console.log(this.selectName)
        },
        // 获取类型名
        getTypeName(){
            this.$axios.get(prefix.api + questionApi.getTypeName).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // 在这里处理错误
                    Message.error('请求失败')
                }
                Message.success('请求成功')
                this.typeName = response.data.data
            })
        },
        // 获取指定页的问题
        getQuestions(page = 1){
            this.$axios.get(prefix.api + questionApi.getQuestions, {
                params: {
                    page
                }
            }).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // 在这里处理错误
                    Message.error('请求失败')
                }
                Message.success('请求成功')
                this.pageCount = response.data.data.pageCount
                this.questionList = response.data.data.information
                for(var i = 0; i < this.questionList.length; i++){
                    if(this.questionList[i].status === 0){
                        this.questionList[i].status = '待解决'
                    } else{
                        this.questionList[i].status = '已解决'
                    }
                }
            })
        },
        // 将选择的问题id传给 checkQuestionId
        checkId(id){
            var index = this.checkQuestionId.indexOf(id)
            if(index > -1){
                this.checkQuestionId.splice(index, 1)
                return
            }
            this.checkQuestionId.push(id)
        },
        // 前往问答系统设置页面
        gotosettingquestion(){
            this.$router.push({ path: 'questions-setting' })
        }
    }
}
</script>

<style lang="less" scoped>
*{
    box-sizing: border-box;
}
.online-question-and-answer{
    height:100%;
    display: flex;
    flex-direction: column;

    #questions-container{
        width: 980px;
        height: 100%;
        margin:0 auto;
        padding:30px;
        
        header{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
            
            .left-btn{
                margin-right: 100px;

                .el-button{
                    border-radius: 5px;
                }

                .el-button+.el-button{
                    margin-left: 20px;
                }
            }

            .search-bar{
                flex:1;

                .el-select {
                    width: 100px;
                }
            }
        }

        main{
            margin-bottom: 18px;
            
            #choose{
                width: 100%;
                height: 60px;
                border: 1px solid rgb(49, 49, 49);
                padding: 0 10px;
                margin-bottom: 25px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                border-radius: 14px;
                
                span{
                    font-size: 14px;
                    margin-left: 10px;
                    font-weight: 600;
                }

                .choose-btn{
                    border:none;
                    padding:7px 15px;
                    background: white;
                    border-radius: 20px;
                    outline: none;
                    margin:0 8px;
                    font-weight: 400;
                    cursor: pointer;

                    &:hover{
                        color: #409EFF;
                        border-color: #c6e2ff;
                        background-color: #ecf5ff;
                    }
                }

                .select{
                    color: #409EFF;
                    border-color: #c6e2ff;
                    background-color: #ecf5ff;
                }
                
            }

            h1{
                margin:0 0 20px;
                font-size: 24px;
            }

            .question-box{
                width: 100%;
                height: 100px;
                border: 1px solid rgb(49, 49, 49);
                border-top: 0;
                padding: 20px 40px;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

                &:nth-child(3) {
                    border: 1px solid rgb(49, 49, 49);
                }

                .el-row{
                    height:100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .left-align{
                        text-align: left;
                    }

                    .right-align{
                        text-align: right;
                    }

                    .el-checkbox__label{
                        font-size: 16px;
                    }

                    .is-disabled{
                        padding: 5px 0;
                    }

                    .description{
                        width:100%;
                        margin: 5px 0 0;
                        font-size: 12px;
                    }

                    i{
                        margin-right: 18px;
                    }
                }
            }
        }

        footer{
            .el-pagination{
                text-align: center;
            }
        }
    }
}
</style>
