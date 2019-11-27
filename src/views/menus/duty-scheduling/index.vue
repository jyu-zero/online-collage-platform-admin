<template>
    <div class="duty">
        <div id="btn-set" class="button-group">
            <div>
            <!-- TODO:整合金隆安排表 -->
                <el-button type="primary" @click="beginToArrange">安排人员</el-button>
                <!-- 清空安排表数据库 -->
                <el-button type="primary" @click="resetArrange">重置所有安排</el-button>
                <!-- 自加：清空无课表 -->
                <el-button type="primary" @click="resetFreelnformation">重置无课表</el-button>
               
            </div>
            <!-- TODO:整合棉伟登记无课表 -->
            <el-button type='primary' @click='toggle'>登记无课表</el-button>
            <!-- <el-button type="primary" @click="goToRegister">登记无课表</el-button> -->
        </div>

        <!-- 主表格 -->
        <el-table  :data="tableData" border  style="width: 93%; margin: 0 auto" >
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

        <!-- 这里开始是delon写的 -->
        <div class="arrange-page-screen"  :class="{active:isActive}">
            <div class="arrange-page">
                <h2>安排人员</h2>
                <table class="arrange-table">
                    <thead>
                        <tr class="arrange-table-row_0">
                            <th class="arrange-table-column_1" rowspan="1" colspan="1">星期一</th>
                            <th class="arrange-table-column_2" rowspan="1" colspan="1">星期二</th>
                            <th class="arrange-table-column_3" rowspan="1" colspan="1">星期三</th>
                            <th class="arrange-table-column_4" rowspan="1" colspan="1">星期四</th>
                            <th class="arrange-table-column_5" rowspan="1" colspan="1">星期五</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="row in arrangeData"
                            :key="row[0]"
                            v-bind:class="'arrange-table-row_'+row[0]"
                        >
                            <td
                                v-for="col in 5"
                                :key="col"
                                v-bind:class="'arrange-table-column_'+col"
                            >
                                <el-select
                                    v-model="row[col]"
                                    multiple
                                    placeholder="请安排同学值日"
                                    size="small"
                                    ref="selector"
                                    no-data-text="没有可值日人员"
                                >
                                    <el-option
                                        v-for="item in options[row[0] + col - 2]"
                                        :key="item.value"
                                        :value="item.value"
                                        :label="item.name"
                                    ></el-option>
                                </el-select>
                                <span></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="row-bg">
                    <div class="week-choose-bt">
                        <el-switch v-model="isEvenWeek" active-text="双周值日安排" inactive-text="单周值日安排" @change="chooseWeekToArrange"></el-switch>
                    </div>
                    <div class="arrange-bts-group">
                        <el-button @click="toCancelArrange()">取消</el-button>
                        <el-button type="primary" @click="submitArrangement()">确认</el-button>
                    </div>
                </div>
            </div>
        </div>
         <!-- 这里开始是GWolf写的 -->
        <div class='course-container' v-if='visibility'>
            <h3>登记无课表</h3>
      
            <div class='record-course'>
                <table border='1' cellspacing='0' cellpadding='0'>
                    <tr>
                        <th class='day' v-for='(item, index) in weekday' :key='index'>
                            {{ item }}
                        </th>
                    </tr>
                    <tr v-for='(itemss, index) in idArr' :key='index'>
                        <td
                            v-for='(items, index) in itemss'
                            :key='index'
                            @click='saveId(items)'
                        >
                            <course @add-to-arr='addId'></course>
                        </td>
                    </tr>
                </table>
            </div>

            <div class='btn-container'>
                <el-button class='button' @click='cancelFreeCourse'>取消</el-button>
                <el-button type='primary' class='button' @click='submit'>确定</el-button
                >
            </div>
        </div>
    </div>
</template>

<script>
import { Button, Select, Option, Switch, Table, TableColumn, Message } from 'element-ui'
import { prefix, dutySchedulingApi, responseHandler } from '@/api'
import course from '@/components/duty-scheduling/Course.vue'

export default {
    name: 'DutyScheduling',
    components: {
        [Button.name]: Button,
        [Select.name]: Select,
        [Option.name]: Option,
        [Switch.name]: Switch,
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        [Message.name]: Message,
        course
    },
    props: {
        row: Number,
        col: Number
    },
    created(){
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
        },
        // 开始进行安排时，获取可安排人员列表
        beginToArrange() {
            this.isActive = true
            this.options = []
            this.$axios
                .get(prefix.api + dutySchedulingApi.getFreeStaffList)
                .then(
                    response => {
                        if(response.data.code === '0000'){
                            var courseId = 0
                            var courseArr = []
                            for(let i = 0; i < 40; i++) {
                                courseId = i
                                if(response.data.data[courseId].people !== []){
                                    for(var freeStaff of response.data.data[courseId].people) {
                                        var freeStaffObj = {
                                            value: freeStaff,
                                            name: freeStaff,
                                            disabled: false
                                        }
                                        courseArr.push(freeStaffObj)
                                    }
                                    this.options.push(courseArr)
                                    courseArr = []
                                }else{
                                    this.options.push([])
                                    courseArr = []
                                }
                            }
                        }
                    }
                )
        },
        // 安排单轴 OR 双周的值日
        chooseWeekToArrange(isEven) {
            if(isEven){
                this.arrangeData.forEach((row)=>{
                    row[1] = []
                    row[2] = []
                    row[3] = []
                    row[4] = []
                    row[5] = []
                })
                this.options = []
                this.$axios
                    .get(prefix.api + dutySchedulingApi.getFreeStaffList)
                    .then(
                        response => {
                            if(response.data.code === '0000'){
                                console.log('开始双周的安排')
                                var courseId = 0
                                var courseArr = []
                                for(let i = 40; i < 80; i++) {
                                    courseId = i
                                    if(response.data.data[courseId].people !== []){
                                        for(var freeStaff of response.data.data[courseId].people) {
                                            var freeStaffObj = {
                                                value: freeStaff,
                                                name: freeStaff,
                                                disabled: false
                                            }
                                            courseArr.push(freeStaffObj)
                                        }
                                        this.options.push(courseArr)
                                        courseArr = []
                                    }else{
                                        this.options.push([])
                                        courseArr = []
                                    }
                                }
                            }else{ Message.error('获取可值班人员出现问题:( 请联系管理员') }
                        }
                    )
            }else{
                this.arrangeData.forEach((row)=>{
                    row[1] = []
                    row[2] = []
                    row[3] = []
                    row[4] = []
                    row[5] = []
                })
                this.options = []
                this.$axios
                    .get(prefix.api + dutySchedulingApi.getFreeStaffList)
                    .then(
                        response => {
                            if(response.data.code === '0000'){
                                console.log('开始单周的安排')
                                var courseId = 0
                                var courseArr = []
                                for(let i = 0; i < 40; i++) {
                                    courseId = i
                                    if(response.data.data[courseId].people !== []){
                                        for(var freeStaff of response.data.data[courseId].people) {
                                            var freeStaffObj = {
                                                value: freeStaff,
                                                name: freeStaff,
                                                disabled: false
                                            }
                                            courseArr.push(freeStaffObj)
                                        }
                                        this.options.push(courseArr)
                                        courseArr = []
                                    }else{
                                        this.options.push([])
                                        courseArr = []
                                    }
                                }
                            }else{ Message.error('获取可值班人员出现问题:( 请联系管理员') }
                        }
                    )
            }
        },
        // 提交值日安排表
        submitArrangement() {
            this.arrange = []
            if(!this.isEvenWeek){
                for(let i = 0; i < 40; i++){
                    let arrangeObj = {}
                    let nameArr = this.$refs.selector[i].$options.propsData.value
                    if(nameArr.length === 0){ continue }
                    arrangeObj = {
                        courseId: i,
                        name: nameArr
                    }
                    this.arrange.push(arrangeObj)
                }
            }else{
                this.arrange = []
                for(let i = 0; i < 40; i++){
                    let arrangeObj = {}
                    let nameArr = this.$refs.selector[i].$options.propsData.value
                    if(nameArr.length === 0){ continue }
                    for(let courseId = 40; courseId < 80; courseId++){
                        arrangeObj = {
                            courseId: courseId,
                            name: nameArr
                        }
                        this.arrange.push(arrangeObj)
                    }
                }
            }
            console.log(this.arrange)
            this.$axios
                .post(prefix.api + dutySchedulingApi.submitArrange, {
                    arrange: this.arrange
                })
                .then(response=>{
                    if(!responseHandler(response.data, this)){
                        Message.error('提交是出现未知错误:( 请联系管理员')
                    }
                    Message.success({
                        message: response.data.msg,
                        type: 'success',
                        center: true
                    })
                })
            this.arrangeData.forEach((row)=>{
                row[1] = []
                row[2] = []
                row[3] = []
                row[4] = []
                row[5] = []
            })
            this.isActive = false
        },
        // TODO 取消后清除所有值日安排
        toCancelArrange() {
            this.isActive = false
            console.log(this.options)
            this.arrangeData.forEach((row)=>{
                row[1] = []
                row[2] = []
                row[3] = []
                row[4] = []
                row[5] = []
            })
        },
        cancelFreeCourse() {
            this.visibility = !this.visibility
        },
        // 无课表显示
        toggle() {
            this.visibility = !this.visibility
        },
        // 保存课程对应的id
        saveId(items) {
            this.id = Number(items)
            console.log(this.id)
        },
        // 将id保存到数组中
        addId(data) {
            switch (data) {
                case '单周无课':
                    if (this.saveIdArr.indexOf(this.id) >= 0) {
                        return
                    }
                    this.saveIdArr.push(this.id)
                    break

                case '双周无课':
                    this.id = Number(this.id + 20)
                    if (this.saveIdArr.indexOf(this.id) >= 0) {
                        return
                    }
                    this.saveIdArr.push(this.id)
                    break

                case '单双无课':
                    if (this.saveIdArr.indexOf(this.id) >= 0) {
                        return
                    }
                    this.saveIdArr.push(this.id)
                    this.id = Number(this.id + 20)
                    if (this.saveIdArr.indexOf(this.id) >= 0) {
                        return
                    }
                    this.saveIdArr.push(this.id)
                    break
                case '单双有课':
                    break
            }
            console.log(this.saveIdArr)
        },
        // 提交id数组
        submit() {
            this.$axios
                .post(prefix.api + dutySchedulingApi.submitFreeInformation, {
                    freeCourseList: this.saveIdArr
                })
                .then(response => {
                    if (!responseHandler.handle(response.data, this)) {
                        return
                    }
                    console.log('success')
                })
        }
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
            ],
            arrangeData: [
                [
                    1,
                    [],
                    [],
                    [],
                    [],
                    []
                ], [
                    6,
                    [],
                    [],
                    [],
                    [],
                    []
                ], [
                    11,
                    [],
                    [],
                    [],
                    [],
                    []
                ], [
                    16,
                    [],
                    [],
                    [],
                    [],
                    []
                ], [
                    21,
                    [],
                    [],
                    [],
                    [],
                    []
                ], [
                    26,
                    [],
                    [],
                    [],
                    [],
                    []
                ], [
                    31,
                    [],
                    [],
                    [],
                    [],
                    []
                ], [
                    36,
                    [],
                    [],
                    [],
                    [],
                    []
                ]
            ],
            arrange: [],
            options: [],
            isEvenWeek: false,
            isActive: false,
            visibility: false,
            weekday: ['星期一', '星期二', '星期三', '星期四', '星期五'],
            idArr: [
                ['1', '2', '3', '4', '5'],
                ['6', '7', '8', '9', '10'],
                ['11', '12', '13', '14', '15'],
                ['16', '17', '18', '19', '20'],
                ['21', '22', '23', '24', '25'],
                ['26', '27', '28', '29', '30'],
                ['31', '32', '33', '34', '35'],
                ['36', '37', '38', '39', '40']
            ],
            saveIdArr: [],
            id: 0
        }
    }
}
</script>

<style lang="less" scoped>
@width: 100px;
.duty {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.button-group{
    width: 100%;
    margin-top: 2%;
    margin-bottom: 2%;
    padding-left: 2%;
    padding-right: 4%;
    display: flex;
    justify-content: space-between;
    & button{
        width:120px;
        display: inline-block;
        margin-left: 30px;
    }
}
.arrange-page-screen {
    width: 100%;
    min-height: 100%;
    background:rgba(96, 98, 102,.3);
    display: flex;
    align-items: center;
    position: absolute;
    z-index: 1;
    display: none;
    transition: .5s;
    -moz-transition: .5s;
    -webkit-transition: .5s;
}
.arrange-page {
    width: 90%;
    padding: 10px 15px;
    background: #fff;
    margin: auto;
    z-index: 1;
    border-radius: 2px;
}
.active{
    display: flex;
}
h2 {
    color: #595b5f;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
.arrange-table {
    width: 100%;
    font-size: 14px;
    color: #606266;
    table-layout: fixed;
    border-collapse: collapse;
    border: 1px solid #ebeef5;
    border-right: none;
    border-bottom: none;
    margin: 20px 0;
}
.arrange-table th,
.arrange-table td {
    border-bottom: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    min-width: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    text-align: center;
    user-select: none;
    font-weight: 500;
    color: #909399;
    table-layout: fixed;
}
.arrange-table th {
    padding: 12px 0;
}
.arrange-table td {
    padding: 12px 0;
}
.el-row {
    margin-bottom: 20px;
}
.el-row:last-child {
    margin-bottom: 0;
}
.row-bg {
    padding: 10px;
    background-color: #f9fafc;
    height: 60px;
    // position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
#btn-single-double{
    text-align: center;
    margin-top: 20px;
}
h3 {
  margin: 0;
  margin-bottom: 10px;
}
.course-container {
  box-sizing: border-box;
  width: @width*5+47px;
  padding: 20px;
  position: fixed;
  top:25%;
  left:40%;
  border: 1px solid black;
}
.record-course {
  width: @width*5+7px;
  box-sizing: border-box;
}

table {
  border-collapse: collapse;
  table-layout: fixed;
}
td {
  width: @width;
  height: 32px;
}
.day {
  line-height: 40px;
  text-align: center;
}
.btn-container {
  display: flex;
  justify-content: flex-end;
}
.button {
  margin-top: 15px;
}
</style>
