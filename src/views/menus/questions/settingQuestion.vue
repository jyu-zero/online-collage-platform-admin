<template>
<div id="main">
    <el-row type="flex" class="row-bg header-btn" justify="center">
            <el-col :span="3">
                <div class="grid-content bg-purple">
                    <el-button type="primary" @click.native='goToQuestion'>返回问题列表</el-button>
                </div>
            </el-col>
            <el-col :span="14">
                <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="1">
                <div class="grid-content bg-purple">
                    <el-button type="primary" @click='setQuestion'>保存</el-button>
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
                    placeholder="请输入非法关键字"
                    v-model.trim="illegalKeyword">
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
                <el-time-select
                v-model="begintime"
                default-value="begintime"
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
                    start: '00:00',
                    step: '01:00',
                    end: '24:00'
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
                <el-input v-model="maxsumbit" placeholder="请输入数字" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
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
                    <el-checkbox v-for="(item,index) in questiontype" @change='addTypeSelect(index)' :key="index" class="text item">
                        {{item }}
                    </el-checkbox>
                    <el-button type="danger" @click='delect' >删除类型</el-button>
                    <el-button type="primary" @click="addType">添加类型</el-button>
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
            illegalKeyword: [], // 非法关键字
            isAnonymous: false, // 是否匿名
            isUnionReply: false, // 是否运行学生会在后台回复信息
            endtime: '00:00', // 提交限制时间
            maxsumbit: '', // 学生一天最多提交的问题数
            begintime: '00:00',
            questiontype: [],
            delectCheckbox: [] // 存储要删除的单选框下标
        }
    },
    mounted(){
        this.getQuestionType()
    },
    methods: {
        // 封装的处理放回数据提示的方法
        responsemesg(response){
            if (response.data.code === '0000') {
                this.$message({
                    type: 'success',
                    message: response.data.msg
                })
            }else {
                this.$message({
                    type: 'error',
                    message: response.data.msg
                })
            }
        },
        // 前往问答系统
        goToQuestion(){
            this.$router.push({ path: '/questions' })
        },
        // 设置问题系统
        setQuestion(){
            let illegalKeyword
            if(typeof this.illegalKeyword === 'string'){
                illegalKeyword = this.illegalKeyword.split(' ')
                var arr = illegalKeyword.filter(function (el) {
                    return el !== ''
                })
                illegalKeyword = arr
            }
            let startTime = this.begintime.split(':')[0] // 获取开始的是第几个小时
            let endTime = this.endtime.split(':')[0] // 获取结束的是第几个小时
            let maxSubmit = this.maxsumbit
            let isAnonymous = this.isAnonymous
            let isUnionReply = this.isUnionReply
            this.$axios.post(prefix.api + questionApi.setQuestionAndAnswer, {
                illegalKeyword, startTime, endTime, maxSubmit, isAnonymous, isUnionReply
            }).then(response=>{
                this.responsemesg(response)// 返回值处理
            })
        },
        // 获取问题的类型
        getQuestionType(){
            this.$axios.get(prefix.api + questionApi.getQuestionTypes, {
            }).then(response=>{
                if (response.data.code === '0000') {
                    response.data.data.forEach((item) => {
                        this.questiontype.push(item)
                    })
                }
                this.responsemesg(response)// 返回值处理
            })
        },
        // 添加问题类型
        addType(){
            this.$prompt('请输入想添加的类型名', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputErrorMessage: '邮箱格式不正确'
            }).then(({ value }) => {
                this.$axios.post(prefix.api + questionApi.addType, {
                    value
                }).then(response=>{
                    this.responsemesg(response)// 返回值处理
                    this.questiontype.push(value)
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                })
            })
        },
        // 添加问题类型的勾选 方便做删除操作
        addTypeSelect(e){
            if(this.delectCheckbox.indexOf(e)){
                this.$message({
                    type: 'success',
                    message: '勾选成功'
                })
                this.delectCheckbox.push(e)
            }else{
                this.$message({
                    type: 'info',
                    message: '取消成功'
                })
                this.delectCheckbox.splice(this.delectCheckbox.indexOf(e), 1)
            }
        },
        // 这里处理已经勾选的问题类型的删除操作
        delect(){
            this.$confirm('此操作将永久删除问题类型, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
                let questiontype = this.questiontype// 获取问题类型
                let delectType = [] // 传给后端需要删除的问题类型
                // 有选择才进行发送请求
                if(this.delectCheckbox.length === 0){
                    alert('请选择要删除的类型名')
                    return
                }
                this.delectCheckbox.forEach(function(index){
                    delectType.push(questiontype[index])
                })
                this.$axios.post(prefix.api + questionApi.adminDeleteType, {
                    delectType }).then(response => {
                    if (response.data.code === '0000') {
                        this.$message({
                            message: response.data.msg,
                            type: 'success'
                        })
                        this.submitanswer = ''
                    }
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
