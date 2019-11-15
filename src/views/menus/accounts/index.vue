<template>
    <!-- 后台账户管理系统 -->
    <div class="accounts">
        <!-- 添加两个按钮 -->
        
        <el-button type="primary" value="add" @click="addAccount">添加账号</el-button>
        <el-button type="primary"  value="insert" @click="insertAccount">导入账号</el-button>
        
    <main>
        
        <el-table
            :data="tableData"
            border
            style="width:80%">
            <el-table-column
            fixed
            prop="account-id"
            label="学号"
            align="center"
            width="150">
            </el-table-column>
            <el-table-column
            prop="account-type"
            label="账号类型"
            align="center"
            width="150">
            </el-table-column>
            <el-table-column
            prop="account-name"
            label="姓名"
            align="center"
            width="100">
            </el-table-column>
            <el-table-column
            prop="account-sex"
            label="性别"
            align="center"
            width="100">
            </el-table-column>
            <el-table-column
            prop="account-phone"
            label="联系方式"
            align="center"
            width="180">
            </el-table-column>
            <el-table-column
            prop="account-deadline"
            label="账号到期时间"
            align="center"
            width="180">
            </el-table-column>
            <el-table-column
            fixed="right"
            align="center"
            label="操作"
            width="120">
            <template slot-scope="scope">
                <el-select @click="handleClick(scope.row)" type="text">
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
        <!-- <div class="account-list" v-for="(accountItem,index) in accountList" :key="index">
            <p class="account-type">{{accountItem.type}}</p>
            <p class="account-name">{{accountItem.name}}</p>
            <p class="account-sex">{{accountItem.sex}}</p>
            <p class="account-phone">{{accountItem.phone}}</p>
            <p class="account-deadline">{{accountItem.deadline}}</p>
            <p class="account-operate">{{accountItem.operate}}</p>
        </div>  -->
        <el-pagination
            background
            layout="prev, pager, next"
            @current-change="getAccountList"
            :page-count="pageCount">
        </el-pagination>

        </main>
    </div>
</template>

<script>
// import responseHandler from '@/utils/responseHandler'
import { Button, Table, TableColumn, Select, Option, Pagination } from 'element-ui'
export default {
    name: 'Accounts',
    components: {
        [Button.name]: Button,
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        [Select.name]: Select,
        [Option.name]: Option,
        [Pagination.name]: Pagination
    },
    data(){
        return{
            tableData: [{
                accountId: '171100247',
                accountType: '学生管理员',
                accoutnName: '蔡小小',
                accountSex: '女',
                accountPhone: '742777',
                accountDeadline: '2019.11.12',
                pageCount: 1,
                accountList: [
                
                ] }
            ],
            options: [{
                value: '1',
                label: '重置密码'
            }, {
                value: '2',
                label: '修改信息'
            }, {
                value: '3',
                label: '降级为学生账号'
            }, {
                value: '4',
                label: '删除账号'
            } ],
            value: ''
        }
    },
    
    methods: {
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
        margin: 30px 20px 30px 36px;
    }
    .el-table{
        margin-left: 36px;
        margin-bottom: 30px;

    }
    .el-pagination{
        margin:0 auto;
    }
}
</style>
