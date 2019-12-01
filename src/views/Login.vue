<template>
<!-- 登录页 -->
    <div class="login">
        <h1 align="center">线上学院后台管理系统</h1>
            <div style="margin: 0;"></div>
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <!-- <font-awesome-icon icon="user-o"/> -->
                <el-form-item label="账号：">
                    <el-input v-model="formLabelAlign.account"></el-input>
                </el-form-item>
                <el-form-item label="密码：">
                    <el-input v-model="formLabelAlign.password" show-password></el-input>
                </el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
            </el-form>
        </div>
    
</template>

<script>
import { prefix, userApi, responseHandler } from '@/api'
import { Form, FormItem, Button, Input, Message } from 'element-ui'
export default {
    name: 'Login',
    components: {
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Button.name]: Button,
        [Input.name]: Input,
        [Message.name]: Message
    },
    data(){
        return{
            labelPosition: 'right',
            formLabelAlign: {
                account: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            // 登录验证
            if(this.formLabelAlign.account.trim() === '') {
                Message.error('请输入账号!')
                return
            }
            if(this.formLabelAlign.password.trim() === '') {
                Message.error('请输入密码!')
                return
            }
            this.$axios.post(prefix.api + userApi.login, {
                account: this.formLabelAlign.account,
                password: this.formLabelAlign.password
            }).then((response) =>{
                if(!responseHandler(response.data, this)){
                    Message.error('登录失败')
                    return
                }
                Message.success('登陆成功')
                this.$router.push({ name: 'Overview' })
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login{
    height:100%;
    display: flex;
    flex-direction: column;
    background: url(background.jpg) no-repeat;
    background-size: 100%;
    h1{
        margin: 60px;
    }
    .el-form{
        margin:0 auto;
        padding: 30px;
        border: 1px solid rgb(110, 110, 110);
        
    }
    .el-input{
        width:250px;
    }
    .el-button{
        margin: 10px 30px;
        width: 300px;
    }

    @media screen and (max-width: 500px){
        .login {
            width: 100%;
        }
    }
}
* {
    box-sizing: border-box;
}

</style>
