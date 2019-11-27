<template>
    <!-- 按钮 -->
    <div class="monitor">
        <div class="button">
            <el-button type="primary" @click="addClass">添加班级</el-button>
            <el-button type="primary" @click="returnStudents">返回账号管理</el-button>
        </div>
        <!-- 表格 -->
        <div class="table">
            <el-table :data= "tableData" border style="width: 50%">
                <el-table-column prop="class" label="班级" width="175"></el-table-column>
                <el-table-column prop="monitor_name" label="班长" width="175"></el-table-column>
                <el-table-column
                    label="操作"
                    width="164">
                    <div>
                        <el-button type="text" size="small" @click="alterClass">修改</el-button>
                        <el-button type="text" size="small" @click="deleteClass">删除</el-button>
                    </div>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { userApi, prefix, responseHandler } from '@/api'
import { Button, Table, Message } from 'element-ui'
export default {
    name: 'Monitor',
    components: {
        [Button.name]: Button,
        [Table.name]: Table,
        [Message.name]: Message
    },
    data(){
        return{
            tableData: []
        }
    },
    methods: {
        // 表格数据
        studentsMonitor(){
            this.$axios.post(prefix.api + userApi.studentsMonitor, {
            }).then((response)=>{
                if(!responseHandler(response.data, this)){
                    Message.error('请求失败')
                }
                Message.success('请求成功')
                this.tableData = response.data.data
            })
        },
        // 返回账号管理
        returnStudents(){
            this.$router.push({ name: 'Students' })
        },
        // 添加班级对话框
        addClass(){
            this.$prompt('请输入该班级班长学号', '添加班级', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(()=>{
                this.$axios.post(prefix.api + userApi.addClass, {
                    account: this.account
                }).then((response)=>{
                    if(!responseHandler(response.data, this)){
                        Message.error('请求失败')
                    }
                    Message.success('请求成功')
                })
            })
        },
        // 修改班级
        alterClass(){
            this.$prompt('请输入该班级班长学号', '修改', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(()=>{
                this.$axios.post(prefix.api + userApi.alterClass, {
                    account: this.account
                }).then((response)=>{
                    if(!responseHandler(response.data, this)){
                        Message.error('请求失败')
                    }
                    Message.success('请求成功')
                })
            })
        },
        // 删除班级
        deleteClass(){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                this.$axios.post(prefix.api + userApi.deleteClass, {
                    account: this.account
                }).then((response)=>{
                    if(!responseHandler(response.data, this)){
                        Message.error('请求失败')
                    }
                    Message.success('请求成功')
                })
            })
        }
    },
    created(){
        this.studentsMonitor()
    }
}
</script>

<style lang="less">
.monitor{
    height: 100%;
    margin: 0;
    margin: 30px;
}
.button{
    display: flex;
    justify-content: space-between;
    margin: 30px;
}
.table{
    margin: 30px;
    position: relative; overflow: auto;
}

</style>
