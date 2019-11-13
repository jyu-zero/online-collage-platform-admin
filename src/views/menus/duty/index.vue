<template>
  <div class="duty">
    <div class="arrange-page-screen">
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
                <tr v-for="row of arrangeData" :key="row" v-bind:class="'arrange-table-row_'+row.rowId">
                  <td v-for="col in 5" :key="col" v-bind:class="'arrange-table-column_'+col">
                      <el-select v-model="row['col_'+col+'Data']" multiple placeholder="请安排同学值日" size="small">
                      <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                      </el-select>
                      <span></span>
                  </td>
                </tr>
            </tbody>
        </table>
        <div class="row-bg">
            <div class="week-choose-bt">
                <el-switch
                    v-model="week"
                    active-text="双周值日安排"
                    inactive-text=单周值日安排>
                </el-switch>
            </div>
            <div class="arrange-bts-group">
                <el-button>取消</el-button>
                <el-button type="primary">确认</el-button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Duty',
    // components: {
    //     [Table.name]: Table,
    //     [TableColumn.name]: TableColumn
    // },
    props: {
        row: Number,
        col: Number
    },
    data(){
        return {
            arrangeData: [
                { rowId: 1, col_1Data: 'row_1&col_1', col_2Data: 'row_1&col_2', col_3Data: 'row_1&col_3', col_4Data: 'row_1&col_4', col_5Data: 'row_1&col_5' },
                { rowId: 2, col_1Data: 'row_2&col_1', col_2Data: 'row_2&col_2', col_3Data: 'row_2&col_3', col_4Data: 'row_2&col_4', col_5Data: 'row_2&col_5' },
                { rowId: 3, col_1Data: 'row_3&col_1', col_2Data: 'row_3&col_2', col_3Data: 'row_3&col_3', col_4Data: 'row_3&col_4', col_5Data: 'row_3&col_5' },
                { rowId: 4, col_1Data: 'row_4&col_1', col_2Data: 'row_4&col_2', col_3Data: 'row_4&col_3', col_4Data: 'row_4&col_4', col_5Data: 'row_4&col_5' }
            ],
            options: [{
                value: '选项1',
                label: '黄金糕fweg'
            }, {
                value: '选项2',
                label: '双皮奶vds',
                disabled: true
            }, {
                value: '选项3',
                label: '蚵仔煎vds'
            }, {
                value: '选项4',
                label: '龙须面vds'
            }, {
                value: '选项5',
                label: '北京烤鸭vds'
            }],
            value1: [],
            value2: [],
            week: false
        }
    }
}
</script>

<style lang="less" scoped>
.duty {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.arrange-page-screen{
    width: 100%;
    min-height: 100%;
    background: rgba(0,0,0,.4);
    display: flex;
    align-items: center;
    }
.arrange-page{
    width: 90%;
    padding: 10px 15px;
    background: #fff;
    margin: auto;
    border-radius: 2px;
}
h2{
    color:#595b5f;
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
  border: 1px solid #EBEEF5;
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
  text-align:center;
  user-select: none;
  font-weight: 500;
  color: #909399;
  table-layout: fixed;
}
.arrange-table th{
  padding: 12px 0;
}
.arrange-table td{
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
    display:flex;
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
