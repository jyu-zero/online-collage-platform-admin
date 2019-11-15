<template>
  <div class="hello">
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
        <tr v-for="n in 4" 
        :key="n" 
        v-bind:class="arrange-table-row_+n"
        >
          <td v-for="n in 5"
          :key="n"
          v-bind:class="arrange-table-column_+n"
          >
            <el-select v-model="value1" multiple placeholder="请安排同学值日">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </td>
        </tr>
      </tbody>
    </table>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6">
          <el-switch
            v-model="week"
            active-text="双周值日安排"
            inactive-text=单周值日安排>
          </el-switch>
      </el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6">
          <el-button>取消</el-button>
          <el-button type="primary">确认</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {},
  data() {
    return {
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶',
          disabled: true
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value1:[],
        value2:[],
        week:false,
        n:Number
    };
  },
  // computed:{
  //   arrange_table_row: function(n){
  //     return "arrange-table-row_"+n
  //   }
  // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
  position: relative;
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
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
