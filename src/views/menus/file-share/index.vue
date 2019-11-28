<template>
  <div class="file-share">
      <el-main>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="12">
              <div class="grid-content ">
                <el-row>
                  <el-button type="primary" @click="showModal=true">上传资料</el-button>
                  <el-button type="primary" @click="top">置顶 </el-button>
                  <el-button type="primary"  @click="deleteFile">删除 </el-button>
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
            <el-col :span="4" >
              <div class="grid-content ">
                <el-link href="#" >所有</el-link>
              </div>
            </el-col>
            <el-col :span="4" v-for="item in typesOption" :key="item.id" >
              <div class="grid-content ">
                <el-link  value="item.id" @click="getSpecificTagFile(item.id)">{{item.file_tag}}</el-link>
              </div>
            </el-col>
          </el-row>
          <el-table :data="document" ref="multipleTable"  tooltip-effect="dark" style="width: 100%;padding-left: 80px "
          @selection-change="handleSelectionChange">
            <el-table-column  type="selection" width="55" >
            </el-table-column>
            <el-table-column :prop="document.file_name" label="文件名" width="180">
                <template slot-scope="scope">
                  <i class="el-icon-document">{{scope.row.file_name}}</i>
                </template>
            </el-table-column>
            <el-table-column :prop="document.create_at" label="上传时间" width="180">
              <template slot-scope="scope">
                  {{scope.row.create_at}}
              </template>
            </el-table-column>
            <el-table-column :prop="document.user_id" label="上传人"  width="120">
              <template slot-scope="scope">
                  {{scope.row.user_id}}
              </template>
            </el-table-column>
            <el-table-column  :prop="document.file_right_id" label="可见范围" width="120">
              <template slot-scope="scope">
                  {{scope.row.file_right_id}}
              </template>
            </el-table-column>
            <el-table-column :prop="document.tag_id" label="标签"  width="150" >
              <template slot-scope="scope">
                  <el-tag>{{scope.row.tag_id}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column :prop="document.download_counts" label="下载次数" width="150" >
              <template slot-scope="scope" style="font-size: 20px;">
                <i class="el-icon-download">{{scope.row.download_counts}}</i>
              </template>
            </el-table-column>
            <el-table-column label="操作"  width="200" >
                <template slot-scope="scope">
                  <el-button @click="handleDelete(scope.$index, scope.row)" type="text">删除</el-button>
                  <el-button size="mini"  @click="handleDownload(scope.$index, scope.row)">下载</el-button>
                </template>
              </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
                layout="prev, pager, next"
                 @current-change="getAllFile"
                :page-count="pageCount">
            </el-pagination>

        </div>
          <!-- 弹出来的 -->
          <div class="mask" v-if="showModal" ></div>
          <div class="pop" v-if="showModal">
              <h1>上传资料</h1>
              <el-upload class="upload-demo" :action=' UploadUrl()' :auto-upload = "false" :limit="1"
              :on-change="handleSelectFile"
              :on-exceed="handleExceed">
              <el-button size="small" type="primary">选择文件</el-button>
              </el-upload>
            <div>
              <p>可见范围</p>
                <el-select v-model="setRange" multiple>
                    <el-option  v-for="item in rangesOption" :key="item.id" :label="item.class" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div>
              <p>分类</p>
              <el-select v-model="setType" >
                    <el-option  v-for="item in typesOption" :key="item.id"  :label="item.file_tag" :value="item.id">
                    </el-option>
              </el-select>
            </div>
              <el-button  class="btn" type="primary" @click="submitUpload">确认</el-button>
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
import { Select, Option, Button, Table, TableColumn, Tag, Icon, Upload, Container, Main, Col, Row, Dropdown, DropdownItem, DropdownMenu, Link, Pagination, Input, Message } from'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import { prefix, responseHandler, fileApi } from '@/api'
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
        [DropdownMenu.name]: DropdownMenu,
        [Message.name]: Message
    },
    data (){
        return {
            input: '',
            typesOption: [],
            setType: '',
            setRange: [],
            rangesOption: [],
            showModal: false,
            document: [],
            pageCount: 1,
            fileList: [],
            multipleSelection: [],
            currentPage: 1,
            url: 'http://localhost/online-collage-platform-server/public/'
        }
    },
    created(){
        this.getAllFile()
        this.getAllTag()
        this.getFileRight()
    },
    methods: {
        getSpecificTagFile(id, page = 1){
            this.$axios.post(prefix.api + fileApi.getSpecificTagFile, { page, tagId: id }).then(response => {
                if(!responseHandler(response.data, this)){
                    Message.error(response.data.msg)
                }
                this.currentPage = page
                this.document = response.data.data.data
                this.pageCount = parseInt(response.data.data.pageCount)
            })
        },
        handleSelectionChange(val){
            this.multipleSelection = val
            // console.log(this.multipleSelection[0].id)
        },
        gotoSetting(path){
            this.$router.push({ path })
        },
        handleSelectFile(file){
            this.fileList = file
        },
        submitUpload(){
            // 完成上传文件接口
            let fd = new FormData()
            console.log(this.fileList.raw)
            if(this.fileList.length === 0){
                Message.error('你好像还没选择文件')
                return
            }
            if(this.fileList.raw.size / 1024 / 1024 > 8){
                Message.error('上传文件大于8M')
                return
            }
            if(this.setType === '' || this.setRange.length === 0){
                Message.error('好像有什么没选')
                return
            }
            fd.append('file', this.fileList.raw)
            fd.append('type', this.setType)
            fd.append('range', this.setRange.toString())
            this.$axios.post(prefix.api + fileApi.upload, fd).then(response => {
                if(!responseHandler(response.data, this)){
                    Message.error('上传失败')
                }
                Message.success(response.data.msg)
                this.getAllFile(this.currentPage)
            })
            this.showModal = false
            this.setType = ''
            this.setRange = []
        },
        UploadUrl(){
            return '返回需要上传的地址'
        },
        getAllFile(page = 1){
            this.$axios.post(prefix.api + fileApi.myFile, { page }).then(response => {
                if(!responseHandler(response.data, this)){
                    Message.error(response.data.msg)
                }
                this.currentPage = page
                this.document = response.data.data.data
                this.pageCount = parseInt(response.data.data.pageCount)
            })
            // 已完成获取我的文件接口
        },
        getAllTag(){
            this.$axios.post(prefix.api + fileApi.getAllTag).then(response => {
                if(!responseHandler(response.data, this)){
                    Message.error(response.data.msg)
                }
                this.typesOption = response.data.data
            })
            // 已完成获取所有标签接口
        },
        getFileRight(){
            this.$axios.post(prefix.api + fileApi.getAllFileRight).then(response => {
                if(!responseHandler(response.data, this)){
                    Message.error(response.data.msg)
                }
                this.rangesOption = response.data.data
            })
            // 已完成获取文件权限接口
        },
        handleDelete(index, row) {
            // 已完成删除文件接口
            this.$axios.post(prefix.api + fileApi.deleteFile, {
                fileId: this.document[index].id
            }).then(response => {
                if(!responseHandler(response.data, this)){
                    Message.error(response.data.msg)
                }
                Message.success(response.data.msg)
                this.getAllFile(this.currentPage)
            })
        },
        deleteFile(){
            this.$axios.post(prefix.api + fileApi.deleteFile, {
                fileId: this.multipleSelection[0].id
            }).then(response => {
                if(!responseHandler(response.data, this)){
                    Message.error(response.data.msg)
                }
                Message.success(response.data.msg)
                this.getAllFile(this.currentPage)
                this.multipleSelection = []
            })
        },
        handleDownload(index, row) {
            // 完成下载接口
            this.$axios.post(prefix.api + fileApi.download, {
                fileId: this.document[index].id
            }).then(response => {
                // if(!responseHandler(response.data, this)){
                //     Message.error(response.data.msg)
                // }
                console.log(response.data)
                window.open(response.data)
                // this.getAllFile()
            })
        },
        handleExceed(files, fileList){
            Message.error(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
            // 提示一次只能上传一个文件
        },
        top(){
            this.$axios.post(prefix.api + fileApi.top, {
                fileId: this.multipleSelection[0].id
            }).then(response => {
                if(!responseHandler(response.data, this)){
                    Message.error(response.data.msg)
                }
                Message.success(response.data.msg)
                this.getAllFile(this.currentPage)
                this.multipleSelection = []
            })
        }
    }
}
</script>
