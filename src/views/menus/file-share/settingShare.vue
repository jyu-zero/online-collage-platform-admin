<template>
  <div class = "SettingShare">
      <el-main>
          <el-row >
              <el-col :span="5">
                  <div class="grid-content " >
                      <el-button type="primary" @click = "gotoShareHome('/file-share')">返回共享列表</el-button>
                  </div>
              </el-col>
              <el-col :span="6" :offset="20">
                  <div class="grid-content " >
                      <el-button type="primary">保存</el-button>
                  </div>
              </el-col>
          </el-row>

          <el-row >
              <el-col :span="6">
                  <div class="grid-content " >
                      <el-card class="box-card">
                          <div slot="header" class="clearfix">
                              <span >分类管理</span>
                              <el-dropdown style="float: right; padding: 3px 0">
                                  <span class="el-dropdown-link">
                                      更多分类<i class="el-icon-arrow-down el-icon--right"></i>
                                  </span>
                                  <el-dropdown-menu slot="dropdown">
                                      <el-dropdown-item>添加</el-dropdown-item>
                                      <el-dropdown-item>删除</el-dropdown-item>
                                  </el-dropdown-menu>
                              </el-dropdown>
                          </div>
                          <div v-for="item in types" :key="item.index" class="text item">
                              {{ item.label }}
                          </div>
                      </el-card>
                  </div>
              </el-col>
          </el-row>

          <el-row>
              <el-col :span="24">
                  <div class="grid-content ">
                      <el-checkbox v-model="checkedForClass">允许普通用户分享资料到全班</el-checkbox>
                  </div>
              </el-col>
          </el-row>

          <el-row>
              <el-col :span="24">
                  <div class="grid-content ">
                      <el-checkbox v-model="checkedForAll">允许普通用户分享资料到全学院</el-checkbox>
                  </div>
              </el-col>
          </el-row>

          <div id = "select">
              <div> 每个班级的文件容量 </div>
              <el-select v-model="totalSize" >
                  <el-option v-for="item in setTotalSize" :key="item.index" :label="item.label" :value="item.value" >
                  </el-option>
              </el-select>
          </div>

      </el-main>
</div>

</template>

<script>
import { Select, Option, Button, Checkbox, Card, Main, Col, Row, Dropdown, DropdownItem, DropdownMenu } from'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
export default {
    name: 'SettingShare',
    components: {
        [Select.name]: Select,
        [Option.name]: Option,
        [Button.name]: Button,
        [Checkbox.name]: Checkbox,
        [Card.name]: Card,
        [Main.name]: Main,
        [Col.name]: Col,
        [Row.name]: Row,
        [Dropdown.name]: Dropdown,
        [DropdownItem.name]: DropdownItem,
        [DropdownMenu.name]: DropdownMenu
    },
    data (){
        return {
            types: [{
                value: '选项1',
                label: '学习资料'
            }, {
                value: '选项2',
                label: '通知文件'
            }, {
                value: '选项3',
                label: '电影动画'
            }, {
                value: '选项4',
                label: '游戏程序'
            }, {
                value: '选项5',
                label: '工具程序'
            }, {
                value: '选项6',
                label: '工具程序'
            }, {
                value: '选项7',
                label: '源程序程序'
            }],
            type: '',
            setTotalSize: [{
                value: '选项1',
                label: '500M'
            }, {
                value: '选项2',
                label: '1G'
            }, {
                value: '选项3',
                label: '2G'
            }, {
                value: '选项4',
                label: '4G'
            }],
            totalSize: '',
            checkedForClass: false,
            checkedForAll: false
        }
    },
    methods: {
        gotoShareHome(path){
            this.$router.push({ path })
        }
    }
}
</script>

<style lang ="less">

    html,body{
        *{
        margin: 0;
        padding: 0;
        }
    }
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;

    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;

    }

    .el-main {
        color: #333;
        text-align: center;
        overflow: hidden;

    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-card{
        margin:30px 0;
        width: 400px;
        overflow: auto;
        height:300px;
        text-align: left;
    }

    .text {
        font-size: 16px;
    }
    .el-col-5 {
        width: 0;
    }

    .el-col-24{
        width:0;
    }
    #select{
        margin-top: 30px;
        float:left;

        div{
            text-align:left;
            margin-bottom: 14px;
        }
    }

    .el-row{
        margin-bottom: 16px;
    }

</style>
