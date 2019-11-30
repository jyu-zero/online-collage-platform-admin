<template>
  <div class="edit-body">
      <div class="hander">
        <template>
            <el-button id="cancel" type="text" @click="cancle">取消</el-button>
            <el-dialog title="取消" :visible.sync="dialog" center>
                <div class="word">是否确认离开当前页面?</div>
                <div slot="footer" class="dialog-footer">
                    <el-button class="cancle" @click="dialogFormVisible">取消</el-button>
                    <el-button class="submit" type="primary" @click="submit">确认</el-button>
                </div>
            </el-dialog>
        </template>
        <el-button class="save" type="primary" @click="saveNews">保存</el-button>
        <el-button class="draft" type="primary" @click="saveDraft">草稿</el-button>
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
            <editor v-model="editorContent" @input="getEdit"></editor>
        </div>
        <el-upload
            class="upload-demo"
            ref="upload"
            action="uploadfile"
            :on-change="handleChange"
            :on-remove="handleRemove"
            multiple
            :limit="3"
            :auto-upload="false"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button slot="trigger" size="small" type="primary" >选取文件</el-button>
            <div slot="tip" class="el-upload__tip">上传文件不能超过500kb</div>
        </el-upload>
    </div>
  </div>
</template>

<script>
import { prefix, responseHandler, newsApi } from '@/api'
import { Button, Input, Checkbox, Upload, Dialog } from 'element-ui'
import Editor from '@/components/news/Editorbox'

export default {
    name: 'EditorNews',
    components: {
        [Button.name]: Button,
        [Input.name]: Input,
        [Checkbox.name]: Checkbox,
        [Upload.name]: Upload,
        [Dialog.name]: Dialog,
        Editor
    },
    data() {
        return {
            text1: '',
            text2: '',
            dialog: false,
            checked: false,
            fileList: [],
            newUpload: [], // 存放新增附件
            deleteUpload: [], // 存放删除的附件的id
            fileId: [], // 存放从后端获取到的附件id
            isClear: false,
            detail: '',
            fileFormData: null, // 将要上传的formdata数据
            percentage: 0, // 存放上传百分比
            editorContent: '',
            id: this.$route.params.id // 获取后端的新闻id
        }
    },
    created(){
        this.Content()
        this.getEdit()
    },
    methods: {
        // 获取新闻内容
        Content(){
            this.$axios
                .get(prefix.api + newsApi.editNews, {
                    params: {
                        newsId: this.id
                    }
                })
                .then(response => {
                    this.text1 = response.data.data.new[0].news_title
                    this.text2 = response.data.data.new[0].created_at
                    this.checked = Boolean(response.data.data.new[0].is_informed)
                    this.editorContent = response.data.data.new[0].news_content
                    this.fileList = response.data.data.storage_path
                    // 把从后端获取到的当前新闻的附件的id放进fileId
                    for(let i = 0; i < this.fileList.length; i++){
                        this.fileId.push(this.fileList[i].file_id)
                    }
                })
        },
        getEdit(){
            console.log(this.editorContent)
        },
        getEditContent(data){
            this.content = data
        },

        // 取消按钮
        cancle(){
            this.dialog = true
        },
        submit() {
            this.$router.push({ name: 'News' })
        },
        dialogFormVisible(){
            this.dialog = false
        },

        // 保存按钮
        saveNews() {
            let fileFormData = new FormData()
            fileFormData.append('newsTitle', this.text1)
            fileFormData.append('createdAt', this.text2)
            fileFormData.append('newsContent', this.editorContent)
            fileFormData.append('isInformed', Number(this.checked))
            fileFormData.append('newsId', this.id)
            fileFormData.append('is_draft', '0')
            for(let file of this.deleteUpload){
                fileFormData.append('deleteUpload[]', file.file_id)
            }
            for(let file of this.newUpload){
                fileFormData.append('newUpload[]', file.raw)
            }
            this.$axios
                .post(prefix.api + newsApi.editSave, fileFormData)
                .then(response => {
                    if(!responseHandler(response.data, this)){
                        this.$message(response.data.msg)
                    }else{
                        this.$message(response.data.msg)
                        this.$router.push({ name: 'News' })
                    }
                })
        },

        // 草稿按钮
        saveDraft(){
            let fileFormData = new FormData()
            fileFormData.append('newsTitle', this.text1)
            fileFormData.append('createdAt', this.text2)
            fileFormData.append('newsContent', this.editorContent)
            fileFormData.append('isInformed', Number(this.checked))
            fileFormData.append('newsId', this.id)
            fileFormData.append('is_draft', '1')
            for(let file of this.deleteUpload){
                fileFormData.append('deleteUpload[]', file.file_id)
            }
            for(let file of this.newUpload){
                fileFormData.append('newUpload[]', file.raw)
            }
            this.$axios
                .post(prefix.api + newsApi.editSave, fileFormData)
                .then(response => {
                    if(!responseHandler(response.data, this)){
                        this.$message(response.data.msg)
                    }else{
                        this.$message(response.data.msg)
                        this.$router.push({ name: 'News' })
                    }
                })
        },

        // 移除附件
        handleRemove(file, fileList) {
            if(file.file_id !== undefined){
                this.deleteUpload.push(file)
            }else{
                let index = this.newUpload.indexOf(file)
                this.newUpload.splice(index, 1)
            }
        },
        handleChange(file, fileList) {
            this.newUpload.push(file)
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择3个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
        }
    }
}
</script>

<style lang="less" scoped>
.edit-body{
    height:100%;
    display: flex;
    flex-direction: column;
    margin: 20px;

    .hander{
        margin-left: auto;
        text-align: center;

        .word{
            text-align: center;
        }
    }

    .save, .draft, .cancle, .submit{
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
