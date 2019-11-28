<template>
  <div class = "SettingShare">
      <el-main>
          <el-row >
              <el-col :span="5">
                  <div class="grid-content " >
                      <el-button type="primary" @click = "gotoShareHome('/file-share')">返回共享列表</el-button>
                  </div>
              </el-col>
              <el-col :span="5" :offset="10">
                  <div class="grid-content " >
                      <el-button type="primary" @click = "saveSetting">保存</el-button>
                  </div>
              </el-col>
          </el-row>

          <el-row >
              <el-col :span="6">
                  <div class="grid-content " >
                      <el-card class="box-card">
                          <div slot="header" class="clearfix">
                              <span >分类管理</span>
                              <el-dropdown style="float: right; padding: 3px 0" @command="handleCommand">
                                  <span class="el-dropdown-link">
                                      更多分类<i class="el-icon-arrow-down el-icon--right"></i>
                                  </span>
                                  <el-dropdown-menu slot="dropdown">
                                      <el-dropdown-item command = "addShowModel"> 添加</el-dropdown-item>
                                      <el-dropdown-item command = "delShowModel">删除</el-dropdown-item>
                                  </el-dropdown-menu>
                              </el-dropdown>
                          </div>
                          <div v-for="item in allTypes" :key="item.index" class="text item">
                              {{ item.file_tag }}
                          </div>
                      </el-card>
                  </div>
              </el-col>
          </el-row>

          <el-row>
              <el-col :span="24">
                  <div class="grid-content ">
                      <el-radio v-model="isPermit" label=1>允许普通用户分享资料</el-radio>
                  </div>
              </el-col>
          </el-row>

          <el-row>
              <el-col :span="24">
                  <div class="grid-content ">
                      <el-radio v-model="isPermit" label=2>允许普通用户分享资料到全学院</el-radio>
                  </div>
              </el-col>
          </el-row>

          <div id = "select">
              <div> 每个班级的文件容量 </div>
              <el-select v-model="totalSize" >
                  <el-option v-for="item in setTotalSize" :key="item.id" :label="item.label" :value="item.label" >
                  </el-option>
              </el-select>
          </div>

          <!-- 添加弹出来的 -->
          <div class="mask" v-if="addShowModel" ></div>
          <div class="pop" v-if="addShowModel">
              <h1>添加类型</h1>
              <el-input
                type="text"
                placeholder="请输入添加的类型"
                v-model="addType"
                maxlength="6"
                show-word-limit
              >
              </el-input>
              <el-button  @click="addTag();addShowModel=false;" class="btn" type="primary">确认</el-button>
              <el-button  @click="addShowModel=false" class="btn" type="primary">取消</el-button>
          </div>

          <!-- 删除弹出来的 -->
          <div class="mask" v-if="delShowModel" ></div>
          <div class="pop" v-if="delShowModel">
              <h1>删除类型</h1>
              <el-input
                type="text"
                placeholder="请输入删除的类型"
                v-model="delType"
                maxlength="6"
                show-word-limit
              >
              </el-input>
              <p>!注意'其他'类型不可删除</p>
              <el-button  @click="deleteTag();delShowModel=false;" class="btn" type="primary">确认</el-button>
              <el-button  @click="delShowModel=false" class="btn" type="primary">取消</el-button>
          </div>

      </el-main>
</div>

</template>

<script>
import { Select, Option, Button, Checkbox, Card, Main, Col, Row, Dropdown, DropdownItem, DropdownMenu, Input, Message, Radio }from'element-ui'
import { prefix, responseHandler, fileApi } from '@/api'
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
        [DropdownMenu.name]: DropdownMenu,
        [Input.name]: Input,
        [Message.name]: Message,
        [Radio.name]: Radio
    },
    data (){
        return {
            addType: '',
            delType: '',
            addShowModel: false,
            delShowModel: false,
            allTypes: [],
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
            isPermit: 0
        }
    },
    created(){
        this.getAllTag()
    },
    methods: {
        gotoShareHome(path){
            this.$router.push({ path })
        },
        handleCommand(command) {
            if (command === 'delShowModel'){
                this.delShowModel = !this.delShowModel
            } else {
                this.addShowModel = !this.addShowModel
            }
        },
        saveSetting(){
            switch(this.totalSize){
                case '500M': { this.totalSize = 500 * 1024 * 1024
                    break }
                case '1G': { this.totalSize = 1024 * 1024 * 1024 * 1024
                    break }
                case '2G': { this.totalSize = 2048 * 1024 * 1024 * 1024
                    break }
                case '4G': { this.totalSize = 4096 * 1024 * 1024 * 1024
                    break }
            }
            this.$axios.post(prefix.api + fileApi.fileSetting, {
                totalSize: this.totalSize,
                isPermit: this.isPermit
            }).then(response => {
                if(!responseHandler(response.data, this)){
                    Message.error(response.data.msg)
                }
                Message.success('保存成功')
            })
        },
        getAllTag(){
            this.$axios.post(prefix.api + fileApi.getAllTag).then(response => {
                if(!responseHandler(response.data, this)){
                    Message.error(response.data.msg)
                }
                this.allTypes = response.data.data
            })
            // 已完成获取所有标签接口
        },
        addTag(){
            this.$axios.post(prefix.api + fileApi.addTag, { new_tag: this.addType }).then(response => {
                if(!responseHandler(response.data, this)){
                    Message.error(response.data.msg)
                }
                this.allTypes = response.data.data
                this.getAllTag()
            })
        },
        deleteTag(){
            this.$axios.post(prefix.api + fileApi.deleteTag, { tag: this.delType }).then(response => {
                if(!responseHandler(response.data, this)){
                    Message.error(response.data.msg)
                }
                this.allTypes = response.data.data
                this.getAllTag()
            })
        }
    }
}
</script>

<style lang ="less">
    .el-radio{
      float: left;
    }
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
        /* padding-left: 150px; */

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
        left: 600px;
        width: 400px;
        z-index: 2;
        padding:20px;
        box-sizing: border-box;

          *{
            text-align:left;
          }

          .btn{
            float:right;
            margin-left: 16px;
            margin-top: 32px;
          }

          h1{
            margin-bottom: 32px;
          }

          p{
            margin-top:16px;
          }
    }

</style>
