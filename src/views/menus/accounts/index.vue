<template>
    <div class="accounts">
        <!-- 按钮 -->
        <div class="a-button">
            <el-button class="a1-button" type="primary">添加账号</el-button>
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
        
    </div>
</template>

<script>
export default {
    name: 'Accounts',
    data() {
        return {
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
