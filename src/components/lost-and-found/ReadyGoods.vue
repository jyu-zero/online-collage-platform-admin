<template>
  <div class="thing-item fade-slide">
        <!-- 这里img的地址应写用户上传的失物图片 -->
        <img :src="imgSrc" alt="">
        <div class="position-all">
            <div class="flex-center thing-bg position-all">
                <p class="title">{{info}}</p>
                <!-- 是否学院托管 -->
                <span v-if="isManagedByCollage">学院托管</span>
            </div>
            <div class="info already">
                <div class="info-body">
                    <div class="body-message">
                        <div class="thing-message">
                            <p class="thing-title" :title="title">{{title}}</p>
                            <div class="content">
                                <p class="item">&nbsp;{{actionStr}}地址:&nbsp;</p>
                                <span>{{place}}</span>
                            </div>
                            <div class="content">
                                <p class="item">&nbsp;{{actionStr}}时间:&nbsp;</p>
                                <span>{{time}}</span>
                            </div>
                            <div class="content">
                                <p class="item">&nbsp;{{actionStr}}者姓名:&nbsp;</p>
                                <span>{{name}}</span>
                            </div>
                            <div class="content">
                                <p class="item">&nbsp;联系方式:&nbsp;</p>
                                <span>{{contact}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="info position-all">
            <div class="bg-blur position-all">
                <!-- 这里img的地址应写用户上传的失物图片 -->
                <img :src="imgSrc" alt="">
            </div>
            <div class="info-body">
                <div class="body-message" v-if="statusCode">
                    <div class="thing-message">
                        <p class="thing-title" :title="title">{{title}}</p>
                        <div class="content">
                            <p class="item">&nbsp;{{handleName}}姓名:&nbsp;</p>
                            <span>{{enterName}}</span>
                        </div>
                        <div class="content">
                            <p class="item">&nbsp;联系方式:&nbsp;</p>
                            <span>{{enterNum}}</span>
                        </div>
                        <div class="content">
                            <p class="item">&nbsp;{{handleName}}时间:&nbsp;</p>
                            <span>{{enterTime}}</span>
                        </div>
                    </div>
                    <button class="red-btn btn claim-btn" @click="deteleGoods">删除</button>
                </div>
                <p class="error unable-handle" v-if="!statusCode">无法{{explainName}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { MessageBox } from 'element-ui'
export default {
    name: 'ReadyGoods',
    computed: {
        handleName(){
            if(this.actionStr === '拾取'){
                return '遗失'
            }else{
                return '拾取'
            }
        },
        explainName(){
            if(this.actionStr === '拾取'){
                return '认领'
            }else{
                return'找回'
            }
        },
        statusCode(){
            if(this.status === 2){
                return false
            }else{
                return true
            }
        }
    },
    components: {
        [MessageBox.name]: MessageBox
    },
    methods: {
        deteleGoods(){
            this.$confirm('将删除该物品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
                this.$emit('delete', {
                    goodId: this.goodId,
                    sort: this.sort,
                    index: this.index,
                    isSearch: this.isSearch,
                    status: this.status
                })
            }).catch(() => {
                this.$message({
                    type: 'error',
                    message: '已取消删除'
                })
            })
        }
    },
    props: {
        thingItem: {
            type: Object
        },
        unetrieved: {
            type: Boolean,
            default: true
        },
        actionStr: {
            type: String
        },
        title: {
            type: String
        },
        place: {
            type: String
        },
        time: {
            type: String
        },
        name: {
            type: String
        },
        contact: {
            type: String
        },
        imgSrc: {
            type: String
        },
        isManagedByCollage: {
            type: Number
        },
        enterName: {
            type: String
        },
        enterNum: {
            type: String
        },
        enterTime: {
            type: String
        },
        info: {
            type: String
        },
        sort: {
            type: Number
        },
        goodId: {
            type: Number
        },
        index: {
            type: Number
        },
        isSearch: {
            type: Boolean
        },
        status: {
            type: Number
        }
    }
}
</script>

<style>
    .fade-slide{
        animation: slide .6s
    }

    @keyframes slide {
        0%{
            opacity: 0;
            transform: translateX(-100px)
        }
        100%{
            opacity: 1;
            transform: translateX(0)
        }
    }

    button{
        outline: none;
    }

    .error{
        color: rgb(247, 53, 53);
        font-size: 18px;
        font-weight: 500;
    }

    .unable-handle{
        text-align: center;
        margin-top: 100px !important;
    }
</style>
