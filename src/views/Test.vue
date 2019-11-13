<template>
  <div class="test">
      <el-button @click="handle">这是一个element按钮</el-button>
      <p>这是一个 font-awesome 图标示例</p>
      <font-awesome-icon icon="user-secret" />
  </div>
</template>

<script>
import { prefix, responseHandler, testApi } from '@/api'
import { Button, Message } from 'element-ui'
export default {
    name: 'Test',
    components: {
        [Button.name]: Button,
        [Message.name]: Message
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
        handle(){
            this.$router.push('http://www.baidu.com')
        }
    }
}
</script>

<style lang="less">
    .test{
        height:100%;
    }
</style>
