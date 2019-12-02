<template>
    <!-- 后台账户管理系统 -->
    <div class="accounts">
        <!-- 添加两个按钮 -->
        <el-button type="primary" value="add" @click="addAccount" v-if="isTeacher">添加账号</el-button>
        <el-button type="primary"  value="insert" @click="uploadAccounts = true">导入账号</el-button>
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
            @current-change="getCurrentPage"
            :page-count="pageCount">
        </el-pagination>

        <!-- 降级弹窗 -->
        <el-dialog :disabled="true"
        title="提示"
        :visible.sync="degradeMessageBox"
        width="28%">
        <span>确定要降级为学生账号吗？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="degradeMessageBox = false">取 消</el-button>
            <el-button type="primary" @click="degrade">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 删除弹窗 -->
        <el-dialog
        title="提示"
        :visible.sync="delMessageBox"
        width="28%">
        <span>确定要删除账号吗？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="delMessageBox = false">取 消</el-button>
            <el-button type="primary" @click="deleteAccount">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 导入账号的div弹窗 -->
        <div class="lead-box" v-if="uploadAccounts">
            <div class="close" v-on:click="uploadAccounts = false">×</div>
            <h3 style="margin-top: 8px;">导入账号</h3>
            <div align="center">
            <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-change="hangdChange"
                :file-list="fileList"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button size="small" type="success" @click="submitUpload">上传</el-button>
                <div class="el-upload__tip">注意：只能上传Excel文件！</div>
            </el-upload>
            </div>
        </div>
    </div>
</template>

<script>
import { prefix, responseHandler, userApi } from '@/api'
import { Button, Table, TableColumn, Select, Option, Pagination, Message, Alert, Dialog, Upload } from 'element-ui'

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
        [Dialog.name]: Dialog,
        [Upload.name]: Upload
    },
    data(){
        return{
            account: '',
            admin_role_id: '',
            accountList: [],
            // 降级弹窗
            degradeMessageBox: false,
            // 删除账号弹窗
            delMessageBox: false,
            // 导入账号
            uploadAccounts: false,
            // 判断是否是老师
            isTeacher: false,
            // 上传文件
            file: '',
            fileList: [],
            // 操作选择项
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
            // 页数
            pageCount: 1
        }
    },
    mounted() {
        this.getAccounts()
        // 路由传参验证——账户类型
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
                this.pageCount = Number(response.data.data.pageCount)
                this.accountList = response.data.data.information
                Message.success('获取账号成功')
            })
        },
        // 分页
        getCurrentPage(value){
            this.getAccounts(value)
            this.page = value
        },
        // 处理操作选择项
        chooseOption(scope){
            // 重置密码
            if(scope.row.option === '1'){
                this.$router.push({ name: 'resetPasswd',
                    params: {
                        account: scope.row.account
                    }
                })
            }
            // 修改信息
            if(scope.row.option === '2'){
                this.$router.push({ name: 'modifyInfo',
                    params: {
                        account: scope.row.account
                    }
                })
            }
            // 降级为学生账号
            if(scope.row.option === '3'){
                this.degradeMessageBox = true
                this.account = scope.row.account
            }
            // 删除账号
            if(scope.row.option === '4'){
                this.delMessageBox = true
                this.account = scope.row.account
            }
        },
        // 添加账号
        addAccount(){
            this.$router.push({ name: 'addAccounts' })
        },
        // 导入账号——获取文件
        hangdChange(file, fileList){
            this.fileList = fileList
            // console.log(fileList)
        },
        // 导入账号——上传文件
        submitUpload() {
            if(this.fileList === ''){
                this.uploadAccount = false
                return
            }
            let formData = new FormData()
            for(let i in this.fileList){
                formData.append('accounts_file[]', this.fileList[i].raw)
            }
            console.log(formData.getAll('accounts_file[]'))
            this.$axios.post(prefix.api + userApi.backUpload, {
                accounts_file: formData
            }).then((response)=>{
                if(!responseHandler(response.data, this)){
                    Message.error('导入失败')
                    return
                }
                Message.success('导入成功')
                this.fileList = ''
                this.uploadAccount = false
            })
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
        margin: 30px -15px 30px 40px;
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

.lead-box{
    position: fixed;
    top: 250px;
    left: 600px;
    padding: 15px;
    width: 280px;
    background: white;
    border: 1px solid rgb(184, 184, 184);
    .el-button {
        margin: 10px 5px;
    }
    .close {
        float: right;
        font-size: 25px;
        width: 20px;
        &:hover{
            color: #409EFF;
            cursor: pointer;
        }
    }
}

</style>
