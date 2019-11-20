<template>
    <div class="duty-scheduling">
        <div id="btn-set">
            <!-- TODO:整合金隆安排表 -->
            <!-- <el-button type="primary" @click="goToArrange">安排人员</el-button> -->
            <!-- 清空安排表数据库 -->
            <el-button type="primary" @click="resetArrange">重置所有安排</el-button>
            <!-- 自加：清空无课表 -->
            <el-button type="primary" @click="resetFreelnformation">重置无课表</el-button>
            <!-- TODO:整合棉伟登记无课表 -->
            <!-- <el-button type="primary" @click="goToRegister">登记无课表</el-button> -->
        </div>

        <!-- 主表格 -->
        <el-table  :data="tableData" border  style="width: 100%" >
            <el-table-column  prop="course" label=""  align="center">
            </el-table-column>
            <el-table-column  prop="monday"  label="星期一" align="center" >
            </el-table-column>
            <el-table-column  prop="tuesday"   label="星期二" align="center">
            </el-table-column>
            <el-table-column  prop="wednesday"  label="星期三" align="center">
            </el-table-column>
            <el-table-column  prop="thursday"  label="星期四" align="center">
            </el-table-column>
            <el-table-column  prop="friday" label="星期五" align="center">
            </el-table-column>
        </el-table>
        <!-- 主表格完 -->

        <!-- 查看单双周 -->
        <div id = "btn-single-double">
            <el-button type="primary" icon="el-icon-arrow-left" @click="getSingleWeek">单周</el-button>
            <el-button type="primary"  @click="currentDuty">当前值班</el-button>
            <el-button type="primary"  @click="getDoubleWeek">双周<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </div>
        
    </div>
</template>
<script>
import { prefix, dutySchedulingApi, responseHandler } from '@/api'
import { Button, Table, TableColumn, Message } from 'element-ui'

export default {
    name: 'duty-scheduling',
    components: {
        [Button.name]: Button,
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        [Message.name]: Message
    },
    data() {
        return {
            // 返回的值班安排数组中的姓名
            dutyStaff: [],
            // 返回的值班安排
            message: [],
            // 1.主体表格信息获取2.clas：第一列信息3.传入一个数组
            tableData: [
                {
                    course: '第一节',
                    monday: '',
                    tuesday: '',
                    wednesday: '',
                    thursday: '',
                    friday: ''
                },
                {
                    course: '第二节',
                    monday: '',
                    tuesday: '',
                    wednesday: '',
                    thursday: '',
                    friday: ''
                },
                {
                    course: '第三节',
                    monday: '',
                    tuesday: '',
                    wednesday: '',
                    thursday: '',
                    friday: ''
                },
                {
                    course: '第四节',
                    monday: '',
                    tuesday: '',
                    wednesday: '',
                    thursday: '',
                    friday: ''
                },
                {
                    course: '第五节',
                    monday: '',
                    tuesday: '',
                    wednesday: '',
                    thursday: '',
                    friday: ''
                },
                {
                    course: '第六节',
                    monday: '',
                    tuesday: '',
                    wednesday: '',
                    thursday: '',
                    friday: ''
                },
                {
                    course: '第七节',
                    monday: '',
                    tuesday: '',
                    wednesday: '',
                    thursday: '',
                    friday: ''
                },
                {
                    course: '第八节',
                    monday: '',
                    tuesday: '',
                    wednesday: '',
                    thursday: '',
                    friday: ''
                }
            ]

        }
    },
    created() {
        // 获取当前值班表
        this.currentDuty()
        // 获取双周值班表
        this.getDoubleWeek()
        // 获取单周值班表
        this.getSingleWeek()
    },
    methods: {
    //   goToArrange(){
    //       this.$router.push({name:''})
    //   },
        // 重置安排表
        resetArrange() {
            this.$axios.post(prefix.api + dutySchedulingApi.resetArrange).then((response) => {
                if(!responseHandler(response.data, this)){
                    Message.error('重置失败')
                }
                Message.success({
                    message: response.data.msg,
                    type: 'success',
                    center: true
                })
            })
        },
        // 重置无课表
        resetFreelnformation() {
            this.$axios.post(prefix.api + dutySchedulingApi.resetFreeInformation).then((response) => {
                if(!responseHandler(response.data, this)){
                    Message.error('重置失败')
                }
                Message.success({
                    message: response.data.msg,
                    type: 'success',
                    center: true
                })
            })
        },
        // 获取当前周值班安排 TODO:计算当前时间改变单双周
        currentDuty() {
            this.$axios.get(prefix.api + dutySchedulingApi.getArrange).then((response) => {
                if(!responseHandler(response.data, this)){
                    Message.error('获取当前值班失败！')
                }
                this.message = response.data.data
                this.dutyStaff = this.message.map(item => { return { 'name': item.name } })
                this.dutyStaff = this.dutyStaff.slice(0, 40)
                for(let i = 0; i < this.dutyStaff.length; i++){
                    let weekday = ''
                    switch(i % 5){
                        case 0:
                            weekday = 'monday'
                            break
                        case 1:
                            weekday = 'tuesday'
                            break
                        case 2:
                            weekday = 'wednesday'
                            break
                        case 3:
                            weekday = 'thursday'
                            break
                        case 4:
                            weekday = 'friday'
                            break
                    }
                    let names = this.dutyStaff[i].name
                    if(Array.isArray(names)){
                        names = names.join(',')
                    }
                    this.tableData[Math.floor(i / 5)][weekday] = names
                }
            })
        },
        // TODO:跳转注册链接
        //   goToRegister(){

        //   },
        // 获取单周值班表
        getSingleWeek() {
            this.$axios.get(prefix.api + dutySchedulingApi.getArrange).then((response) => {
                if(!responseHandler(response.data, this)){
                    Message.error('获取当前单周值班失败！')
                }
                this.message = response.data.data
                this.dutyStaff = this.message.map(item => { return { 'name': item.name } })
                this.dutyStaff = this.dutyStaff.slice(0, 40)
                for(let i = 0; i < this.dutyStaff.length; i++){
                    let weekday = ''
                    switch(i % 5){
                        case 0:
                            weekday = 'monday'
                            break
                        case 1:
                            weekday = 'tuesday'
                            break
                        case 2:
                            weekday = 'wednesday'
                            break
                        case 3:
                            weekday = 'thursday'
                            break
                        case 4:
                            weekday = 'friday'
                            break
                    }
                    let names = this.dutyStaff[i].name
                    if(Array.isArray(names)){
                        names = names.join(',')
                    }
                    this.tableData[Math.floor(i / 5)][weekday] = names
                }
            })
        },
        // 获取双周值班表
        getDoubleWeek() {
            this.$axios.get(prefix.api + dutySchedulingApi.getArrange).then((response) => {
                if(!responseHandler(response.data, this)){
                    Message.error('获取当前单周值班失败！')
                }
                this.message = response.data.data
                this.dutyStaff = this.message.map(item => { return { 'name': item.name } })
                this.dutyStaff = this.dutyStaff.slice(40, 80)
                for(let i = 0; i < this.dutyStaff.length; i++){
                    let weekday = ''
                    switch(i % 5){
                        case 0:
                            weekday = 'monday'
                            break
                        case 1:
                            weekday = 'tuesday'
                            break
                        case 2:
                            weekday = 'wednesday'
                            break
                        case 3:
                            weekday = 'thursday'
                            break
                        case 4:
                            weekday = 'friday'
                            break
                    }
                    let names = this.dutyStaff[i].name
                    if(Array.isArray(names)){
                        names = names.join(',')
                    }
                    this.tableData[Math.floor(i / 5)][weekday] = names
                }
            })
        }
    }
}
</script>

<style lang="less">
.duty-scheduling{
    padding: 0 40px;
}
h1{
    text-align: center;
}
#btn-set{
    margin-top: 20px;
    margin-bottom: 20px;
}
#btn-single-double{
    text-align: center;
    margin-top: 20px;
}
</style>
