<template>
    <!-- 后台账户管理系统 -->
    <div class="accounts">
        <!-- 按钮 -->
        <div class="a-button">
            <el-button class="a1-button" type="primary" @click="dialogVisible = true">
                添加账号
            </el-button>
            <el-button class="a1-button" type="primary">导入账号</el-button>
            <el-button class="a1-button" type="primary">班级管理</el-button>
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
            <div class="content-box">
                <div class="content-box-item">1511928321</div>
                <div class="content-box-item">李四</div>
                <div class="content-box-item">男</div>
                <div class="content-box-item">191192747182</div>
                <div class="content-box-item">1503</div>
                <div class="content-box-item">南7-201</div>
                <div class="content-box-item operate">···
                    <div class="operate-box">
                        <div class="operate-box-item" @click='show'>删除</div>
                        <div class="operate-box-item" @click="resetting">重置密码</div>
                        <div class="operate-box-item">重置密码</div>
                        <div class="operate-box-item">重置密码</div>
                </div>
                </div>
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
        width="30%"
        :before-close="handleClose">
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
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 添加账号对话框【完】 -->
        <!-- 学生个人信息表格中操作弹出框 -->
        
        <!-- 学生个人信息表格中操作弹出框【完】 -->
    </div>
</template>

<script>
import { userApi, prefix, responseHandler } from '@/api'
import { Button, Table, Input, Message, Pagination, Dropdown, Select, Dialog } from 'element-ui'
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
            // 是否弹出添加账号对话框
            dialogVisible: false,
            // 添加账号中的内容
            account: '',
            name: '',
            sex: '',
            contact: '',
            class_grade: '',
            dormitory: '',
            operate: '',
            // 添加账号中的内容【完】
            // 表格中的内容
            tableData: [{
                num: '151110058',
                name: '王小虎',
                sex: '男',
                contact: '18813211223',
                grade: '1503',
                dormitory: '南7-201南7-201南7-201南7-201南7-201南7-201南7-201南7-201南7-201'
            }, {
                num: '151110058',
                name: '王小虎',
                sex: '男',
                contact: '18813211223',
                grade: '1503',
                dormitory: '南7-201'
            }, {
                num: '151110058',
                name: '王小虎',
                sex: '男',
                contact: '18813211223',
                grade: '1503',
                dormitory: '南7-201'
            }, {
                num: '151110058',
                name: '王小虎',
                sex: '男',
                contact: '18813211223',
                grade: '1503',
                dormitory: '南7-201'
            }, {
                num: '151110058',
                name: '王小虎',
                sex: '男',
                contact: '18813211223',
                grade: '1503',
                dormitory: '南7-201'
            }, {
                num: '151110058',
                name: '王小虎',
                sex: '男',
                contact: '18813211223',
                grade: '1503',
                dormitory: '南7-201'
            }]
            
        }
    },
    methods: {
        resetting(){
            console.log('重置')
        },
        show(){
            console.log('删除')
        },
        // 添加账号框却认关闭窗口
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done()
                })
                .catch(_ => {})
        },
        // 获取添加账号中的内容
        addAccount(){
            // 判断输入框是否为空
            if(this.account === '' || this.name === '' || this.sex === '' || this.contact === '' || this.class_grade === '' || this.dormitory === ''){
                Message.error('输入框不能为空！')
                return
            }
            this.$axios.post(prefix.api + userApi.addAccount, {
                account: this.account,
                name: this.name,
                sex: this.sex,
                contact: this.contact,
                class_grade: this.class_grade,
                dormitory: this.dormitory
            }).then((response)=>{
                console.log(response)
                if(!responseHandler(response.data, this)){
                    Message.error('请求失败')
                }
                Message.success('请求成功')
            })
            this.dialogVisible(false)
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
    right: 0;
    top: 35px;
    background: white;
    display: none;
}
</style>
