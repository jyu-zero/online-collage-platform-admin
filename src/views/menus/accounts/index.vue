<template>
    <!-- 后台账户管理系统 -->
    <div class="accounts">
        <!-- 添加两个按钮 -->
        <el-button type="primary" value="add" @click="addAccount">添加账号</el-button>
        <el-button type="primary"  value="insert" @click="insertAccount">导入账号</el-button>
        <el-table
            :data="tableData"
            border
            style="width:80%">
            <el-table-column
            fixed
            prop="id"
            label="学号"
            align="center"
            width="150">
            </el-table-column>
            <el-table-column
            prop="type"
            label="账号类型"
            align="center"
            width="150">
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            align="center"
            width="120">
            </el-table-column>
            <el-table-column
            prop="sex"
            label="性别"
            align="center"
            width="100">
            </el-table-column>
            <el-table-column
            prop="phone"
            label="联系方式"
            align="center"
            width="200">
            </el-table-column>
            <el-table-column
            prop="deadline"
            label="账号到期时间"
            align="center"
            width="200">
            </el-table-column>
            <el-table-column
            fixed="right"
            align="center"
            label="操作"
            width="120">
            <!-- <div class="block">
            <span class="demonstration"></span>
            <el-cascader
                v-model="value"
                :options="options"
                @change="handleChange"></el-cascader>
            </div> -->
                <el-dropdown height="100%">
                <span class="el-dropdown-link">
                    ···<i class="el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>重置密码</el-dropdown-item>
                    <el-dropdown-item>修改信息</el-dropdown-item>
                    <el-dropdown-item>降级为学生账号</el-dropdown-item>
                    <el-dropdown-item>删除账号</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <!-- <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template> -->
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
import { Table, Button } from 'element-ui'
export default {
    name: 'Accounts',
    data(){
        return{
            // value: [],
            // options: [{
            //     value: 'ziyuan',
            //     label: '资源',
            //     children: [{
            //         value: 'axure',
            //         label: 'Axure Components'
            //     }, {
            //         value: 'sketch',
            //         label: 'Sketch Templates'
            //     }, {
            //         value: 'jiaohu',
            //         label: '组件交互文档'
            //     }]
            // }],
            tableData: [{
                id: '171100247',
                type: '学生管理员',
                name: '蔡小小',
                sex: '女',
                phone: '742777',
                deadline: '2019.11.12',
                // pageCount: 1,
                accountList: [
                
                ] }, {
                id: '171100247',
                type: '学生管理员',
                name: '蔡小小',
                sex: '女',
                phone: '742777',
                deadline: '2019.11.12',
                // pageCount: 1,
                accountList: [
                
                ] }, {
                id: '171100247',
                type: '学生管理员',
                name: '蔡小小',
                sex: '女',
                phone: '742777',
                deadline: '2019.11.12',
                // pageCount: 1,
                accountList: [
                
                ] }, {
                id: '171100247',
                type: '学生管理员',
                name: '蔡小小',
                sex: '女',
                phone: '742777',
                deadline: '2019.11.12',
                // pageCount: 1,
                accountList: [
                
                ] }
            ]
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
        margin: 30px 0 30px 36px;
    }
    .el-table{
        margin-left: 36px;
        margin-bottom: 30px;
    }
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
</style>
