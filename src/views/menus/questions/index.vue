<template>
    <div class="online-question-and-answer">
        <div id='questions-container'>
            <!-- 左边的四个按钮和右边的搜索框 -->
            <header>
                <!-- 四个按钮 -->
                <div class="left-btn">
                    <el-button type="danger" @click="isConfirmToDelete">删除</el-button>
                    <el-button @click="pinQuestion">置顶</el-button>
                    <el-button @click="isConfirmToLock">锁定</el-button>
                    <el-button type="primary" @click="goToSettingQuestion">问答系统设置</el-button>
                </div>
                <!-- 四个按钮 [完]-->
                
                <!-- 搜索框 -->
                <div class="search-bar">
                    <div>
                        <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
                            <!-- 下拉菜单，用来选择问题的类型 -->
                            <el-select v-model="selectStatus" slot="prepend" placeholder="请选择">
                                <el-option label="待解决" value="0"></el-option>
                                <el-option label="已解决" value="1"></el-option>
                            </el-select>
                            <!-- 下拉菜单，用来选择问题的类型 [完]-->
                            <el-button slot="append" icon="el-icon-search" @click="searchQuestions"></el-button>
                        </el-input>
                    </div>
                </div>
                <!-- 搜索框 [完]-->
            </header>
            <!-- 左边的四个按钮和右边的搜索框 [完]-->

            <!-- 一个用户进行筛选类型名的div和问题的列表 -->
            <main>
                <!-- 用户筛选 -->
                <div id="choose">
                    <span>筛选：</span>
                    <button class="choose-btn" @click="focus($event)" ref="btn" v-for="(typeItems,index) in typeName" :key="index">
                        {{typeItems}}
                    </button>
                </div>
                <!-- 用户筛选 [完]-->

                <h1>问题列表</h1>
                <!-- 问题列表 -->
                <div class="question-box" v-for="questionItem of questionList" :key="questionItem.questionId">
                    <el-row :gutter="20">
                        <el-col :span="10">
                            <div class="grid-content bg-purple left-align">
                                <el-row :gutter="20">
                                    <el-col :span="4"><div class="grid-content bg-purple">
                                        <el-button type="text" disabled>
                                            {{questionItem.status}}
                                        </el-button>
                                    </div></el-col>
                                    <el-col :span="20"><div class="grid-content bg-purple handle">
                                        <el-checkbox @change="checkId(questionItem.questionId)">{{questionItem.title}}</el-checkbox>
                                    </div></el-col>
                                </el-row>
                                <p class="description">提问人{{questionItem.name}} {{questionItem.time}}</p>
                            </div>
                        </el-col>
                        <el-col :span="10" :offset="4">
                            <div class="grid-content bg-purple right-align">
                                <i class="el-icon-s-promotion">{{questionItem.typeName}}</i>
                                <i class="el-icon-view">{{questionItem.views}}</i>
                                <i class="el-icon-chat-dot-round">{{questionItem.solutionsNum}}</i>
                                <el-button @click.native="goToDetailedQuestion(questionItem.questionId)">查看</el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <div :class="{top:questionItem.isLocked}"></div>
                </div>
                <!-- 问题列表 [完]-->

            </main>
            <!-- 一个用户进行筛选类型名的div和问题的列表 [完]-->

            <!-- 分页 -->
            <footer>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :page-count="pageCount">
                </el-pagination>
            </footer>
            <!-- 分页 [完]-->
        </div>
    </div>
</template>

<script>
import { prefix, responseHandler, questionApi } from '@/api'
import { Button, Message, Checkbox, Input, Select, Option, Row, Col, Pagination, MessageBox } from 'element-ui'
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
        [Pagination.name]: Pagination,
        [MessageBox.name]: MessageBox
    },
    data(){
        return {
            // 问题的类型名
            typeName: [],
            // 用户选择的要进行搜索的类型名，可以是多个类型
            selectName: [],
            // 用户选择要进行搜索的问题状态（已解决|待解决），默认为-1（即用户没有用问题状态进行搜索）
            // 0代表待解决，1代表已解决
            selectStatus: '',
            // 获取的所有问题
            questionList: [
                // 这是测试用的数据
                {
                    'questionId': 50,
                    'name': 'zhangs',
                    'title': '这是问题的标题',
                    'description': '描述',
                    'status': '已解决',
                    'time': '2019-11-15',
                    'typeName': '类型名',
                    'views': 20,
                    'solutionsNum': 11
                }
            ],
            // 获取用户选择要进行操作的问题id，可以是多条
            checkQuestionId: [],
            // 总页数
            pageCount: 1,
            // 用户要进行搜索的内容
            input: ''
        }
    },
    created(){
        this.getQuestionTypes()
        this.getQuestions()
    },
    methods: {
        handleCurrentChange(val){
            this.getQuestions(val)
            this.page = val
        },
        // 点击删除按钮时弹出是否确认框
        isConfirmToDelete(){
            MessageBox.confirm('此操作将永久删除该问题, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                Message({
                    type: 'success',
                    message: '已成功删除',
                    duration: 1000
                })
                this.deleteQuestion()
            }).catch(() => {
                Message({
                    type: 'info',
                    message: '已取消删除',
                    duration: 1000
                })
            })
        },
        // 下面的所有错误请求还未处理
        // TODO:
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
        pinQuestion(){
            this.$axios.post(prefix.api + questionApi.getPinnedQuestions, {
                'questionId': this.checkQuestionId
            }).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // TODO 在这里处理错误
                    Message.error('请求失败')
                }
                this.getQuestions()
            })
        },
        // 点击锁定按钮时弹出是否确认框
        isConfirmToLock(){
            MessageBox.confirm('问题将永久被锁定, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                Message({
                    type: 'success',
                    message: '已成功锁定',
                    duration: 1000
                })
                this.lockQuestion()
            }).catch(() => {
                Message({
                    type: 'info',
                    message: '已取消锁定',
                    duration: 1000
                })
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
                    // TODO 在这里处理错误
                    Message.error('请求失败')
                }
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
                return
            }
            el.classList.remove('select')
            let index = this.selectName.indexOf(el.innerHTML)
            this.selectName.splice(index, 1)
        },
        // 获取问题类型名
        getQuestionTypes(){
            this.$axios.get(prefix.api + questionApi.getQuestionTypes).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // TODO 在这里处理错误
                    Message.error('请求失败')
                }
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
                    // TODO 在这里处理错误
                    Message.error('请求失败')
                }
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
        goToSettingQuestion(){
            this.$router.push({ path: '/questions/questions-setting' })
        },
        // 查看问题详情页
        goToDetailedQuestion(questionId){
            // 跳转至问题详情页并且将要查看的问题id传过去
            this.$router.push({ path: `/questions/questions-specific/${questionId}` })
        }
    }
}
</script>
<style lang="less">
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
                position: relative;

                &:nth-child(3) {
                    border: 1px solid rgb(49, 49, 49);
                }

                .el-row{
                    height:100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .handle{
                        width: 100%;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }

                    .left-align{
                        text-align: left;
                    }

                    .right-align{
                        text-align: right;
                    }

                    .el-checkbox__label{
                        font-size: 16px;
                        display: inline;
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

            .top{
                position: absolute;
                width: 100%;
                height: 100%;
                top:0;
                left:0;
                background: rgba(110, 110, 110, 0.1);
                z-index: 2;
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
