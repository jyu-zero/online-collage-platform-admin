<template>
    <!-- 后台账户管理系统 -->
    <div class="accounts">
        <!-- 添加两个按钮 -->
        <el-button type="primary" value="add" @click="addAccount" v-if="isTeacher">添加账号</el-button>
        <el-button type="primary"  value="insert">导入账号</el-button>
        <!-- 插入表格 -->
        <el-table
        :data="accountList"
        border
        style="width: 80%">
        <el-table-column
            fixed
            prop="account"
            label="学号"
            align="center">
        </el-table-column>
        <el-table-column
            prop="admin_role_id"
            label="账号类型"
            align="center">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            align="center">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
            align="center">
        </el-table-column>
        <el-table-column
            prop="contact"
            label="联系方式"
            align="center">
        </el-table-column>
        <el-table-column
            prop="time"
            label="账号到期时间"
            align="center">
        </el-table-column>
        <el-table-column
            label="操作"
            align="center">
            <!-- 操作选择项 -->
            <template slot-scope="scope">
                <el-select v-model="scope.row.option" placeholder="请选择" clearable @change="chooseOption(scope)" value-key="scope.row.account">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="false">
                    </el-option>
                </el-select>
            </template>
        </el-table-column>
        </el-table>

        <!-- 添加分页功能 -->
        <el-pagination
            background
            layout="prev, pager, next"
            @current-change="getAccounts"
            :total="50">
        </el-pagination>

        <!-- 降级弹窗 -->
        <el-dialog :disabled="true"
        title="提示"
        :visible.sync="dialogVisible1"
        width="28%">
        <span>确定要降级为学生账号吗？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="degrade">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 删除弹窗 -->
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible2"
        width="28%">
        <span>确定要删除账号吗？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="deleteAccount">确 定</el-button>
        </span>
        </el-dialog>

    </div>
</template>

<script>
// import responseHandler from '@/utils/responseHandler'
import { prefix, responseHandler, userApi } from '@/api'
import { Button, Table, TableColumn, Select, Option, Pagination, Message, Alert, Dialog } from 'element-ui'

export default {
    name: 'Accounts',
    components: {
        [Button.name]: Button,
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        [Select.name]: Select,
        [Option.name]: Option,
        [Pagination.name]: Pagination,
        [Message.name]: Message,
        [Alert.name]: Alert,
        [Dialog.name]: Dialog
    },
    data(){
        return{
            account: '',
            dialogVisible1: false,
            dialogVisible2: false,
            admin_role_id: '',
            isTeacher: false,
            isDegrade: false,
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
            accountList: []
        }
    },
    mounted() {
        this.getAccounts()
        this.admin_role_id = this.$route.query.admin_role_id
        if(this.admin_role_id === '老师'){
            this.isTeacher = true
        }
    },
    methods: {
        // 获取账号表格
        getAccounts(page = 1){
            this.$axios.get(prefix.api + userApi.getAccounts, {
                params: {
                    page
                }
            }).then((response)=>{
                if(!responseHandler(response.data, this)){
                    Message.error('获取账号失败')
                }
                this.accountList = response.data.data.information
                Message.success('获取账号成功')
                // this.$route.push({
                //     params: {
                //         admin_role_id: response.data.information.admin_role_id
                //     }
                // })
                // this.admin_role_id = response.data.information.admin_role_id
                // console.log(this.admin_role_id)
            })
        },
        // 处理操作选择项
        chooseOption(scope){
            if(scope.row.option === '1'){
                this.$router.push({ name: 'resetPasswd',
                    params: {
                        account: scope.row.account
                    }
                })
            }
            if(scope.row.option === '2'){
                this.$router.push({ name: 'modifyInfo',
                    params: {
                        account: scope.row.account
                    }
                })
            }
            if(scope.row.option === '3'){
                this.dialogVisible1 = true
                this.account = scope.row.account
            }
            if(scope.row.option === '4'){
                this.dialogVisible2 = true
                this.account = scope.row.account
            }
        },
        // 添加账号
        addAccount(){
            this.$router.push({ name: 'addAccounts' })
        },
        // 降级为学生账号
        degrade(){
            this.admin_role_id = this.$route.params.admin_role_id
            if(this.admin_role_id === '老师'){
                Message.error('无法降级')
                return
            }
            this.$axios.post(prefix.api + userApi.degrade, {
                account: this.account
            }).then((response)=>{
                if(!responseHandler(response.data, this)){
                    Message.error('降级失败')
                    return
                }
                Message.success('降级成功')
            })
        },
        // 删除账号
        deleteAccount(){
            this.$axios.post(prefix.api + userApi.deleteAccount, {
                account: this.account
            }).then((response)=>{
                if(!responseHandler(response.data, this)){
                    Message.error('删除失败')
                    return
                }
                Message.success('删除成功')
            })
        }
        // 关闭处理按钮
        // handleClose(done) {
        //     this.$confirm('确认关闭？')
        //         .then(_ => {
        //             done()
        //         })
        //         .catch(_ => {})
        // }
    }
}
</script>

<style lang="less" scoped>
@boxheight:50px;
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
    .el-dropdown-link {
        color: #409EFF;
    }
    .el-pagination{
        display: flex;
        justify-content: center;
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

.operate-box{
    border: 1px solid black;
    position: absolute;
    padding: 10px;
    right: 0;
    top: 35px;
    background: white;
    display: none;
}
.el-dialog {
    width: 100px;
    height: 36px;
    title {
        font-size: 30px;
    }
}
</style>
