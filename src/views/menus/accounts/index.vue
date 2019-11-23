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

        <el-table
        :data="tableData"
        border
        style="width: 100%">
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
            width="120"
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
            width="150"
            align="center">
            <!-- <template slot-scope="scope">
                <el-popover
                placement="top"
                width="160"
                v-model="visible"
                >
                    <p >这是一段内容这是一段内容确定删除吗？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
                    </div>
                    <el-button slot="reference" @click="zxc(scope.row)">删除</el-button>
                </el-popover>
            </template> -->

        <template slot-scope="scope">
            <el-select placeholder="请选择"   @change="zxc(scope)" value-key="scope.row.id" v-model="scope.row.option">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </template>
        </el-table-column>
        </el-table>
        <div class="delete-box" v-if="isDelete">
            <div>你确定要删除账号</div>
            <el-button type="primary" @click="sentDelete">确定</el-button>
        </div>
        <!-- 添加分页功能 -->
        <!-- <el-pagination
            background
            layout="prev, pager, next"
            @current-change="getAccountList"
            :page-count="pageCount">
        </el-pagination> -->

    </div>
</template>

<script>
// import responseHandler from '@/utils/responseHandler'
import { Button, Table, TableColumn, Select, Option, Pagination, Dropdown, DropdownMenu, DropdownItem, Popover, Message } from 'element-ui'
import { prefix, userApi } from '@/api'
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
        [DropdownItem.name]: DropdownItem,
        [Popover.name]: Popover,
        [Message.name]: Message
    },
    data(){
        return{
            account: '',
            isDelete: false,
            visible: false,
            datez: '',
            fa: 0,
            options: [{
                value: 0,
                label: '重置密码'
            }, {
                value: 1,
                label: '修改信息'
            }, {
                value: 2,
                label: '降级为学生账号'
            }, {
                value: 3,
                label: '删除账号'
            }],
            value: [],
            tableData: [{
                id: '1',
                account: '123456789',
                accountType: '学生管理员',
                name: 'XXX',
                sex: '女',
                contact: '0663-1008611',
                time: '2019.11.12',
                // pageCount: 1,
                accountList: [
                
                ] }, {
                id: '2',
                account: '123456',
                accountType: '学生',
                name: 'XXX',
                sex: '男',
                contact: '0663-1008611',
                time: '2019.11.12',
                // pageCount: 1,
                accountList: [
                
                ] }, {
                id: '3',
                account: '1234567',
                accountType: '老师',
                name: 'XXX',
                sex: '男',
                contact: '0663-1008611',
                time: '2019.11.12',
                // pageCount: 1,
                accountList: [
                
                ] }, {
                id: '4',
                account: '12345678',
                accountType: '学生',
                name: 'XXX',
                sex: '女',
                contact: '0663-1008611',
                time: '2019.11.12',
                // pageCount: 1,
                accountList: [
                
                ] }, {
                id: '5',
                account: '1234567',
                accountType: '老师',
                name: 'XXX',
                sex: '男',
                contact: '0663-1008611',
                time: '2019.11.12',
                // pageCount: 1,
                accountList: [
                
                ] }
            ]
        }
    },
    methods: {
        sentDelete(){
            this.$axios.post(prefix.api + userApi.delete, {
                account: this.account
            }).then((res)=>{ Message.success('请求成功') })
        },
        zxc(a){
            console.log(a)
            if(a.row.option === 0){
                this.$router.push({ name: 'Ressetting' })
            }
            if(a.row.option === 3){
                this.isDelete = true
                this.account = a.row.account
                console.log(this.account)
            }
            // switch(a){
            //     case 0:
            //         this.$router.push({ name: 'Ressetting' })
            // }
            // console.log(this.options[a].option)
        },
        currentSel(selval){
            console.log(selval)
        },
        addAccount(){
            
        },
        insertAccount(){

        },
        handleClick(row){
            console.log(row)
        },
        getAccountList(page = 1){
            
        },
        logout(){
           
        },
        handleCommand(command) {
            this.$message('click on item ' + command)
        }
    }
}
</script>

<style lang="less" scoped>
.accounts{
    height:100%;
    // display: flex;
    // flex-direction: column;
    .el-button{
        margin: 30px 0 30px 36px;
    }
    .el-table{
        margin: 0 auto;
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
    .el-icon-arrow-down {
        font-size: 12px
    }
    .el-pagination{
        margin:0 auto;
    }
}
.delete-box{
    width: 100px;
    height: 100px;
    border:1px solid black;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -50px;
    margin-top: -50px;
}

</style>
