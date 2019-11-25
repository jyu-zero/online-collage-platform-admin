<template>
    <!-- 后台账户管理系统 -->
    <div class="accounts">
        <!-- 添加两个按钮 -->
        <el-button type="primary" value="add" @click="addAccount">添加账号</el-button>
        <el-button type="primary"  value="insert" @click="insertAccount">导入账号</el-button>

        <el-table
        :data="tableData"
        border
        style="width: 85%">
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
            width="186"
            align="center">
            <!-- 在表格组件中嵌套下拉菜单组件 -->
            <!-- <div class="handleCommand" @click="handleCommand">···
            </div> -->
            <template slot-scope="scope">
                <el-select v-model="scope.row.option" placeholder="请选择" @change="abc(scope)" value-key="scope.row.id">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </template>
                <!-- <template slot-scope="scope">
                    <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        ···<i class="el-icon--left"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="resetPasswd" @change="abc(scope)">重置密码</el-dropdown-item>
                        <el-dropdown-item command="modifyInfo">修改信息</el-dropdown-item>
                        <el-dropdown-item command="degrade">降级为学生账号</el-dropdown-item>
                        <el-dropdown-item command="deleteId">删除账号</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </template> -->

        </el-table-column>
        </el-table>

        <!-- 添加分页功能 -->
        <!-- <el-pagination
            background
            layout="prev, pager, next"
            @current-change="getAccounts"
            :page-count="pageCount"
            :total="50">
        </el-pagination> -->

    </div>
</template>

<script>
// import responseHandler from '@/utils/responseHandler'
import { prefix, responseHandler, userApi } from '@/api'
import { Button, Table, TableColumn, Select, Option, Pagination, Dropdown, DropdownMenu, DropdownItem, Message } from 'element-ui'

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
        [Message.name]: Message
    },
    data(){
        return{
            pageCount: 1,
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
            }],
            value: '',
            tableData: []
        }
    },
    created() {
        this.getAccounts()
    },
    methods: {
        getAccounts(page = 1){
            this.$axios.get(prefix.api + userApi.getAccounts, {
                params: {
                    page
                }
            }).then((response)=>{
                if(!responseHandler(response.data, this)){
                // 在这里处理错误
                    Message.error('请求失败')
                }
                this.pageCount = response.data.data.pageCount
                this.tableData = response.data.data.information
                Message.success('请求成功')
            })
        },
        addAccount(){
            this.$router.push({ name: 'addAccounts' })
        },
        insertAccount(){

        },
        handleCommand(command){
            this.$message('click on item ' + command)
        },
        abc(z){
            if(z.row.option === '1'){
                this.$router.push({ name: 'resetPasswd' })
            }
            if(z.row.option === '2'){
                this.$router.push({ name: 'modifyInfo' })
            }
            if(z.row.option === '3'){
                
            }
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
    .handleCommand{
        display: block;
        color: #409EFF;
        &:hover{
            // width: 180px;
            // height: 200px;
            // border: 1px solid rgb(155, 155, 155);
            cursor: pointer;
        }
    }
}

</style>
