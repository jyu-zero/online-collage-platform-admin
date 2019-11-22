<template>
    <div class="resetPasswd">
        <h1>重置密码</h1>
        <label for="input">输入新密码</label>
        <el-input v-model="input" show-password></el-input>
        <label for="re-input">再次输入新密码</label>
        <el-input v-model="input" show-password></el-input>
        <el-button type="primary">确定</el-button>
        <el-button type="primary">取消</el-button>
    </div>
</template>
<script>
import { Input, Button } from 'element-ui'
export default {
    name: 'resetPasswd',
    components: {
        [Input.name]: Input,
        [Button.name]: Button
    },
    data(){
        return{
            input: ''
        }
    }
}
</script>
<style lang="less" scoped>
.resetPasswd {
    width: 480px;
    margin: 0 auto;
    h1 {
        margin-top: 20px;
        text-align: center;
    }，
    .el-input {
        width: 300px;
    }
}

</style>
