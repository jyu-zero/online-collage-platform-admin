<template>
    <div class="resetPasswd">
        <h1>重置密码</h1>
        <label for="input">输入旧密码</label>
        <el-input v-model="old_password" show-password></el-input>
        <label for="new-input">输入新密码</label>
        <el-input v-model="new_password" show-password></el-input>
        <label for="re-input">再次输入新密码</label>
        <el-input v-model="re_password" show-password></el-input>
        <el-button type="primary" @click="resetPasswd">确定</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
    </div>
</template>
<script>
import { prefix, responseHandler, userApi } from '@/api'
import { Input, Button, Message } from 'element-ui'
export default {
    name: 'resetPasswd',
    components: {
        [Input.name]: Input,
        [Button.name]: Button,
        [Message.name]: Message
    },
    data(){
        return{
            old_password: this.old_password,
            new_password: '',
            re_password: ''
        }
    },
    methods: {
        resetPasswd(){
            if(this.old_password.trim() === ''){
                Message.error('输入密码不能为空')
                return
            }
            if(this.old_password === this.new_password){
                Message.error('更改密码一致，请重新输入')
                return
            }
            if(this.new_password !== this.re_password){
                Message.error('两次输入密码不一致，请重新输入')
                return
            }
            this.$axios.post(prefix.api + userApi.resetPasswd, {
                old_password: this.old_password,
                new_password: this.new_password,
                account: this.account
            }).then((response)=>{
                if(!responseHandler(response.data, this)){
                    Message.error('重置失败')
                }
                Message.success('重置成功')
                this.account = this.$route.query.account
                this.$router.push({ name: 'Accounts' })
            })
        },
        cancel(){
            this.$router.push({ name: 'Accounts' })
        }
    }
}
</script>
<style lang="less" scoped>
.resetPasswd {
    width: 300px;
    margin: 0 auto;
    h1 {
        margin-top: 20px;
        text-align: center;
    }
    .el-input {
        margin-bottom: 15px;
    }
    .el-button {
        float: right;
        margin-left: 10px;
    }
}

</style>
