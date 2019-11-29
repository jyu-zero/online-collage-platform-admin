<template>
    <div class="thing-item">
        <div class="set-btn" v-show="isShow">
            <el-dropdown @command="handleOperation">
                <span class="el-dropdown-link set-icon">
                    <font-awesome-icon icon="ellipsis-h"/>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="deleteGoods" style="text-align: center">删除</el-dropdown-item>
                    <el-dropdown-item command="setPersonOperation" style="text-align: center">{{setBtnNaem}}</el-dropdown-item>
                    <el-dropdown-item command="setCollage">
                        <el-switch
                            v-model="isCollage"
                            :active-value="isManagedByCollage ? false : true"
                            active-color="#13ce66"
                            inactive-text="学院托管">
                        </el-switch>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <!-- 这里img的地址应写用户上传的失物图片 -->
        <img :src="imgSrc" alt="">
        <div class="position-all flex-center thing-bg">
            <p class="title">{{info}}</p>
            <!-- 是否学院托管 -->
            <span v-if="isManagedByCollage">学院托管</span>
        </div>
        <div class="info position-all" :style="{opacity: (isShow ? '0' : '1')}" @mouseout="hideSet" @mouseleave="showSet">
            <div class="bg-blur position-all">
                <!-- 这里img的地址应写用户上传的失物图片 -->
                <img :src="imgSrc" alt="">
            </div>
            <div class="info-body pending" @mouseleave="handleRevise(thingItem)">
                <div class="body-message">
                    <div class="thing-message">
                        <p class="thing-title" :title="title">{{title}}</p>
                        <div class="content">
                            <p class="item">&nbsp;{{actionStr}}地址:&nbsp;</p>
                            <input type="text" :value="place" class="r-where">
                        </div>
                        <div class="content">
                            <p class="item">&nbsp;{{actionStr}}时间:&nbsp;</p>
                            <input type="text" :value="time" class="r-time">
                        </div>
                        <div class="content">
                            <p class="item">&nbsp;{{actionStr}}者姓名:&nbsp;</p>
                            <input type="text" :value="name" class="r-name">
                        </div>
                        <div class="content">
                            <p class="item">&nbsp;联系方式:&nbsp;</p>
                            <input type="text" :value="contact" class="r-contact">
                        </div>
                    </div>
                    <button class="blue-btn btn claim-btn" @click="handleVerify(goodId, isSearch, index)">确认{{btnName}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Dropdown, Switch, MessageBox } from 'element-ui'
export default {
    name: 'PendingGoods',
    data(){
        return {
            isShow: true,
            // 学院保管
            isCollage: this.isManagedByCollage,
            // 无人认领或无人拾取
            isPersonOperation: false
        }
    },
    components: {
        [Dropdown.name]: Dropdown,
        [Switch.name]: Switch,
        [MessageBox.name]: MessageBox
    },
    computed: {
        btnName(){
            if(this.actionStr === '拾取'){
                return '认领'
            }else{
                return'找回'
            }
        },
        setBtnNaem(){
            if(this.actionStr === '拾取'){
                return '无人认领'
            }else{
                return'无人拾取'
            }
        }
    },
    props: {
        thingItem: {
            type: Object
        },
        index: {
            type: Number
        },
        actionStr: {
            type: String,
            default: '拾取'
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
        info: {
            type: String
        },
        isSearch: {
            type: Boolean
        },
        goodId: {
            type: Number
        },
        sort: {
            type: Number
        },
        status: {
            type: Number
        }
    },
    methods: {
        handleRevise(goodsInfo){
            let goods = {}
            let pendingRetrieveEle = document.getElementsByClassName('pending')[0]
            goods.where = pendingRetrieveEle.getElementsByClassName('r-where')[0].value
            goods.time = pendingRetrieveEle.getElementsByClassName('r-time')[0].value
            goods.name = pendingRetrieveEle.getElementsByClassName('r-name')[0].value
            goods.contact = pendingRetrieveEle.getElementsByClassName('r-contact')[0].value
            this.$emit('revise', {
                goodsInfo,
                sort: this.sort,
                goods
            })
        },
        handleVerify(goodId, isSearch, index){
            this.$emit('verify', {
                goodId,
                isSearch,
                index
            })
        },
        hideSet(){
            this.isShow = false
        },
        showSet(){
            this.isShow = true
        },
        handleOperation(operation){
            switch (operation){
                // 删除操作
                case 'deleteGoods':
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
                    break
                case 'setCollage':
                    // 设置是否学院托管
                    this.$emit('setCollage', {
                        isCollage: this.isCollage,
                        goodId: this.goodId,
                        sort: this.sort,
                        thingItem: this.thingItem
                    })
                    break
                case 'setPersonOperation':
                    // 设置是否无人认领或无人找回
                    this.$emit('setPersonOperation', {
                        personOperation: this.personOperation,
                        goodId: this.goodId,
                        sort: this.sort
                    })
                    break
            }
        }
    }
}
</script>

<style lang="less">

input{
    outline: none;
}

.btn{
    cursor: pointer;
    display: inline-block;
    border: 0;
    padding: 8px 18px;
    font-size: 14px;
    color: #fff;
    font-weight: 500;
    border-radius: 4px;
    margin-left: 15px;
    transition: all .2s;
    user-select: none;
}

.red-btn{
    background-image: -webkit-gradient(
                        linear,
                        left bottom,
                        left top,
                        color-stop(0, #e04848),
                        color-stop(1, #ff6161)
    );
    box-shadow: inset 0px 1px 0px #f77575, 0px 4px 0px #cc2727;
}

.red-btn:active{
    box-shadow: inset 0 0 6px 0 rgba(0, 0, 0, .6);
    background-image: -webkit-gradient(
                        linear,
                        left bottom,
                        left top,
                        color-stop(0, #ff6161),
                        color-stop(1, #e04848)
    );
}

.blue-btn{
    background-image: -webkit-gradient(
                        linear,
                        left bottom,
                        left top,
                        color-stop(0, #2c9cc5),
                        color-stop(1, #3eb8e5)
    );
    box-shadow: inset 0px 1px 0px #7fd2f1, 0px 4px 0px #156785;
}

.blue-btn:active{
    box-shadow: inset 0 0 6px 0 rgba(0, 0, 0, .6);
    background-image: -webkit-gradient(
                        linear,
                        left bottom,
                        left top,
                        color-stop(0, #3eb8e5),
                        color-stop(1, #2ca0ca)
    );
}

.flex-center{
    display: flex;
    justify-content: center;
    align-items: center;
}

.position-all{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.thing-item{
    display: inline-block;
    margin-right: 30px;
    position: relative;
    width: 220px;
    height: 260px;
    background-color: black;
    overflow: hidden;

    .set-btn{
        position: absolute;
        padding: 0 8px;
        z-index: 10;
        right: 0;
        top: 0;

        .set-icon{
            cursor: pointer;
            font-size: 27px;
            color: white;
        }
    }

    img{
        filter: brightness(.85);
        width: 100%;
        height: 100%;
    }

    p{
        text-shadow: 0 2px 8px #000;
        margin: 0;
    }

    .thing-bg{
        // flex-direction: column;
        align-items: flex-end;
        z-index: 1;
        padding-bottom: 10px;

        span{
            font-size: 12px;
            margin: 3px;
            padding: 1px 8px;
            background-color: #ffe881;
            border-radius: 3px;
        }
    }

    .title{
        font-size: 20px;
        color: #fff;
        border: 0;
        padding: 0;
    }

    .info{
        z-index: 9;
        transform-style: preserve-3d;
        transform: translateZ(-100px);
        opacity: 0;
        transition: all .4s;
        color: #ddd;

        .info-body{
            position: relative;
            color: #fff;
            font-size: 14px;
            height: 100%;

            .body-message{
                padding: 10px 15px;

                .claim-btn{
                    font-size: 14px;
                    padding: 2px 6px;
                    margin: 4px 0 0;
                }

                .thing-message{
                    // word-break: break-all;

                    p{
                        // 很重要!!!!!!!
                        // TODO: 控制显示行数失效,有待解决
                        font-size: 14px;
                        margin-bottom: 2px;
                        display: -webkit-box;
                        line-clamp: 2;
                        -webkit-line-clamp: 2;
                        text-overflow: ellipsis;
                        font-size: 13px;
                        overflow: hidden;
                        -webkit-box-orient: vertical;
                        color: #d6dee4;
                    }

                    input{
                        font-family: Microsoft Yahei;
                        background-color: transparent;
                        border: 0;
                        font-size: 12px;
                        color: #f3f2f2;
                        height: 16px;
                        letter-spacing: .5px;
                        border-radius: 3px;
                        padding: 0 6px;
                        margin-left: -6px;
                        transition: all .2s;
                        box-sizing: border-box;
                        border: 1px solid hsla(0, 0%, 100%, 0);
                    }

                    input:hover{
                        background-color: hsla(0, 0%, 100%, .2);
                        border: 1px solid hsla(0, 0%, 100%, .5);
                    }

                    input:focus{
                        background-color: #444;
                    }

                    .content{
                        margin-bottom: 7px;

                        .item{
                            font-size: 14px;
                        }
                    }

                    .thing-title{
                        color: #fff;
                        font-size: 18px;
                        text-align: center;
                        margin-bottom: 6px;
                        display: inline-block;
                        height: 22px;
                        width: 100%;
                        white-space: nowrap;
                    }
                }
            }
        }
    }

    .already{
        visibility: visible;
        opacity: 1;
    }
}

.thing-item:hover .info{
    transform: translateZ(0);
    opacity: 1;
}

</style>
