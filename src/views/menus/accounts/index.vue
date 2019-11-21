<template>
    <!-- 后台账户管理系统 -->
    <div class="accounts">
        <!-- 按钮 -->
        <div class="a-button">
            <el-button class="a1-button" type="primary" @click="dialogVisible = true">
                添加账号
            </el-button>
            <el-button class="a1-button" type="primary">导入账号</el-button>
            <el-button class="a1-button" type="primary">班级管理</el-button>
        </div>
        <!-- 表格 -->
         <el-table
            :data="tableData"
            border
            style ="with=100%">
                <el-table-column
                    prop="num"
                    label="学号"
                    width="180"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="180"
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
                    width="180"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="grade"
                    label="班级年级"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="dorm"
                    label="宿舍"
                    width="180"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="operate"
                    label="操作"
                    align="center">
                    <!-- <li>
                        <span>
                            <i class="el-icon-more">
                            </i>
                        </span>
                    </li> -->
                    <!-- <el-dropdown>
                        <span class="el-dropdown-link">
                            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown> -->
                </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
          small
          layout="prev, pager, next"
          :total="50">
        </el-pagination>
        <!-- 出现添加账号操作框 -->
        <el-dialog
        title="添加账号"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <p>请输入账号:</p>
        <p>请输入姓名:</p>
        <p>请输入性别:</p>
        <p>请输入联系方式:</p>
        <p>请输入班级年级:</p>
        <p>请输入宿舍:</p>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 添加账号操作框【完】 -->
    </div>
</template>

<script>
// import responseHandler from '@/utils/responseHandler'
import { Button, Table, Input, Message, Pagination, Dropdown, Select, Dialog } from 'element-ui'
export default {
    name: 'Accounts',
    components: {
        [Button.name]: Button,
        [Table.name]: Table,
        [Message.name]: Message,
        [Input.name]: Input,
        [Dialog.name]: Dialog,
        [Pagination.name]: Pagination,
        [Select.name]: Select,
        [Dropdown.name]: Dropdown
    },
    data() {
        return {
            dialogVisible: false,
            tableData: [{
                num: '151110058',
                name: '王小虎',
                sex: '男',
                contact: '18813211223',
                grade: '1503',
                dorm: '南7-201'
            }, {
                num: '151110058',
                name: '王小虎',
                sex: '男',
                contact: '18813211223',
                grade: '1503',
                dorm: '南7-201'
            }, {
                num: '151110058',
                name: '王小虎',
                sex: '男',
                contact: '18813211223',
                grade: '1503',
                dorm: '南7-201'
            }, {
                num: '151110058',
                name: '王小虎',
                sex: '男',
                contact: '18813211223',
                grade: '1503',
                dorm: '南7-201'
            }, {
                num: '151110058',
                name: '王小虎',
                sex: '男',
                contact: '18813211223',
                grade: '1503',
                dorm: '南7-201'
            }, {
                num: '151110058',
                name: '王小虎',
                sex: '男',
                contact: '18813211223',
                grade: '1503',
                dorm: '南7-201'
            }]

        }
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done()
                })
                .catch(_ => {})
        }
    }
}
</script>

<style lang="less" scoped>
.accounts{
    // height:100%;
    flex-direction: column;
    margin:40px ;
    display: flex;
}
.a-button{
    margin-bottom: 40px;
}
.a1-button{
    font-family: '';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    letter-spacing: normal;
    width: 140px;
    height: 40px;
}
.el-icon-more{
    vertical-align: middle;
}
li{
    list-style: none;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}
.el-icon-arrow-down {
    font-size: 12px;
}
</style>
