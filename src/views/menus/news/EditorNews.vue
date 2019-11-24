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
            :before-remove="beforeRemove"
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
import E from 'wangeditor'

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
            news: [],
            update: [],
            remove: [],
            isClear: false,
            detail: '',
            fileFormData: null, // 将要上传的formdata数据
            percentage: 0, // 存放上传百分比
            editorContent: '',
            id: this.$route.params.id
        }
    },
    created(){
        this.fileFormData = new FormData()
        this.Content()
        this.getEdit()
    },
    methods: {
        // TODO
        // 获取新闻内容
        Content(){
            console.log(this.id)
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
                    console.log(this.fileList)
                    // console.log(this.file)
                })
        },
        getEdit(){
            // this.editorContent = data
            console.log(this.editorContent)
        },
        getEditContent(data){
            this.content = data
            console.log(this.content)
        },

        // 取消
        cancle(){
            this.dialog = true
        },
        submit() {
            this.$router.push({ name: 'News' })
        },
        dialogFormVisible(){
            this.dialog = false
        },
        // 保存
        saveNews() {
            let fileFormData = new FormData()
            fileFormData.append('newsTitle', this.text1)
            fileFormData.append('createdAt', this.text2)
            fileFormData.append('newsContent', this.editorContent)
            fileFormData.append('isInformed', Number(this.checked))
            for(let file of this.fileList){
                fileFormData.append('file[]', file.raw)
            }
            // console.log(fileFormData)
            this.$axios
                .post(prefix.api + newsApi.save, fileFormData)
                .then(response => {
                    console.log(this.text1)
                    console.log(this.text2)
                    console.log(this.editorContent)
                    console.log(this.checked)
                    console.log(fileFormData)
                })
        },
        // 存为草稿
        saveDraft(){
            let fileFormData = new FormData()
            fileFormData.append('newsTitle', this.text1)
            fileFormData.append('createdAt', this.text2)
            fileFormData.append('newsContent', this.editorContent)
            fileFormData.append('isInformed', Number(this.checked))
            for(let file of this.fileList){
                fileFormData.append('file[]', file.raw)
            }
            this.$axios
                .post(prefix.api + newsApi.draft, fileFormData)
                .then(response => {
                    // console.log(this.text1)
                    // console.log(this.text2)
                    // console.log(this.editorContent)
                    // console.log(this.checked)
                    // console.log(fileFormData)
                })
        },

        // TODO
        // 移除附件
        handleRemove(file, fileList) {
            // console.log(file, fileList)
            // this.remove.push(file)
            // this.fileList.pop(file)
            console.log(this.fileList)
        },
        beforeRemove(file, fileList) {
            // return this.$confirm(`确定移除 ${file.name} ?`)
        },
        handleChange(file, fileList) {
            // if(file in this.fileList){
            //     this.update.push(file)
            // }
            // this.news.push(file)
            // this.fileList.push(this.file)
            // console.log(file)
            // console.log(this.news)
            // console.log(this.fileList)
        },
        // handleChange(e, a){
        //     this.files.push(e.raw)
        // },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择3个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
        },
        // 限制类型大小
        beforeAvatarUpload(file){
            var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
            const isLt2M = file.size / 1024 / 1024 < 10
            if(!isLt2M){
                this.$message({
                    message: '上传文件不能超过10MB',
                    type: 'warning'
                })
            }
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
