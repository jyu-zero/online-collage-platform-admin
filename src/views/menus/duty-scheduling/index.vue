<template>
    <div class="duty">
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
                        <!-- <tr
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
                                    class="selecter"
                                    multiple
                                    placeholder="请安排同学值日"
                                    size="small"
                                    @change="checkSelectedOptions()"
                                >
                                    <el-option
                                        v-for="item in options[row.rowId][col]"
                                        :key="item.value"
                                        :label="item.name"
                                    ></el-option>
                                </el-select>
                                <span></span>
                            </td>
                        </tr> -->
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
    </div>
</template>

<script>
import { Button, Select, Option, Switch } from 'element-ui'
import { prefix, dutySchedulingApi } from '@/api'

export default {
    name: 'DutyScheduling',
    components: {
        [Button.name]: Button,
        [Select.name]: Select,
        [Option.name]: Option,
        [Switch.name]: Switch
    },
    props: {
        row: Number,
        col: Number
    },
    methods: {
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
                            var colArr = []
                            var courseArr = []
                            var courseId = 0
                            for(var row = 0; row < 8; row++) {
                                courseId = row
                                for(var count = 0; count < 5; count++) {
                                    console.log(courseId)
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
                                        return
                                    }else{
                                        colArr.push([])
                                        courseId = courseId + 8
                                        console.log(colArr)
                                        return
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
        },
        // TODO
        resetArrange(){
            
        }
    },
    data() {
        return {
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
                // [
                //     '选项1',
                //     '黄金糕fweg'
                // ],
                // [
                //     '选项2',
                //     '双皮奶vds',
                // ],
                // {
                //     value: '选项3',
                //     label: '蚵仔煎vds'
                //     disabled: true
                // },
                // {
                //     value: '选项4',
                //     label: '龙须面vds'
                // },
                // {
                //     value: '选项5',
                //     label: '北京烤鸭vds'
                // }
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
