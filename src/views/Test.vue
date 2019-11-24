<template>
  <div class="test">
      <el-button @click="handle">这是一个element按钮</el-button>
      <p>这是一个 font-awesome 图标示例</p>
      <font-awesome-icon icon="user-secret" />
      <input type="file" @change="handleChange">
      <el-upload
        class="upload-demo"
        action=""
        multiple
        :limit="3"
        :auto-upload="false"
        :on-change="handleChange">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-button size="small" type="primary" @click="handleUpload">真上传</el-button>
        <p>新闻标题</p>
        <el-input
            id="input"
            type="text"
            placeholder="请输入标题"
            v-model="text1"
            maxlength="10"
            show-word-limit>
        </el-input>
        <el-button class="save" type="primary" @click="save">保存</el-button>
  </div>
</template>

<script>
import { prefix, responseHandler, testApi, newsApi } from '@/api'
import { Button, Message, Upload, Input } from 'element-ui'
export default {
    name: 'Test',
    components: {
        [Button.name]: Button,
        [Message.name]: Message,
        [Upload.name]: Upload,
        [Input.name]: Input
    },
    data(){
        return {
            files: []
        }
    },
    created () {
        this.$axios.post(prefix.api + testApi.test).then((response)=>{
            if(!responseHandler(response.data, this)){
                // 在这里处理错误
                Message.error('请求失败')
            }
            Message.success('请求成功')
        })
    },
    methods: {
        // 保存
        save() {
            let fileFormData = new FormData()
            fileFormData.append('newsTitle', this.text1)
            for(let file of this.files){
                fileFormData.append('file[]', file)
            }
            this.$axios
                .post(prefix.api + testApi.test, fileFormData)
                .then(response => {
                })
        },
        handle(){
            this.$router.push('http://www.baidu.com')
        },
        handleChange(e, a){
            this.files.push(e.raw)
        },
        handleUpload(){
            let formData = new FormData()
            formData.append('hello', 'hello')
            for(let file of this.files){
                formData.append('file[]', file)
            }
            this.$axios.post(prefix.api + testApi.test, formData).then((response)=>{
                if(!responseHandler(response.data, this)){
                    // 在这里处理错误
                    Message.error('请求失败')
                }
                Message.success('请求成功')
            })
        }
    }
}
</script>

<style lang="less">
    .test{
        height:100%;
  }
</style>
