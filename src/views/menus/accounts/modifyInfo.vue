<template>
    <div class="modifyInfo">
        <h1>修改信息</h1>
            <div class="input-items">
            <label class="item" for="admin_role_id">账号类型：</label>
                <el-input v-model="admin_role_id"></el-input>
            </div>
            <div class="input-items">
            <label class="item" for="name">姓名：</label>
                <el-input v-model="name"></el-input>
            </div>
            <div class="input-items">
            <label class="item" for="sex">性别：</label>
                <el-input v-model="sex"></el-input>
            </div>
            <div class="input-items">
            <label class="item" for="contact">联系方式：</label>
                <el-input v-model="contact"></el-input>
            </div>
        <el-button type="primary" @click="modifyInfo">确定</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
    </div>
</template>
<script>
import { prefix, responseHandler, userApi } from '@/api'
import { Input, Button, Message } from 'element-ui'
export default {
    name: 'modifyInfo',
    components: {
        [Input.name]: Input,
        [Button.name]: Button,
        [Message.name]: Message
    },
    data(){
        return {
            admin_role_id: this.admin_role_id,
            name: this.name,
            sex: this.sex,
            contact: this.contact
        }
    },
    methods: {
        // 修改信息
        modifyInfo(){
            this.$axios.post(prefix.api + userApi.modifyInfo, {
                account: this.account,
                admin_role_id: this.admin_role_id,
                name: this.name,
                sex: this.sex,
                contact: this.contact
            }).then((response)=>{
                if(!responseHandler(response.data, this)){
                    Message.error('修改失败')
                }
                Message.success('修改成功')
                this.$router.push({ name: 'Accounts' })
            })
        },
        // 取消
        cancel(){
            this.$router.push({ name: 'Accounts' })
        }
    }
}
</script>
<style lang="less" scoped>
.modifyInfo {
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
