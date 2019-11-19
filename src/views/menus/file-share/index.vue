<template>
  <div class="file-share">
      <el-main>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="12">
              <div class="grid-content ">
                <el-row>
                  <el-button type="primary" @click="showModal=true">上传资料</el-button>
                  <el-button type="primary" >置顶 </el-button>
                  <el-button type="primary" >删除 </el-button>
                </el-row>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                <el-row>
                  <el-button type="primary" @click = "gotoSetting('/file-share/setting-share')" >资料共享设置</el-button>
                </el-row>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content ">
                  <div class="demo-input-suffix">
                    <el-input
                      placeholder="搜索框"
                      prefix-icon="el-icon-search"
                      v-model="input">
                    </el-input>
                  </div>
              </div>
            </el-col>
          </el-row >
          <el-row type="flex" class="row-bg" justify="space-around" >
            <el-col :span="6">
              <div class="grid-content ">
                <p >筛选</p>
              </div>
            </el-col>
            <el-col :span="2" >
              <div class="grid-content ">
                <el-link href="#" >所有</el-link>
              </div>
            </el-col>
            <el-col :span="2" v-for="item in types" :key="item.index">
              <div class="grid-content ">
                <el-link href="#" >{{item.label}}</el-link>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    其他<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>
          <el-table :data="document" style="width: 100%;padding-left: 80px ">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="fileName" label="文件名" width="180">
                <template slot-scope="scope">
                  <i class="el-icon-document">{{scope.row.fileName}}</i>
                </template>
            </el-table-column>
            <el-table-column prop="time" label="上传时间" width="180"> </el-table-column>
            <el-table-column prop="uploader" label="上传人"  width="120">  </el-table-column>
            <el-table-column  prop="view_range" label="可见范围" width="120"> </el-table-column>
            <el-table-column prop="type" label="标签"  width="150" >
              <template slot-scope="scope">
                <el-tag>{{scope.row.type}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column  label="下载次数" width="150" >
              <template slot-scope="scope">
                <i class="el-icon-download">{{scope.row.downloadTimes}}</i>
              </template>
            </el-table-column>
            <el-table-column label="操作"  width="200" >
                <template slot-scope="scope">
                  <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
                  <el-button size="mini"  @click="handleDownload(scope.$index, scope.row)">下载</el-button>
                </template>
              </el-table-column>
          </el-table>
          <div class="block">
              <el-pagination layout = "prev,pager,next" :total ="1000"> </el-pagination>
          </div>
          <!-- 弹出来的 -->
          <div class="mask" v-if="showModal" ></div>
          <div class="pop" v-if="showModal">
              <h1>上传资料</h1>
              <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" >
              <el-button size="small" type="primary">选择文件</el-button>
              </el-upload>
            <div>
              <p>可见范围</p>
                <el-select v-model="range" multiple>
                  <el-option  v-for="item in setViewRanges" :key="item.index"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
              </el-select>
            </div>
            <div>
              <p>分类</p>
              <el-select v-model="type" >
                <el-option  v-for="item in types" :key="item.index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
            </div>
            <el-button  @click="showModal=false" class="btn" type="primary">确认</el-button>
            <el-button  @click="showModal=false" class="btn" type="primary">取消</el-button>
          </div>
      </el-main>
  </div>
</template>
<style lang = "less">
  html,body{
    min-width: 1200px;
    *{
      margin: 0;
      padding: 0;
    }
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-button{
    width: 128px;
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
  }
  body > .el-container {
    margin-bottom: 40px;
  }

  .el-table td, .el-table th{
    text-align: center;

      .el-button{
        width:80px;
      }
  }

  .el-pagination{
    margin: 60px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .mask {
  background-color: #000;
  opacity: 0.3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.pop {
  background-color: #fff;
  position: fixed;
  top: 100px;
  left: 300px;
  width: 400px;
  z-index: 2;
  padding:20px;
  box-sizing: border-box;
.el-select {
    width: 100%;
  }
  *{
    text-align:left;
  }

  h1 {
    margin-bottom: 16px;
  }

  p{
    margin:16px 0 ;
  }

  .btn{
    float:right;
    margin-left: 16px;
    margin-top: 32px;
  }

}
</style>
<script>
import { Select, Option, Button, Table, TableColumn, Tag, Icon, Upload, Container, Main, Col, Row, Dropdown, DropdownItem, DropdownMenu, Link, Pagination, Input } from'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

export default {
    name: 'FileShare',
    components: {
        [Select.name]: Select,
        [Option.name]: Option,
        [Button.name]: Button,
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        [Tag.name]: Tag,
        [Icon.name]: Icon,
        [Upload.name]: Upload,
        [Container.name]: Container,
        [Main.name]: Main,
        [Col.name]: Col,
        [Row.name]: Row,
        [Dropdown.name]: Dropdown,
        [Link.name]: Link,
        [Pagination.name]: Pagination,
        [Input.name]: Input,
        [DropdownItem.name]: DropdownItem,
        [DropdownMenu.name]: DropdownMenu
    },
    data (){
        return {
            input: '',
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
            range: [],
            setViewRanges: [{
                value: '选项1',
                label: '全学院'
            }, {
                value: '选项2',
                label: '1301'
            }, {
                value: '选项3',
                label: '1302'
            }],
            showModal: false,
            document: [{
                id: 1,
                fileName: '啊速度就会幸福大家',
                time: '2016-05-02',
                view_range: ' 1518 弄',
                type: '家',
                downloadTimes: 5,
                uploader: '小米'
            }, {
                id: 2,
                fileName: '啊速度就会幸福大家',
                time: '2016-05-04',
                view_range: ' 1517 弄',
                type: '公司',
                downloadTimes: 5,
                uploader: '小红'
            }, {
                id: 3,
                fileName: '啊速度就会幸福大家',
                time: '2016-05-01',
                view_range: ' 1519 弄',
                type: '家',
                downloadTimes: 5,
                uploader: '小明'

            }, {
                id: 4,
                fileName: '啊速度就会幸福大家',
                time: '2016-05-03',
                view_range: ' 1516 弄',
                type: '公司',
                downloadTimes: 5,
                uploader: '阿黑'
            }]
        }
    },
    methods: {
        handleDownload(index, row) {
            console.log(index, row)
        },
        handleDelete(index, row) {
            console.log(index, row)
        },
        gotoSetting(path){
            this.$router.push({ path })
        }
    }
}
</script>
