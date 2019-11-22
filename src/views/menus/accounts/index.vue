<template>
    <!-- 后台账户管理系统 -->
    <div class="accounts">
        <!-- 添加两个按钮 -->
        <el-button type="primary" value="add" @click="addAccount">添加账号</el-button>
        <el-button type="primary"  value="insert" @click="insertAccount">导入账号</el-button>

        <!-- <div class="table">
            <div class="title" id="id">学号</div>
            <div class="title" id="type">账号类型</div>
            <div class="title" id="name">姓名</div>
            <div class="title" id="sex">性别</div>
            <div class="title" id="phone">联系方式</div>
            <div class="title" id="deadline">账号到期时间</div>
            <div class="title">操作</div>
        </div> -->
        <!-- 添加表格组件 -->
        <el-table
        :data="tableData"
        border
        style="width: 80%">
        <el-table-column
            fixed
            prop="account"
            label="学号"
            width="180"
            align="center">
        </el-table-column>
        <el-table-column
            prop="accountType"
            label="账号类型"
            width="180"
            align="center">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="120"
            align="center">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
            width="108"
            align="center">
        </el-table-column>
        <el-table-column
            prop="contact"
            label="联系方式"
            width="180"
            align="center">
        </el-table-column>
        <el-table-column
            prop="time"
            label="账号到期时间"
            width="180"
            align="center">
        </el-table-column>
        <el-table-column
            label="操作"
            width="120"
            align="center">
            <!-- 在表格组件中嵌套下拉菜单组件 -->
                <template slot-scope="scope">
                    <el-dropdown>
                    <span class="el-dropdown-link">
                        ···<i class="el-icon--left"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click="resetPasswd(scope.row)">重置密码</el-dropdown-item>
                        <el-button type="text" @click="open">点击打开 Message Box</el-button>
                        <el-dropdown-item @click="modifyInfo">修改信息</el-dropdown-item>
                        <el-dropdown-item @click="degrade">降级为学生账号</el-dropdown-item>
                        <el-dropdown-item @click="deleteId">删除账号</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </template>

        </el-table-column>
        </el-table>

        <!-- 添加分页功能 -->
        <el-pagination
            background
            layout="prev, pager, next"
            @current-change="getAccountList"
            :page-count="pageCount">
        </el-pagination>

    </div>
</template>

<script>
// import responseHandler from '@/utils/responseHandler'
import { Button, Table, TableColumn, Select, Option, Pagination, Dropdown, DropdownMenu, DropdownItem } from 'element-ui'

export default {
    name: 'Accounts',
    components: {
        [Button.name]: Button,
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        [Select.name]: Select,
        [Option.name]: Option,
        [Pagination.name]: Pagination,
        [Dropdown.name]: Dropdown,
        [DropdownMenu.name]: DropdownMenu,
        [DropdownItem.name]: DropdownItem
    },
    data(){
        return{
            tableData: [{
                account: '123456789',
                accountType: '学生管理员',
                name: 'XXX',
                sex: '女',
                contact: '0663-1008611',
                time: '2019.11.12',
                // pageCount: 1,
                accountList: [
                
                ] }, {
                account: '123456789',
                accountType: '学生',
                name: 'XXX',
                sex: '男',
                contact: '0663-1008611',
                time: '2019.11.12',
                // pageCount: 1,
                accountList: [
                
                ] }, {
                account: '123456789',
                accountType: '老师',
                name: 'XXX',
                sex: '男',
                contact: '0663-1008611',
                time: '2019.11.12',
                // pageCount: 1,
                accountList: [
                
                ] }, {
                account: '123456789',
                accountType: '学生',
                name: 'XXX',
                sex: '女',
                contact: '0663-1008611',
                time: '2019.11.12',
                // pageCount: 1,
                accountList: [
                
                ] }
            ]
        }
    },
    methods: {
        addAccount(){
            this.$router.push({ name: 'addAccounts' })
        },
        insertAccount(){

        },
        resetPasswd(row){
            console.log(row)
            this.$router.push({ name: 'resetPasswd' })
        },
        modifyInfo(){
            alert('降级')
        },
        deleteId(){
            alert('删除')
        },
        getAccountList(page = 1){
            
        },
        logout(){
           
        },
        open() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        }
    }
}
</script>

<style lang="less" scoped>
.accounts{
    height: 100%;
    // display: flex;
    // flex-direction: column;
    .el-button{
        margin: 30px -5px 30px 40px;
    }
    .el-table{
        margin-left: 50px;
    }
    // .table{
    //     margin: 0 auto;
    //     display: flex;
    //     font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    //     font-size: 18px;
    //     .title{
    //         padding: 10px 10px;
    //         border: 1px solid black;
    //         text-align: center;
    //     }
    //     div:nth-child(n+2){
    //         border-left: none;
    //     }
    // }
    .el-dropdown-link {
        color: #409EFF;
        &:hover {
            cursor: pointer;
        }
    }
    .el-pagination{
        margin: 0 auto;
    }
}

</style>
