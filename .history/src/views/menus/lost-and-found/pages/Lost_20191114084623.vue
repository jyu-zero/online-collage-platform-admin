<template>
  <div class="position-all curtain-black">
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
                    <div class="input-div">
                        <input type="text" placeholder="标题">
                        <label>标题</label>
                    </div>
                    <div class="input-div">
                        <input type="text" placeholder="请问丢了什么物品">
                        <label>请问丢了什么物品</label>
                    </div>
                    <div class="input-div">
                        <input type="text" placeholder="在哪丢的呀">
                        <label>在哪丢的呀</label>
                    </div>
                    <div class="input-div">
                        <input type="text" placeholder="你的名字">
                        <label>你的名字</label>
                    </div>
                    <div class="input-div">
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
                    <div class="upload-content"></div>
                    <div class="line"></div>
                    <div class="upload-content"></div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Lost'
}
</script>

<style lang="less" scoped>
    .content{
        width: 700px;
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
                height: 365px;
                width: 500px;
                text-align: center;
            }

            .lost-upload{
                padding: 0 40px;
                display: flex;
                justify-content: space-between;

                .upload-content{
                    margin-top: 20px;
                    height: 120px;
                    width: 120px;
                    background-color: #000;
                }

                .line{
                    height: 220px;
                    width: 2px;
                    background-color: #5e91fa;
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

                .input-div{
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
</style>
