<template>
<div id="main">
    <el-row type="flex" class="row-bg header-btn" justify="center">
            <el-col :span="1">
                <div class="grid-content bg-purple">
                    <el-button type="primary" @click='gotoquestion'>返回问题列表</el-button>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="1">
                <div class="grid-content bg-purple">
                    <el-button type="primary" @click='setquestion'>保存</el-button>
                </div>
            </el-col>
    </el-row>
    <el-row type="flex" class="row-bg " justify="center">
            <el-col :span="5">
                <div class="grid-content bg-purple title">非法关键字筛选</div>
            </el-col>
            <el-col :span="13">
                <div class="grid-content bg-purple-light"></div>
            </el-col>
    </el-row>
    <el-row type="flex" class="row-bg " justify="center">
             <el-col :span="18">
                <el-input
                    type="textarea"
                    :rows="10"
                    placeholder="请输入内容"
                    v-model="illegalKeyword">
                </el-input>
             </el-col>
    </el-row>
    <el-row type="flex" class="row-bg " justify="center">
            <el-col :span="5">
                <div class="grid-content bg-purple title"> 禁用时段</div>
            </el-col>
             <el-col :span="13">
                <div class="grid-content bg-purple-light">
                </div>
            </el-col>
    </el-row>
    <el-row type="flex" class="row-bg " justify="center">
        <el-col :span="10">
            <div class="block">
                <!-- <el-date-picker
                v-model="begintime"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00']">
                </el-date-picker> -->
                <el-time-select
                v-model="begintime"
                :picker-options="{
                    start: '00:00',
                    step: '01:00',
                    end: '24:0'
                }"
                placeholder="开始时间">
                </el-time-select>
                至
                <el-time-select
                v-model="endtime"
                :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                }"
                placeholder="结束时间">
                </el-time-select>
            </div>
        </el-col>
        <el-col :span="8">
        </el-col>
    </el-row>
    <el-row type="flex" class="row-bg " justify="center">
            <el-col :span="5"><div class="grid-content bg-purple title"> 一个学生一天最多提问几个问题</div></el-col>
             <el-col :span="13"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center" >
        <el-col :span="6">
            <div class="grid-content bg-purple">
                <el-input v-model="maxsumbit" placeholder="请输入数字" oninput="value=value.replace(/[^\d]/g,'')">></el-input>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light"></div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple"></div>
        </el-col>
    </el-row>
    <el-row type="flex" class="row-bg header-btn" justify="center" >
        <el-col :span="6">
            <div class="grid-content bg-purple">
                <el-checkbox v-model="isUnionReply">是否允许学生会账号在后台回复信息</el-checkbox>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light"></div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple"></div>
        </el-col>
    </el-row>
    <el-row type="flex" class="row-bg header-btn" justify="center" >
        <el-col :span="6">
            <div class="grid-content bg-purple">
                <el-checkbox v-model="isAnonymous">是否匿名提问</el-checkbox>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light"></div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple"></div>
        </el-col>
    </el-row>
    <el-row type="flex" class="row-bg header-btn" justify="center" >
        <el-col :span="6">
            <div class="grid-content bg-purple">
                <el-card class="box-card">
                    <el-checkbox v-for="(item,index) in questiontype" :key="index" class="text item">
                        {{item }}
                    </el-checkbox>
                    <el-button type="danger" @click='delect' >删除类型</el-button>
                    <el-button type="primary" @click="addtype">添加类型</el-button>
                </el-card>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple"></div>
        </el-col>
    </el-row>
</div>
</template>

<script>
import { prefix, responseHandler, questionApi } from '@/api'
import Vue from 'vue'
import { Button, Input, DatePicker, Checkbox, MessageBox, Card, Col, Row, TimeSelect, Message } from 'element-ui'
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
export default {
    name: 'QuestionSetting',
    components: {
        [Button.name]: Button,
        [Input.name]: Input,
        [DatePicker.name]: DatePicker,
        [Checkbox.name]: Checkbox,
        [MessageBox.name]: MessageBox,
        [Card.name]: Card,
        [Col.name]: Col,
        [Row.name]: Row,
        [TimeSelect.name]: TimeSelect,
        [Message.name]: Message
    },
    data () {
        return {
            illegalKeyword: '', // 非法关键字
            isAnonymous: false, // 是否匿名
            isUnionReply: false, // 是否运行学生会在后台
            endtime: '', // 提交限制时间
            maxsumbit: '', // 学生一天最多提交的问题数
            begintime: '',
            questiontype: [
            ]
        }
    },
    mounted(){
        this.getQuestionType()
    },
    methods: {
        // 前往问答系统
        gotoquestion(){
            this.$router.push({ path: '/questions' })
        },
        // 设置问题系统
        setquestion(){
            // window.console.log(this.illegalKeyword + '//' + this.isAnonymous + '//' + this.isUnionReply + '//' + this.endtime + '//')
            let illegalKeyword = this.illegalKeyword
            let startTime = this.begintime
            let endTime = this.endtime
            let maxSubmit = this.maxsumbit
            let isAnonymous = this.isAnonymous
            let isUnionReply = this.isUnionReply
            this.$axios.post(prefix.api + questionApi.setQuestionAndAnswer, {
                illegalKeyword, startTime, endTime, maxSubmit, isAnonymous, isUnionReply
            }).then(response=>{
                if (response.data.code === '0000') {
                    alert(response.data.msg)
                }
            })
        },
        // 获取答案
        getanswer(){
            window.console.log(this.begintime)
            window.console.log(new Date(this.begintime).getTime())
        },
        getQuestionType(){
            this.$axios.get(prefix.api + questionApi.getTypeName, {
            }).then(response=>{
                if (response.data.code === '0000') {
                    response.data.data.forEach((item) => {
                        this.questiontype.push(item)
                    })// this.questiontype.push(response.data.data)
                }
            })
        },
        addtype(){
            this.$prompt('请输入想添加的类型名', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputErrorMessage: '邮箱格式不正确'
            }).then(({ value }) => {
                this.$axios.post(prefix.api + questionApi.addType, {
                    value
                }).then(response=>{
                    if (response.data.code === '0000') {
                        this.$message({
                            type: 'success',
                            message: response.data.msg
                        })
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                })
            })
        },
        delect(){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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

<style lang='less'>
html,body{
    margin:0px;
    padding:0px;
}
main{
    html,body{
        width: 100%;
        height:100%;
    }
}
.header-btn{
margin:30px 0;
}
.title{
    padding: 20px 0px 10px 0px;
}
.box-card{
    box-shadow: none;
    label{
        display: block;
        padding: 10px 0;
    }
}
</style>
