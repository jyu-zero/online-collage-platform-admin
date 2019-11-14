<template>
<!-- 登录页 -->
    <div class="login">
        <h1 align="center">线上学院后台管理系统</h1>
            <div style="margin: 0;"></div>
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <!-- <font-awesome-icon icon="user-o"/> -->
                <el-form-item label="账号：">
                    <el-input v-model="formLabelAlign.id"></el-input>
                </el-form-item>
                <el-form-item label="密码：">
                    <el-input v-model="formLabelAlign.passwd" show-password></el-input>
                </el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
            </el-form>
        </div>
    
</template>

<script>
import { prefix, responseHandler, testApi } from '@/api'
import { Form, FormItem, Button } from 'element-ui'
export default {
    name: 'Login',
    components: {
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Button.name]: Button
    },
    data(){
        return{
            labelPosition: 'right',
            formLabelAlign: {
                id: '',
                passwd: ''
            }
        }
    },
    methods: {
        login() {
            // 登录验证
            if(this.formLabelAlign.id.trim() === '') {
                this.$message.error({
                    message: '请输入账号',
                    duration: 3000
                })
                return
            }
            if(this.formLabelAlign.passwd.trim() === '') {
                this.$message.error({
                    message: '请输入密码',
                    duration: 3000
                })
                return
            }
            this.$axios
                .post(prefix.api + testApi.test, {
                    id: this.id,
                    passwd: this.passwd
                })
                .then(response =>{
                    if(!responseHandler.handle(response.data, this)){ return }
                    this.$router.push({ name: 'overview' })
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
        margin-bottom: 50px;
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

}

</style>
