<template>
    <div class="all">
        <div class="wrap">
            <h2 class="title">失物招领</h2>
            <div class="head-body">
                <div class="wrap-head">
                    <div class="left-core">
                        <input type="text" class="search-input" placeholder="搜索物品">
                    </div>
                    <div class="right-core">
                        <button class="btn blue-btn" title="丢失物品" @click="showSearchLost()">添加寻物启事</button>
                        <button class="btn red-btn" title="拾取物品" @click="goTo('Found')">新建拾取物</button>
                    </div>
                </div>
                <div class="pending-claim thing">
                    <div class="title category">
                        <span>待认领</span>
                    </div>
                    <div class="thing-item" v-for="thingItem of pendingclaimImgMessage" :key="thingItem.id">
                        <!-- 这里img的地址应写用户上传的失物图片 -->
                        <img src="" alt="">
                        <div class="position-all flex-center thing-bg">
                            <p class="title">{{thingItem.info}}</p>
                            <!-- 是否学院托管 -->
                            <span v-if="thingItem.isManagedByCollage">学院托管</span>
                        </div>
                        <div class="info position-all">
                            <div class="bg-blur position-all">
                                <!-- 这里img的地址应写用户上传的失物图片 -->
                                <img src="" alt="">
                            </div>
                            <div class="info-body">
                                <div class="body-message">
                                    <div class="thing-message">
                                        <p class="thing-title">{{thingItem.title}}</p>
                                        <div class="content">
                                            <p class="item">&nbsp;联系方式:&nbsp;</p>
                                            <input type="text" :value="thingItem.contact">
                                        </div>
                                        <div class="content">
                                            <p class="item">&nbsp;拾取地址:&nbsp;</p>
                                            <input type="text" :value="thingItem.foundAtWhere">
                                        </div>
                                        <div class="content">
                                            <p class="item">&nbsp;拾取者姓名:&nbsp;</p>
                                            <input type="text" :value="thingItem.foundBy">
                                        </div>
                                        <div class="content">
                                            <p class="item">&nbsp;拾取时间:&nbsp;</p>
                                            <input type="text" :value="thingItem.foundAtWhen">
                                        </div>
                                    </div>
                                    <button class="blue-btn btn claim-btn">确认认领</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 新建寻物启事 [开始] -->
            <div class="position-all curtain-black" id="search-lost" style="display: none">
                <div class="content">
                    <div class="bar">
                        <div class="bar-color"></div>
                        <span class="bar-name">
                            1
                            <div class="brief"><span>填写基本信息</span></div>
                        </span>
                        <span class="bar-name">2
                            <div class="brief"><span>上传拾取物照片</span></div>
                        </span>
                        <span class="bar-name">3
                            <div class="brief"><span>完成</span></div>
                        </span>
                    </div>
                    <div class="content-body" style="display: none;">
                        <!-- 基本信息 [开始] -->
                        <div class="essential-info">
                            <div class="lost-title">基本信息</div>
                            <div class="lost-info">
                                <div class="info-input">
                                    <input type="text" placeholder="标题">
                                    <label>标题</label>
                                </div>
                                <div class="info-input">
                                    <input type="text" placeholder="请问丢了什么物品">
                                    <label>请问丢了什么物品</label>
                                </div>
                                <div class="info-input">
                                    <input type="text" placeholder="在哪丢的呀">
                                    <label>在哪丢的呀</label>
                                </div>
                                <div class="info-input">
                                    <input type="text" placeholder="你的名字">
                                    <label>你的名字</label>
                                </div>
                                <div class="info-input">
                                    <input type="text" placeholder="联系方式(常用手机号码)">
                                    <label>联系方式(常用手机号码)</label>
                                </div>
                            </div>
                            <div class="gotoNext-btn">
                                <button>下一步>></button>
                            </div>
                        </div>
                    </div>
                    <div class="content-body">
                        <!-- 上传丢失物图片 [开始]] -->
                        <div class="upload-lost-img">
                            <div class="lost-title">上传丢失物图片</div>
                            <div class="lost-upload">
                                <div class="upload-content">
                                    <img :src="uploadImgSrc" alt="">
                                    <div class="select-size" id="selecting-pre">
                                        <img :src="uploadImgSrc" class="show-bg" alt="">
                                    </div>
                                    <div class="select-size"
                                         id="selecting-cover"
                                         @mousedown="beginMoveImg"
                                         @mousemove="moveSelectImg"
                                         @mouseup="endMoveImg"
                                         @mouseleave="endMoveImg"
                                    ></div>
                                </div>
                                <div class="line"></div>
                                <div class="show-wrap">
                                    <div class="upload-content " id="show-selecting">
                                        <img :src="uploadImgSrc" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="upload-item">
                                <label for="upload-lost-pic" id="upload-btn">上传图片</label>
                                <input style="display:none"
                                        type="file"
                                        id="upload-lost-pic"
                                        @change="uploadImg($event)"
                                        accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { Button, Message } from 'element-ui'
export default {
    name: 'LostAndFound',
    data(){
        return {
            /**
             * imgTotal: 页面一行能放多少张图片
             * uploadImgSrc: 上传图片的地址
             * isMoveImg: 是否能移动图片
             * isFirstMoveImg: 是否是第一次移动图片
             * divPos: 选中的图片框位置
             * imgSize: 图片的大小,按比例缩小
             */
            imgTotal: 4,
            uploadImgSrc: '',
            isMoveImg: false,
            isFirstMoveImg: true,
            divPos: {},
            imgSize: {},
            // 待认领信息
            pendingclaimImgMessage: [
                {
                    id: 1,
                    imgSrc: './img/2.jpg',
                    info: '蓝色U盘',
                    isManagedByCollage: true,
                    title: '在美国捡到了原子弹',
                    contact: '12345678910',
                    foundAtWhere: '美国',
                    foundBy: 'ddloo',
                    foundAtWhen: '1111-11-11'
                },
                {
                    id: 2,
                    imgSrc: './img/2.jpg',
                    info: '蓝色U盘',
                    isManagedByCollage: false,
                    title: '在美国捡到了原子弹',
                    contact: '12345678910',
                    foundAtWhere: '美国',
                    foundBy: 'ddloo',
                    foundAtWhen: '1111-11-11'
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
            let divHeight = document.getElementsByClassName('thing-item')[0].offsetHeight
            let gapRight = parseInt(getComputedStyle(document.getElementsByClassName('thing-item')[0], null).marginRight)
            let divSize = divWidth + gapRight
            let imgTotal = Math.floor(divTotalWidth / divSize)
            this.imgTotal = imgTotal
            this.imgSize = {
                width: divWidth,
                height: divHeight
            }
        },
        // 去往丢东西或者捡到东西
        showSearchLost(){
            let searchLostEle = document.getElementById('search-lost')
            searchLostEle.style.display = 'block'
        },
        // 上传图片
        uploadImg(e){
            let file = e.target.files[0]
            let imgWidth = this.imgSize.width
            let imgHeight = this.imgSize.height
            this.setImgSize(file, imgWidth, imgHeight)
        },
        // 设置图片大小
        setImgSize(file, imgWidth, imgHeight){
            let imgProportion = imgHeight / imgWidth
            // 显示出来图片的大小
            let showWidth
            let showHeight = Math.ceil(imgHeight / imgProportion)
            // 选中的图片大小
            let selectWidth = Math.ceil(imgWidth / imgProportion / 2)
            let selectHeight = Math.ceil(imgHeight / imgProportion / 2)
            let vue = this
            let fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = function() {
                let img = new Image()
                img.src = this.result
                img.onload = function() {
                    showWidth = Math.ceil((showHeight / img.height) * img.width)
                    vue.setUploadImgSrc(img.src)
                    vue.setShowImgDivSize(showWidth, showHeight)
                    vue.setSelectImgDivSize(selectWidth, selectHeight)
                }
            }
        },
        setUploadImgSrc(src){
            this.uploadImgSrc = src
        },
        setShowImgDivSize(width, height){
            let uploadContentEle = document.getElementsByClassName('upload-content')
            let showSelectingEle = document.getElementById('show-selecting')
            uploadContentEle[0].getElementsByClassName('show-bg')[0].style.width = width + 'px'
            uploadContentEle[0].getElementsByClassName('show-bg')[0].style.height = height + 'px'
            showSelectingEle.firstElementChild.style.width = width + 'px'
            showSelectingEle.firstElementChild.style.height = height + 'px'
            uploadContentEle[0].style.width = width + 'px'
            uploadContentEle[0].style.height = height + 'px'
        },
        setSelectImgDivSize(width, height){
            let selectDivEle = document.getElementsByClassName('select-size')
            for(let i = 0; i < selectDivEle.length; i++){
                selectDivEle[i].style.width = width + 'px'
                selectDivEle[i].style.height = height + 'px'
            }
        },
        moveSelectImg(event){
            setTimeout(() => {
                if(this.isMoveImg){
                    let selectingPreEle = document.getElementById('selecting-pre')
                    let selectingPreImgEle = selectingPreEle.getElementsByTagName('img')[0]
                    let selectingCoverEle = document.getElementById('selecting-cover')
                    let parentEle = selectingCoverEle.parentElement
                    let pos = this.getPos(parentEle, event)
                    let x = pos.x - this.pos.x
                    let y = pos.y - this.pos.y
                    console.log(parentEle.offsetHeight)
                    if(y < (parentEle.offsetHeight - selectingCoverEle.offsetHeight) && y >= 0){
                        selectingPreEle.style.top = y + 'px'
                        selectingCoverEle.style.top = y + 'px'
                        selectingPreImgEle.style.top = -y + 'px'
                    }
                    if(x < (parentEle.offsetWidth - selectingCoverEle.offsetWidth) && x >= 0){
                        selectingPreEle.style.left = x + 'px'
                        selectingCoverEle.style.left = x + 'px'
                        selectingPreImgEle.style.left = -x + 'px'
                    }
                }
            }, 20)
        },
        beginMoveImg(event){
            this.isMoveImg = true
            if(this.isFirstMoveImg){
                this.isFirstMoveImg = false
                let selectingCoverEle = document.getElementById('selecting-cover')
                this.pos = this.getPos(selectingCoverEle.parentElement, event)
            }
        },
        endMoveImg(){
            this.isMoveImg = false
        },
        getPos(div, event) {
            let wrapLeft = document.getElementsByClassName('all')[0].offsetLeft
            let wrapTop = document.getElementsByClassName('all')[0].offsetTop
            let mousePos = this.getMousePos(event)
            let divPos = this.getDivPos(div)
            let pos = {
                x: mousePos.x - divPos.x,
                y: mousePos.y - divPos.y
            }
            pos.x -= wrapLeft
            pos.y -= wrapTop
            return pos
        },
        getMousePos(event) {
            let x = event.pageX
            let y = event.pageY
            return { x: x, y: y }
        },
        getDivPos(div) {
            let x = div.offsetLeft
            let y = div.offsetTop
            return { x: x, y: y }
        }
    }
}
</script>

<style lang="less" scoped>
    .curtain-black{
        z-index: 999;
        background-color: rgba(0, 0, 0, .7);

        .content{
            width: 750px;
            margin: 150px auto;
            // background-color: #eee;

            .bar{
                position: relative;
                display: inline-block;
                height: 350px;
                width: 3px;
                background-color: #fff;
                font-size: 14px;

                .bar-name{
                    cursor: pointer;
                    box-sizing: border-box;
                    color: #fff;
                    text-align: center;
                    line-height: 30px;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%) translateY(-50%);
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    border: 2.5px solid #fff;
                    background-color: #86b7e7;

                    .brief{
                        font-size: 16px;
                        visibility: hidden;
                        opacity: 0;
                        position: absolute;
                        white-space: nowrap;
                        text-align: right;
                        width: 140px;
                        top: 50%;
                        left: -160px;
                        transform: translateY(-50%);
                        transition: all .3s;

                        span{
                            color: #ddd;
                            display: inline-block;
                            padding: 3px 12px;
                            background-color: rgba(0, 0, 0, .7);
                            border-radius: 5px;
                        }
                    }
                }

                span:hover .brief{
                    visibility: visible;
                    opacity: 1;
                }

                span:nth-child(2){
                    top: 0%;
                }

                span:nth-child(3){
                    top: 50%;
                }
                span:nth-child(4){
                    top: 100%;
                }
            }

            .content-body{
                display: inline-block;
                vertical-align: top;
                background-color: #fff;
                padding: 10px 20px;
                margin: -15px 40px;
                border-radius: 5px;

                .upload-lost-img{
                    // width: 500px;
                    text-align: center;
                }

                .show-wrap{
                    display: inline-block;
                    margin-top: 50%;
                    vertical-align: top;
                }

                .lost-upload{
                    padding: 0 20px;
                    // display: flex;
                    // justify-content: space-between;

                    #show-selecting{
                        overflow: hidden;
                        // vertical-align: top;
                    }
                    .upload-content{
                        display: inline-block;
                        border: 1.2px solid transparent;
                        position: relative;
                        height: 120px;
                        width: 120px;
                        background-color: #000;

                        #selecting-cover{
                            border: 0;
                        }

                        .select-size{
                            position: absolute;
                            overflow: hidden;
                            border: 1.2px solid #ddd;
                            cursor: move;
                            user-select: none;

                            .show-bg{
                                filter: brightness(1);
                            }
                        }

                        img{
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            filter: brightness(.5);
                        }
                    }

                    .line{
                        display: inline-block;
                        margin: 0 25px;
                        height: 220px;
                        width: 2px;
                        background-color: #5e91fa;
                    }
                }

                .upload-item{
                    #upload-btn{
                        background-color: #60cde9;
                        border-radius: 0.35em;
                        cursor: pointer;
                        color: white;
                        display: inline-block;
                        padding: 8px 14px;
                    }
                }

                // 填写遗失信息
                .lost-title{
                    text-align: center;
                    font-size: 20px;
                    padding: 5px 0;
                    background-color: inherit;
                    font-weight: 500px;
                    margin-bottom: 15px;
                }

                .essential-info{
                    padding: 0 45px;
                    height: 365px;
                    width: 250px;
                    text-align: center;

                    .info-input{
                        position: relative;
                    }

                    .gotoNext-btn{
                        text-align: right;

                        button{
                            background-color: transparent;
                            cursor: pointer;
                            font-size: 15px;
                            border: none;
                            font-size: 600;
                            color: #6c9dff;
                            outline: none;
                        }

                        button:hover{
                            text-decoration: underline;
                        }
                    }

                    input{
                        border: 1px solid rgba(0, 0, 0, .5);
                        box-shadow: inset 0 1px 1px 0 rgba(0, 0, 0, .5);
                        border-radius: 3px;
                        outline: none;
                        font-size: 14px;
                        padding: 3px 8px;
                        margin: 12px 0;
                        width: 160px;
                        height: 30px;
                    }

                    input:focus + label{
                        opacity: 1;
                    }
                    label{
                        transition: opacity .4s;
                        opacity: 0;
                        position: absolute;
                        color: #5e91fa;
                        font-size: 13px;
                        top: -8px;
                        left: 0;
                    }
                    input::placeholder{
                        transition: transform .3s;
                        font-size: 13px;
                    }

                    input:focus::placeholder{
                        transform: translateY(-20px) translateX(-10px);
                    }
                }
            }
        }
    }
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
        padding: 15px 0;
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
            padding: 4px 0;
            color: #000;
            font-size: 28px;
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
                    margin-left: 15px;
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

    .flex-center{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
