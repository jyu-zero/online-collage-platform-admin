<template>
    <div class="resetPasswd">
        <h1>重置密码</h1>
        <label for="input">输入旧密码</label>
        <el-input v-model="old_password" show-password></el-input>
        <label for="re-input">输入新密码</label>
        <el-input v-model="new_password" show-password></el-input>
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
            old_password: '',
            new_password: ''
        }
    },
    methods: {
        resetPasswd(){
            this.$axios.post(prefix.api + userApi.resetPasswd, {
                old_password: this.old_password,
                new_password: this.new_password,
                account: this.account
            }).then((response)=>{
                console.log(response)
                if(!responseHandler(response.data, this)){
                // 在这里处理错误
                    Message.error('请求失败')
                }
                Message.success('请求成功')
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
