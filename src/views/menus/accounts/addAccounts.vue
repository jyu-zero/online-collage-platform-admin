<template>
    <div class="addAccounts">
        <h1>添加账号</h1>
            <div class="input-items">
            <label class="item" for="account">账号：</label>
                <el-input v-model="input"></el-input>
            </div>
            <div class="input-items">
            <label class="item" for="style">账号类型：</label>
                <el-input v-model="input"></el-input>
            </div>
            <div class="input-items">
            <label class="item" for="name">姓名：</label>
                <el-input v-model="input"></el-input>
            </div>
            <div class="input-items">
            <label class="item" for="sex">性别：</label>
                <el-input v-model="input"></el-input>
            </div>
            <div class="input-items">
            <label class="item" for="phone">联系方式：</label>
                <el-input v-model="input"></el-input>
            </div>
            <div class="input-items">
            <label class="item" for="time">到期时间：</label>
                <el-input v-model="input"></el-input>
            </div>
        <el-button type="primary" >确定</el-button>
        <el-button type="primary">取消</el-button>
    </div>
</template>

<script>
import { Form, FormItem, Input, Button } from 'element-ui'
export default {
    name: 'addAccounts',
    components: {
        [Form.name]: Form,
        [FormItem.name]: FormItem,
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
.addAccounts {
    width: 320px;
    margin: 0 auto;
    .input-items {
        display: flex;
        label {
            display: block;
            margin-bottom: 10px;
            font-size: 15px;
            color: #555;
            width: 100px;
            line-height: 48px;
        }
    }
    h1 {
        margin-top: 20px;
        text-align: center;
    }
    .el-button {
        float: right;
        margin-left: 10px;
    }
}

</style>
