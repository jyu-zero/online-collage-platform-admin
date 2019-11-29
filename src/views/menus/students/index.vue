<template>
    <!-- 后台账户管理系统 -->
    <div class="accounts">
        <!-- 按钮 -->
        <div class="a-button">
            <el-button class="a1-button" type="primary" @click="dialogVisible = true">
                添加账号
            </el-button>
            <el-button class="a1-button" type="primary">导入账号</el-button>
            <el-button class="a1-button" type="primary" @click="classManager">班级管理</el-button>
        </div>
        <!-- 表格 -->
        <main>
            <div class="title-box">
                <div class="title-box-item">学号</div>
                <div class="title-box-item">姓名</div>
                <div class="title-box-item">性别</div>
                <div class="title-box-item">联系方式</div>
                <div class="title-box-item">班级年级</div>
                <div class="title-box-item">宿舍</div>
                <div class="title-box-item">操作</div>
            </div>
            <div class="content-box" v-for="item in information" :key="item.account">
                <div class="content-box-item">{{item.account}}</div>
                <div class="content-box-item">{{item.name}}</div>
                <div class="content-box-item">{{item.sex}}</div>
                <div class="content-box-item">{{item.contact}}</div>
                <div class="content-box-item">{{item.class}}</div>
                <div class="content-box-item">{{item.dormitory}}</div>
                <div class="content-box-item operate ">···
                    <div class="operate-box">
                        <div class="operate-box-item" @click='sentPasswordAppear(item.account)'>重置密码</div>
                        <div class="operate-box-item" @click='lock(item.account)'>锁定账号</div>
                        <div class="operate-box-item" @click='alterMassage = true'> 修改信息</div>
                        <div class="operate-box-item" @click='del'>删除账号</div>
                    </div>
                </div>
            </div>
            <!-- 出现重置密码窗口 -->
            <div class="item-box" v-if="isAppear">
                <div class="close" v-on:click="isAppear = false">×</div>
                <p class="password">旧密码:</p>
                <el-input placeholder="请输入旧密码" v-model="old_password" show-password></el-input>
                <p class="password">新密码:</p>
                <el-input placeholder="请输入新密码" v-model="new_password" show-password></el-input>
                <p class="password">确认新密码:</p>
                <el-input placeholder="请在次输入新密码" v-model="sure_password" show-password></el-input>
                <el-button type="primary" class="sure" @click="sentPassword">确认</el-button>
            </div>
        </main>
        <!-- 分页 -->
        <el-pagination
          small
          layout="prev, pager, next"
          :total="50">
        </el-pagination>
        <!-- 出现添加账号对话框 -->
        <el-dialog
        title="添加账号"
        :visible.sync="dialogVisible"
        width="30%">
        <p>请输入学号:</p>
        <el-input v-model="account" placeholder="请输入学号" ></el-input>
        <p>请输入姓名:</p>
        <el-input v-model="name" placeholder="请输入姓名"></el-input>
        <p>请输入性别:</p>
        <el-input v-model="sex" placeholder="请输入性别"></el-input>
        <p>请输入联系方式:</p>
        <el-input v-model="contact" placeholder="请输入联系方式"></el-input>
        <p>请输入班级年级:</p>
        <el-input v-model="class_grade" placeholder="请输入班级年级"></el-input>
        <p>请输入宿舍:</p>
        <el-input v-model="dormitory" placeholder="请输入宿舍"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addAccount">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 添加账号对话框【完】 -->
        <!-- 学生个人信息表-操作-修改信息 -->
        <el-dialog
            title="修改信息"
            :visible.sync="alterMassage"
            width="30%">
            <p>请输入学号:</p>
            <el-input v-model="account" placeholder="请输入学号" ></el-input>
            <p>请输入姓名:</p>
            <el-input v-model="name" placeholder="请输入姓名"></el-input>
            <p>请输入性别:</p>
            <el-input v-model="sex" placeholder="请输入性别"></el-input>
            <p>请输入联系方式:</p>
            <el-input v-model="contact" placeholder="请输入联系方式"></el-input>
            <p>请输入班级年级:</p>
            <el-input v-model="class_grade" placeholder="请输入班级年级"></el-input>
            <p>请输入宿舍:</p>
            <el-input v-model="dormitory" placeholder="请输入宿舍"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="alterMassage = false">取 消</el-button>
                <el-button type="primary" @click="alterInformation">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 学生个人信息表-操作-修改信息【完】 -->
    </div>
</template>

<script>
import { userApi, prefix, responseHandler } from '@/api'
import { Button, Table, Input, Message, Pagination, Dropdown, Select, Dialog } from 'element-ui'
// import { type } from 'os'
export default {
    name: 'Accounts',
    components: {
        [Button.name]: Button,
        [Table.name]: Table,
        [Message.name]: Message,
        [Input.name]: Input,
        [Dialog.name]: Dialog,
        [Pagination.name]: Pagination,
        [Select.name]: Select,
        [Dropdown.name]: Dropdown
    },
    data() {
        return {
            // 是否弹出修改信息的对话框
            alterMassage: false,
            // 是否弹出添加账号对话框
            dialogVisible: false,
            // 重置密码中的内容
            isAppear: false,
            old_password: '',
            new_password: '',
            sure_password: '',
            // 添加账号中的内容
            account: '',
            name: '',
            sex: '',
            contact: '',
            class_grade: '',
            dormitory: '',
            operate: '',
            information: []
        }
    },
    created(){
        this.getStudents()
    },
    methods: {
        // 跳转班级管理
        classManager(){
            this.$router.push({ name: 'Monitor' })
        },
        // 学生账号管理
        getStudents(page = 1){
            this.$axios.get(prefix.api + userApi.getStudents, {
                params: {
                    page
                }
            }).then((response)=>{
                if(!responseHandler(response.data, this)){
                    Message.error('请求失败')
                }
                Message.success('请求成功')
                this.information = response.data.data.information
            })
        },
        // 获取添加账号中的内容
        addAccount(){
            // 判断输入框是否为空
            if(this.account === '' || this.name === '' || this.sex === '' || this.contact === '' || this.class_grade === '' || this.dormitory === ''){
                Message.error('输入框不能为空！')
                return
            }
            this.$axios.post(prefix.api + userApi.studentsAdd, {
                account: this.account,
                name: this.name,
                sex: this.sex,
                contact: this.contact,
                class: this.class_grade,
                dormitory: this.dormitory
            }).then((response)=>{
                if(!responseHandler(response.data, this)){
                    Message.error('请求失败')
                }
                Message.success('请求成功')
                this.dialogVisible = false
            })
        },
        sentPasswordAppear(acc){
            this.isAppear = true
            this.account = acc
        },
        sentPassword(){
            // 判断三个输入框是否为空
            if(this.old_password === '' || this.new_password === '' || this.sure_password === ''){
                Message.error('密码不能为空！')
                return
            }
            // 判断新旧密码是否一致
            if(this.old_password === this.new_password){
                Message.error('新旧密码一样，请重新输入新密码')
                return
            }
            // 判断新旧密码是否一致
            if(this.new_password !== this.sure_password){
                Message.error('新旧密码不一致！')
                return
            }
            this.$axios.post(prefix.api + userApi.studentResetting, {
                old_password: this.old_password,
                new_password: this.new_password,
                account: this.account
            }).then((response)=>{
                if(!responseHandler(response.data, this)){
                    Message.error('请求失败')
                }
                Message.success('请求成功')
                this.isAppear = false
            })
        },
        // 锁定账号
        lock(acc){
            this.$confirm('此操作将会锁定该账户，是否锁定？', '锁定账号', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post(prefix.api + userApi.studentsLock, {
                    account: acc
                }).then((response)=>{
                    if(!responseHandler(response.data, this)){
                        Message.error('请求失败')
                    }
                    Message.success('请求成功')
                })
            })
        },
        // 删除账号
        del(){
            this.$confirm('是否删除此账号？', '删除账号', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post(prefix.api + userApi.studentsDelete, {
                    account: this.account
                }).then((response)=>{
                    if(!responseHandler(response.data, this)){
                        Message.error('请求失败')
                    }
                    Message.success('请求成功')
                })
            })
        },
        // 修改信息
        alterInformation(){
            this.$axios.post(prefix.api + userApi.studentsAlter, {
                account: this.account,
                name: this.name,
                sex: this.sex,
                contact: this.contact,
                class: this.class_grade,
                dormitory: this.dormitory
            }).then((response)=>{
                if(!responseHandler(response.data, this)){
                    Message.error('请求失败')
                }
                Message.success('请求成功')
                this.alterMassage = false
            })
        }

    }
}
</script>

<style lang="less" scoped>
@boxheight:50px;
.accounts{
    // height:100%;
    flex-direction: column;
    margin:40px ;
    display: flex;
}
.a-button{
    margin-bottom: 40px;
}
.a1-button{
    font-family: '';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    letter-spacing: normal;
    width: 140px;
    height: 40px;
}
.el-icon-more{
    vertical-align: middle;
}
li{
    list-style: none;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}
.el-icon-arrow-down {
    font-size: 12px;
}
.drop{
    font-size: 30px;
    &:hover{
        color: #409EFF;
    }
    cursor: pointer;
}

.title-box{
    width: 120*7px;
    height: @boxheight;
    border: 1px solid black;
    display: flex;
    .title-box-item{
        width: 120px;
        height: 100%;
        line-height: 60px;
        text-align: center;
    }
}
.content-box{
    height: @boxheight;
    width: 120*7px;
    border: 1px solid black;
    border-top: none;
    display: flex;
    position: relative;
    .content-box-item{
        width: 120px;
        height: 100%;
        line-height: 60px;
        text-align: center;
    }
}
.operate{
    position: relative;
}
.operate:hover{
    .operate-box{
        display: block;
    }
}

.operate-box{
    border: 1px solid black;
    position: absolute;
    padding: 10px;
    right: -85px;
    top: 0;
    background: white;
    display: none;
    cursor: pointer;
}
// .operate{
//     width: 10px !important;
//     height: 10px !important;
// }
.operate-box-item{
    // width: 100px;
    // height: 30px;
    background: white;
    cursor: pointer;
    &:hover{
        display: block;
        color: #409EFF;
    }
}
.item-box{
    padding: 20px;
    width: 300px;
    height: 400px;
    border: 1px solid black;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -150px;
    margin-top: -200px;
    text-align: center;
    background: white;
}
.password{
    text-align: left;
}
.sure{
    margin-top: 20px;
    width: 100px;
}
.close{
    float: right;
    font-size: 20px;
    width: 20px;
    height: 20px;
    cursor: pointer;
}
</style>
