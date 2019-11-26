<template>
    <div class="deleteAccount"></div>
</template>
<script>
import { prefix, responseHandler, userApi } from '@/api'
import { Message } from 'element-ui'
export default {
    name: 'deleteAccount',
    data(){
        return{

        }
    },
    methods: {
        deleteAccount(){
            this.$axios.post(prefix.api + userApi.deleteAccount, {
                account: this.account
            }).then((response)=>{
                console.log(response)
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
<style lang="less" scoped>

</style>
