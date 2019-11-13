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
                        <button class="btn blue-btn" title="丢失物品" @click="goTo('Lose')">我丢了东西</button>
                        <button class="btn red-btn" title="拾取物品" @click="goTo('Found')">捡到物品</button>
                    </div>
                </div>
                <div class="pending-claim thing">
                    <div class="title category">
                        <span>待认领</span>
                    </div>
                    <div class="thing-item" v-for="thingItem of pendingclaimImgMessage" :key="thingItem.id">
                        <!-- 这里img的地址应写用户上传的失物图片 -->
                        <img src="./img/2.jpg" alt="">
                        <div class="position-all flex-center thing-bg">
                            <p class="title">{{thingItem.info}}</p>
                            <!-- 是否学院托管 -->
                            <span v-if="thingItem.isCollegeCustody">学院托管</span>
                        </div>
                        <div class="info position-all">
                            <div class="bg-blur position-all">
                                <!-- 这里img的地址应写用户上传的失物图片 -->
                                <img src="./img/2.jpg" alt="">
                            </div>
                            <div class="info-body">
                                <div class="body-message">
                                    <div class="thing-message">
                                        <p class="thing-title">{{thingItem.title}}</p>
                                        <div class="content">
                                            <p class="item">&nbsp;联系方式:&nbsp;</p>
                                            <input type="text" :value="thingItem.contactInformation">
                                        </div>
                                        <div class="content">
                                            <p class="item">&nbsp;拾取地址:&nbsp;</p>
                                            <input type="text" :value="thingItem.foundItAddress">
                                        </div>
                                        <div class="content">
                                            <p class="item">&nbsp;拾取者姓名:&nbsp;</p>
                                            <input type="text" :value="thingItem.whoFoundIt">
                                        </div>
                                        <div class="content">
                                            <p class="item">&nbsp;拾取时间:&nbsp;</p>
                                            <input type="text" :value="thingItem.foundItTime">
                                        </div>
                                    </div>
                                    <button class="blue-btn btn claim-btn">确认认领</button>
                                </div>
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
// import { Button, Message } from 'element-ui'
export default {
    name: 'Lose-Found',
    data(){
        return {
            imgTotal: 4,
            // 待认领信息
            pendingclaimImgMessage: [
                {
                    id: 1,
                    imgSrc: './img/2.jpg',
                    info: '蓝色U盘',
                    isCollegeCustody: true,
                    title: '在美国捡到了原子弹',
                    contactInformation: '12345678910',
                    foundItAddress: '美国',
                    whoFoundIt: 'ddloo',
                    foundItTime: '1111-11-11'
                },
                {
                    id: 2,
                    imgSrc: '/admin/img/2.d6183f0b.jpg',
                    info: '蓝色U盘',
                    isCollegeCustody: false,
                    title: '在美国捡到了原子弹',
                    contactInformation: '12345678910',
                    foundItAddress: '美国',
                    whoFoundIt: 'ddloo',
                    foundItTime: '1111-11-11'
                }
            ]
        }
    },
    // components: {
    //     [Button.name]: Button,
    //     [Message.name]: Message
    // },
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
        width: 95%;
        margin: 0 auto;
        /* background-color: #3e3e3e; */

        .bg-blur{
            filter: blur(2px) brightness(.5);
            box-shadow: inset 0 0 12px 4px #000;
        }

        .title{
            text-shadow: 0 0 1px #000;
            // display: inline-block;
            padding: 2px 15px;
            color: #000;
            font-size: 30px;
            border-bottom: 1px solid #1e1e1e;
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
                width: 240px;
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
            border: 0;
            padding: 8px 18px;
            font-size: 14px;
            color: #fff;
            font-weight: 500;
            border-radius: 4px;
            margin-left: 15px;
            transition: all .2s;
        }

        .blue-btn{
            background-image: -webkit-gradient(
                                linear,
                                left bottom,
                                left top,
                                color-stop(0, #2ca0ca),
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

        .red-btn{
            background-image: -webkit-gradient(
                                linear,
                                left bottom,
                                left top,
                                color-stop(0, #e04848),
                                // color-stop(0, #f08a15),
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

        .thing{
            margin: 20px 0;

            .category{
                position: relative;
                margin-bottom: 15px;
                border: 0;
                font-size: 24px;

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
                width: 123px;
                height: 1.5px;
                background-color: #1e1e1e;
            }
        }

        .thing-item{
            display: inline-block;
            margin-right: 30px;
            position: relative;
            width: 220px;
            height: 260px;
            background-color: black;
            overflow: hidden;

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
                    background-color: rgb(255, 232, 129);
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
                z-index: 2;
                visibility: hidden;
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
        }

        .thing-item:hover .info{
            visibility: visible;
            transform: translateZ(0);
            opacity: 1;
        }

        // .thing-item:hover .title{
        //     font-size: 18px;
        //     z-index: 10;
        //     color: #fff;
        //     top: 10px;
        // }
    }

    .position-all{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    .curtain-black{
        z-index: 999;
        background-color: rgba(0, 0, 0, .7);
    }

    .flex-center{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
