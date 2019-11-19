<template>
  <div class="create-body">
      <div class="hander">
        <template>
            <el-button id="cancel" type="text" @click="open">取消</el-button>
        </template>
        <el-button id="save" type="primary">保存</el-button>
        <el-button id="draft" type="primary">草稿</el-button>
    </div>
    <div>
        <p>新闻标题</p>
        <el-input
            id="input"
            type="text"
            placeholder="请输入标题"
            v-model="text1"
            maxlength="10"
            show-word-limit>
        </el-input>
        <p>新闻发表时间</p>
        <el-input
            id="input"
            type="text"
            placeholder="请输入时间"
            v-model="text2"
            maxlength="10"
            show-word-limit>
        </el-input>
        <template>
            <el-checkbox id="checked" v-model="checked">同时作为通知发送</el-checkbox>
        </template>
        <div class="editor">
            <editor @func='getEditContent'></editor>
        </div>
        <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">上传附件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
  </div>
</template>

<script>
import { Button, Input, Checkbox, Upload } from 'element-ui'
import Editor from '@/components/news/Editorbox'
import E from 'wangeditor'

export default {
    name: 'CreateNews',
    components: {
        [Button.name]: Button,
        [Input.name]: Input,
        [Checkbox.name]: Checkbox,
        [Upload.name]: Upload,
        Editor
    },
    data() {
        return {
            text1: '',
            text2: '',
            checked: false,
            fileList: '',
            isClear: false,
            detail: '',
            fileFormData: null
        }
    },
    created(){
        this.fileFormData = new FormData()
    },
    methods: {
        open() {
            this.$confirm('检测到未保存的内容，是否在离开页面前保存修改', '确认信息', {
                distinguishCancelAndClose: true,
                confirmButtonText: '保存',
                cancelButtonText: '放弃修改'
            })
                .then(() => {
                    this.$message({
                        type: 'info',
                        message: '保存修改'
                    })
                })
                .catch(action => {
                    this.$message({
                        type: 'info',
                        message: action === 'cancel'
                            ? '放弃保存并离开页面'
                            : '停留在当前页面'
                    })
                })
        },
        handleRemove(file, fileList) {
            console.log(file, fileList)
        },
        handlePreview(file) {
            console.log(file)
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择3个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name} ?`)
        }
    }
}
</script>

<style lang="less" scoped>
.create-body{
    height:100%;
    display: flex;
    flex-direction: column;
    margin: 20px;

    .hander{
        margin-left: auto;
        text-align: center;
    }

    #save, #draft{
        padding: 8px 10px;
        margin-left: 16px;
    }

    p, #input{
        font-size: 14px;
    }

    #checked{
        margin: 14px 0;
    }

    .editor{
        margin-bottom: 14px;
    }
}
</style>
