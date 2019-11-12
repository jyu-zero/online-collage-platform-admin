<template>
    <div class="all">
        <div class="wrap">
            <div class="title">失物招领</div>
            <div class="head-body">
                <div class="wrap-head">
                    <div class="left-core">
                        <input type="text" class="search-input" placeholder="搜索物品">
                    </div>
                    <div class="right-core">
                        <button class="btn" title="丢失物品" @click="goTo('Lose')">我丢了东西</button>
                        <button class="btn" title="拾取物品" @click="goTo('Found')">捡到物品</button>
                    </div>
                </div>
                <div class="pending-claim thing">
                    <div class="title category">
                        <span>待认领</span>
                    </div>
                    <div class="thing-item">
                        <!-- 这里img的地址应写用户上传的失物图片 -->
                        <img src="" alt="">
                        <p class="title">蓝色U盘</p>
                        <div class="info position-all">
                            <div class="bg-blur position-all"></div>
                            <div class="info-body">
                                <div class="body-message">
                                    <div class="thing-message">
                                        <p>&nbsp;联系方式:&nbsp;</p>
                                        <p class="content">123165161111111111111111111111111111111111111516565651564565456</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="thing-item">
                        <!-- 这里img的地址应写用户上传的失物图片 -->
                        <img src="" alt="">
                        <p class="title">蓝色U盘</p>
                        <div class="info position-all">
                            <div class="bg-blur position-all"></div>
                            <div class="info-body">
                                <!-- <p class="info-name title">蓝色U盘</p> -->
                            </div>
                        </div>
                    </div>
                    <div class="thing-item">
                        <!-- 这里img的地址应写用户上传的失物图片 -->
                        <img src="" alt="">
                        <p class="title">蓝色U盘</p>
                        <div class="info position-all">
                            <div class="bg-blur position-all"></div>
                            <div class="info-body">
                                <!-- <p class="info-name title">蓝色U盘</p> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { Button, Message } from 'element-ui'
export default {
    name: 'Lose-Found',
    data(){
        return {
            imgTotal: 4
        }
    },
    components: {
        [Button.name]: Button,
        [Message.name]: Message
    },
    mounted(){
        this.setShowImgAmountn()
    },
    methods: {
        // 设置显示图片的数量
        setShowImgAmountn(){
            let divTotalWidth = document.getElementsByClassName('thing')[0].offsetWidth
            let divWidth = document.getElementsByClassName('thing-item')[0].offsetWidth
            let gapRight = parseInt(getComputedStyle(document.getElementsByClassName('thing-item')[0], null).marginRight)
            let divSize = divWidth + gapRight
            let imgTotal = Math.floor(divTotalWidth / divSize)
            this.imgTotal = imgTotal
            console.log(this.imgTotal)
        },
        // 去往丢东西或者捡到东西
        goTo(name){
            this.$router.push({ name }).catch(err => { console.log(err) })
        }
    }
}
</script>

<style lang="less" scoped>
    input{
        outline: none;
    }

    button{
        outline: none;
        cursor: pointer;
    }
    
    .all{
        position: relative;
        width: 100%;
        height: 100%;
    }

    .wrap{
        padding: 30px 0;
        font-family: Arial, Helvetica, sans-serif;
        width: 80%;
        margin: 0 auto;
        /* background-color: #3e3e3e; */

        .title{
            text-shadow: 0 0 1px #5e91fa;
            // display: inline-block;
            padding: 2px 15px;
            color: #5e91fa;
            font-size: 25px;
            border-bottom: 1px solid #5e91fa;
        }

        .head-body{
            margin-top: 15px;
        }
        .wrap-head{
            display: flex;
            justify-content: space-between;

            .search-input{
                display: inline-block;
                background-color: #ddd;
                font-size: 14px;
                height: 35px;
                width: 200px;
                border-radius: 3px;
                padding: 3px 15px;
                border: 1px solid #999;
                transition: all .2s;
            }

            .search-input:focus{
                border: 1px solid #5e91fa;
                background-color: #fff;
            }
        }

        .btn{
            display: inline-block;
            border: 1px solid #50a7ff;
            padding: 8px 18px;
            background-color: #50a7ff;
            font-size: 14px;
            color: #fff;
            font-weight: 500;
            border-radius: 4px;
            margin-left: 15px;
            transition: all .4s;
        }

        .btn:hover{
            background-color: #2c96ff;
        }

        .thing{
            margin: 20px 0;

            .category{
                position: relative;
                margin-bottom: 15px;
                border: 0;
                font-size: 23px;

                span{
                    text-shadow: 0 0 0 rgba(0, 0, 0, 0);
                    padding: 0 10px;
                    background-color: white;
                }
            }
            .category::after{
                content: '';
                z-index: -1;
                position: absolute;
                top: 50%;
                left: 0;
                width: 120px;
                height: 2px;
                background-color: #5e91fa;
            }
        }

        .thing-item{
            display: inline-block;
            margin-right: 30px;
            position: relative;
            width: 190px;
            height: 230px;
            background-color: black;
            overflow: hidden;

            img{
                width: 100%;
                height: 100%;
            }

            p{
                margin: 0;
            }

            .title{
                position: absolute;
                top: 30%;
                left: 50%;
                transform: translate(-50%);
                font-size: 21px;
                color: #ddd;
                border: 0;
                padding: 0;
                transition: all .4s;
            }

            .info{
                visibility: hidden;
                transform-style: preserve-3d;
                transform: translateZ(-100px);
                opacity: 0;
                transition: all .4s;
                color: #ddd;
                
                .bg-blur{
                    // 这里背景图的地址应写用户上传的失物图片
                    background-color: #0788c4;
                    filter: blur(5px);
                }

                .info-body{
                    position: relative;
                    color: #fff;
                    font-size: 14px;
                    height: 100%;

                    .body-message{
                        padding: 40px 15px 10px;

                        .thing-message{
                            word-break: break-all;

                            .content{
                                overflow: hidden;
                                height: 30px;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                                text-overflow: ellipsis;
                                font-size: 13px;
                            }
                        }
                    }
                }
            }
        }

        .thing-item:hover .info{
            visibility: visible;
            transform: translateZ(0);
            opacity: 1;
        }

        .thing-item:hover .title{
            font-size: 18px;
            z-index: 10;
            color: #fff;
            top: 10px;
        }
    }

    .position-all{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    .black{
        background-color: rgba(0, 0, 0, .7);
    }
</style>
