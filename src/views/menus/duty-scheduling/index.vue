<template>
    <div class="duty">
        <div id="btn1">
            <!-- Todo：整合金隆安排表 -->
            <!-- <el-button type="primary" @click="goToArrange">安排人员</el-button> -->
            <!-- 清空安排表数据库 -->
            <el-button type="primary" @click="resetArrange">重置所有安排</el-button>
            <!-- 自加：清空无课表 -->
            <el-button type="primary" @click="resetFreelnformation">重置无课表</el-button>
            <!-- Todo:整合棉伟登记无课表 -->
            <!-- <el-button type="primary" @click="goToRegister">登记无课表</el-button> -->
        </div>
        <div class="button-group">
            <el-button type="primary" class="arrange-button" @click="beginToArrange()">安排值班人员</el-button>
            <el-button type="primary" class="reset-arrange-button" @click="resetArrange()">重置所有安排</el-button>
        </div>
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
                            v-for="row of arrangeData"
                            :key="row.rowId"
                            v-bind:class="'arrange-table-row_'+row.rowId"
                        >
                            <td
                                v-for="col in 5"
                                :key="col"
                                v-bind:class="'arrange-table-column_'+col"
                            >
                                <el-select
                                    :model="row['col_'+col+'Data']"
                                    multiple
                                    placeholder="请安排同学值日"
                                    size="small"
                                    @change="checkSelectedOptions()"
                                >
                                    <el-option
                                        v-for="item in options[col]"
                                        :key="item.value"
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
                        <el-switch v-model="week" active-text="双周值日安排" inactive-text="单周值日安排"></el-switch>
                    </div>
                    <div class="arrange-bts-group">
                        <el-button @click="cancel()">取消</el-button>
                        <el-button type="primary">确认</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 主表格 -->
        <el-table  :data="tableData" border  style="width: 60%" >
            <el-table-column prop="course" label="" width="100">
            </el-table-column>
            <el-table-column prop="monday"  label="星期一">
            </el-table-column>
            <el-table-column prop="tuesday"   label="星期二">
            </el-table-column>
            <el-table-column prop="wednesday"  label="星期三">
            </el-table-column>
            <el-table-column prop="thursday"  label="星期四">
            </el-table-column>
            <el-table-column prop="friday" label="星期五">
            </el-table-column>
        </el-table>
        <!-- 主表格完 -->

        <!-- 查看单双周 -->
        <!-- Todo：等待后台单双周接口 -->
        <div id = "btn">
            <!-- <el-button type="primary" @click="goToSingleWeek">单周</el-button>
            <el-button type="primary" @click="goToDoubleWeek">双周</el-button> -->
        </div>
        <!-- 这里开始是delon写的 -->
        
    </div>
</template>

<script>
import { Button, Select, Option, Switch, Table } from 'element-ui'
import { prefix, dutySchedulingApi } from '@/api'

export default {
    name: 'DutyScheduling',
    components: {
        [Button.name]: Button,
        [Select.name]: Select,
        [Option.name]: Option,
        [Switch.name]: Switch,
        [Table.name]: Table
    },
    props: {
        row: Number,
        col: Number
    },
    created(){
        this.getArrange()
    },
    methods: {
        //   goToArrange(){
        //       this.$router.push({name:''})
        //   },
        // 重置所有安排
        resetArrange(){
            this.$axios.post(prefix.api + dutySchedulingApi.resetArrange).then(response=> {
                if(response.data.code = '0000') {
                    this.$message({
                        message: response.data.msg,
                        type: 'success',
                        center: true
                    })
                }
            })
        },
        resetFreelnformation(){
            this.$axios.post(prefix.api + dutySchedulingApi.resetFreeInformation).then(response=> {
                if(response.data.code = '0000') {
                    this.$message({
                        message: response.data.msg,
                        type: 'success',
                        center: true
                    })
                }
            })
        },
        getArrange(){
            this.$axios.get(prefix.api + dutySchedulingApi.getArrange).then(response=> {
                if(response.data.code = '0000') {
                    this.message = response.data.data
                    this.dutyStaff = this.message.map(item=> { return { 'name': item.name } })
                    for(let i = 0; i < this.dutyStaff.length; i++) {
                        let weekday = ''
                        switch(i % 5) {
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
                            case 5:
                                weekday = 'monday'
                                break
                            case 6:
                                weekday = 'tuesday'
                                break
                            case 7:
                                weekday = 'wednesday'
                                break
                            case 8:
                                weekday = 'thursday'
                                break
                            case 9:
                                weekday = 'friday'
                                break
                        }
                        this.tableData[Math.floor(i / 5)][weekday] = this.dutyStaff[i].name
                    }
                }
            })
        },
        beginToArrange() {
            this.isActive = true
            // console.log(evevt)
            this.options = []
            this.$axios
                .get(prefix.api + dutySchedulingApi.getFreeStaffList)
                .then(
                    response => {
                        if(response.data.code === '0000'){
                            console.log(response)
                            var courseId = 0
                            for(var row = 0; row < 1; row++) {
                                courseId = row
                                var colArr = []
                                for(var count = 0; count < 5; count++) {
                                    console.log(courseId)
                                    var courseArr = []
                                    if(response.data.data[courseId] !== 'undefined') {
                                        console.log('kill it')
                                        for(var freeStaff of response.data.data[courseId].people) {
                                            // console.log(freeStaff)
                                            var freeStaffObj = {
                                                value: freeStaff,
                                                name: freeStaff,
                                                disabled: true
                                            }
                                            courseArr.push(freeStaffObj)
                                        }
                                        colArr.push(courseArr)
                                        courseId = courseId + 8
                                        console.log(colArr)
                                    }else{
                                        colArr.push([])
                                        courseId = courseId + 8
                                        // console.log(colArr)
                                    }
                                }
                                this.options.push(colArr)
                                console.log(this.options)
                            }
                        }
                    }
                )
        },
        checkSelectedOptions(selections){
            console.log(selections)
        },
        // TODO
        clearFreeStaffList(){

        },
        cancel() {
            this.isActive = false
        }
    },
    data() {
        return {
            duty: [],
            message: [],
            // 主体表格信息获取
            // clas：第一列信息
            tableData: [{
                course: '第一节',
                monday: '',
                tuesday: '',
                wednesday: '',
                thursday: '',
                friday: ''
            }, {
                course: '第二节',
                monday: '',
                tuesday: '',
                wednesday: '',
                thursday: '',
                friday: ''
            }, {
                course: '第三节',
                monday: '',
                tuesday: '',
                wednesday: '',
                thursday: '',
                friday: ''
            }, {
                course: '第四节',
                monday: '',
                tuesday: '',
                wednesday: '',
                thursday: '',
                friday: ''
            }, {
                course: '第五节',
                monday: '',
                tuesday: '',
                wednesday: '',
                thursday: '',
                friday: ''
            }, {
                course: '第六节',
                monday: '',
                tuesday: '',
                wednesday: '',
                thursday: '',
                friday: ''
            }, {
                course: '第七节',
                monday: '',
                tuesday: '',
                wednesday: '',
                thursday: '',
                friday: ''
            }, {
                course: '第八节',
                monday: '',
                tuesday: '',
                wednesday: '',
                thursday: '',
                friday: ''
            }],
            arrangeData: [
                {
                    rowId: 1,
                    col_1Data: '1',
                    col_2Data: '9',
                    col_3Data: '17',
                    col_4Data: '25',
                    col_5Data: '33'
                },
                {
                    rowId: 2,
                    col_1Data: '2',
                    col_2Data: '10',
                    col_3Data: '18',
                    col_4Data: '26',
                    col_5Data: '34'
                },
                {
                    rowId: 3,
                    col_1Data: '3',
                    col_2Data: '11',
                    col_3Data: '19',
                    col_4Data: '27',
                    col_5Data: '35'
                },
                {
                    rowId: 4,
                    col_1Data: '4',
                    col_2Data: '12',
                    col_3Data: '20',
                    col_4Data: '28',
                    col_5Data: '36'
                },
                {
                    rowId: 5,
                    col_1Data: '5',
                    col_2Data: '13',
                    col_3Data: '21',
                    col_4Data: '29',
                    col_5Data: '37'
                },
                {
                    rowId: 6,
                    col_1Data: '6',
                    col_2Data: '14',
                    col_3Data: '22',
                    col_4Data: '30',
                    col_5Data: '38'
                },
                {
                    rowId: 7,
                    col_1Data: '7',
                    col_2Data: '15',
                    col_3Data: '23',
                    col_4Data: '31',
                    col_5Data: '39'
                },
                {
                    rowId: 8,
                    col_1Data: '8',
                    col_2Data: '16',
                    col_3Data: '24',
                    col_4Data: '32',
                    col_5Data: '40'
                }
            ],
            options: [
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                []
            ],
            arrange: [],
            week: false,
            isActive: false,
            arrangeVm: this
        }
    }
}
</script>

<style lang="less" scoped>
.duty {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.button-group{
    width: 100%;
    margin-top: 2%;
    padding-left: 2%;
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
    z-index: 99;
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
// .arrange-bts-group,.week-choose-bt{
//     display: inline-block;
// }
// .arrange-bts-group{
//     align-self: flex-end;
// }
</style>
