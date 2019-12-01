<template>
    <div class="thing-item fade-slide">
        <div class="set-btn" v-show="isShow">
            <el-dropdown @command="handleOperation">
                <span class="el-dropdown-link set-icon">
                    <font-awesome-icon icon="ellipsis-h"/>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="deleteGoods" title="删除物品" style="text-align: center">删除</el-dropdown-item>
                    <el-dropdown-item command="setPersonOperation" :title="'是否' + setBtnNaem" style="text-align: center">{{setBtnNaem}}</el-dropdown-item>
                    <el-dropdown-item command="setCollage" title="是否学院托管">
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
                        <input class="thing-title r-title" type="text" :title="title" v-model="titleData">
                        <div class="content">
                            <p class="item">&nbsp;{{actionStr}}地址:&nbsp;</p>
                            <input type="text" v-model="placeData" class="r-where">
                        </div>
                        <div class="content">
                            <p class="item">&nbsp;{{actionStr}}时间:&nbsp;</p>
                            <input type="text" v-model="timeData" class="r-time">
                        </div>
                        <div class="content">
                            <p class="item">&nbsp;{{actionStr}}者姓名:&nbsp;</p>
                            <input type="text" v-model="nameData" class="r-name">
                        </div>
                        <div class="content">
                            <p class="item">&nbsp;联系方式:&nbsp;</p>
                            <input type="text" v-model="contactData" class="r-contact">
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
            isPersonOperation: false,
            placeData: '',
            timeData: '',
            nameData: '',
            contactData: '',
            titleData: ''
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
    created(){
        this.placeData = this.place
        this.timeData = this.time
        this.nameData = this.name
        this.contactData = this.contact
        this.titleData = this.title
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
            // let pendingEle = document.getElementsByClassName('pending')[0]
            goods.where = this.placeData
            goods.time = this.timeData
            goods.name = this.nameData
            goods.contact = this.contactData
            goods.title = this.titleData
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
                case 'deleteGoods':
                    // 删除操作
                    this.$confirm('将删除该物品, 是否继续?', '删除物品', {
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
                    this.$confirm('该物品将取消/设置为学院托管, 是否继续?', '学院托管', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '设置成功!'
                        })
                        this.$emit('setCollage', {
                            isCollage: this.isCollage,
                            goodId: this.goodId,
                            sort: this.sort,
                            thingItem: this.thingItem
                        })
                    }).catch(() => {
                        this.isCollage = !this.isCollage
                        this.$message({
                            type: 'error',
                            message: '已取消设置'
                        })
                    })
                    break
                case 'setPersonOperation':
                    // 设置是否无人认领或无人找回
                    this.$confirm('该物品将无法追溯, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '设置成功!'
                        })
                        this.$emit('setPersonOperation', {
                            personOperation: this.personOperation,
                            goodId: this.goodId,
                            sort: this.sort,
                            index: this.index,
                            status: this.status,
                            isSearch: this.isSearch,
                            thingItem: this.thingItem
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'error',
                            message: '已取消设置'
                        })
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

.bg-blur{
    filter: blur(2px) brightness(.5);
    box-shadow: inset 0 0 12px 4px #000;
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
        filter: brightness(.8);
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
