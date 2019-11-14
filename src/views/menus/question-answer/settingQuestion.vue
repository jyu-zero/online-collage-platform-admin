<template>
<div id="main">
    <el-row type="flex" class="row-bg header-btn" justify="center">
            <el-col :span="1">
                <div class="grid-content bg-purple">
                    <el-button type="primary">返回问题列表</el-button>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="1">
                <div class="grid-content bg-purple">
                    <el-button type="primary" @click='getanswer'>保存</el-button>
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
                    v-model="textarea">
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
        <el-col :span="8">
            <div class="block">
                <el-date-picker
                v-model="begintime"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00']">
                </el-date-picker>
            </div>
        </el-col>
        <el-col :span="2">至</el-col>
        <el-col :span="8">
            <div class="block">
                <el-date-picker
                v-model="endtime"
                type="datetimerange"
                align="right"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00', '08:00:00']">
                </el-date-picker>
            </div>
        </el-col>
    </el-row>
    <el-row type="flex" class="row-bg " justify="center">
            <el-col :span="5"><div class="grid-content bg-purple title"> 一个学生一天最多提问几个问题</div></el-col>
             <el-col :span="13"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center" >
        <el-col :span="6">
            <div class="grid-content bg-purple">
                <el-input v-model="input" placeholder="请输入内容"></el-input>
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
                <el-checkbox v-model="checked">是否允许学生会账号在后台回复信息</el-checkbox>
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
                <el-checkbox v-model="checked2">是否匿名提问</el-checkbox>
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
            <div class="grid-content bg-purple-light">-
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple"></div>
        </el-col>
    </el-row>
</div>
</template>

<script>
// import { Button, DateTimePicker, Input, Checkbox, Card } from 'element-ui'
export default {
    name: 'Question-b',
    data () {
        return {
            checked: 'true',
            checked2: 'false',
            begintime: '',
            questiontype: [
            ]
        }
    },
    mounted(){
        this.getQuestionType()
    },
    methods: {
        getanswer(){
            window.console.log(this.begintime)
            window.console.log(new Date(this.begintime).getTime())
        },
        getQuestionType(){
            axios.get('/api' + api.getQuestionType, {
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
                inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                inputErrorMessage: '邮箱格式不正确'
            }).then(({ value }) => {
                this.$message({
                    type: 'success',
                    message: '你的邮箱是: ' + value
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
