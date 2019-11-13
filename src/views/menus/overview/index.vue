<template>
    <div class="overview">
        <h2>今日值班</h2>
        <table class="table">
            <tr>
                <td v-for="(item,index) in timeList" :key="index">{{item}}</td>
            </tr>
            <tr>
                <td v-for="(item,index) in arrangeList" :key="index">{{item}}</td>
            </tr>
        </table>

        <h2>今日新增内容</h2>
        <h4>新闻</h4>
        <div class="mar">
            <div class="work-arrange">
                <p>新闻标题</p>
                <div>
                    <el-button type="primary" class="but">发布</el-button>
                    <el-button type="primary" class="but">查看</el-button>
                </div>
            </div>
        </div>

        <h4>失物招领</h4>
        <div class="mar">
            <div class="work-arrange" v-for="(item,index) in lostList" :key="index">
                <div class="left">
                    <p>{{item.title}}</p>
                    <p v-if="item.state" class="gray">已找回</p>
                    <p v-if="item.hoster"  class="gray">学院托管</p>
                </div>
                <el-button type="primary" class="but">查看详细</el-button>
            </div>
        </div>

        <h4>在线问答 (12)</h4>
        <div class="mar">
            <div class="work-arrange">
                <div class="left">
                    <p>问题内容</p>
                </div>
                <div>
                    <el-button type="primary" class="but">查看</el-button>
                </div>
            </div>
            <div class="work-arrange">
                <div class="left">
                    <p>问题内容</p>
                    <p  class="gray">已解决</p>
                </div>
                <div>
                    <el-button type="primary" class="but">查看</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Button, Message } from 'element-ui'
import { responseHandler, userApi, prefix } from '@/api'
export default {
    name: 'Overview',
    data() {
        return {
            arrangeList: [],
            timeList: ['上午1,2', '上午3,4', '下午1,2', '下午3,4'],
            lostList: []
        }
    },
    components: {
        [Button.name]: Button,
        [Message.name]: Message
    },
    created () {
        this.getTodayArrange()
        this.getTodayLost()
    },
    methods: {
        getTodayArrange () {
            let date = new Date()
            let today = date.getDay()
            today = 1
            if(today >= 1 && today <= 5) {
                this.$axios.get(prefix.api + userApi.getTodayArrange, {
                    params: {
                        week: 1,
                        day: today
                    }
                }).then(response => {
                    if(!responseHandler(response.data, this)){
                        // 在这里处理错误
                        Message.error('请求失败')
                    }
                    this.arrangeList = response.data.data
                })
            }
        },
        getTodayLost () {
            this.$axios.get(prefix.api + userApi.todayAdd).then(response => {
                if(!responseHandler(response.data, this)){
                    // 在这里处理错误
                    Message.error('请求失败')
                }
                this.lostList = response.data.data
            })
        }
    }
}
</script>

<style lang="less" scoped>
.overview{
    height:100%;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    box-sizing: border-box;

    h2 {
        margin: 20px 0;
    }
    h4 {
        margin: 0;
    }
    p {
        margin: 0;
        font-size: 14px;
    }
    .gray {
        background: rgb(235, 238, 245);
    }
}

.table {
    border: 1px solid rgb(235, 238, 245);
    width: 80%;
    height: 96px;

    th,td {
        border: 1px solid rgb(235, 238, 245);
        text-align: center;
    }
}

.mar {
    border: 1px solid rgb(235, 238, 245);
    padding: 0 20px 0;
    box-sizing: border-box;
    margin: 10px 0 20px;

    .work-arrange {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 45px;
        padding: 0 12px 0 20px;
        margin: 10px 0;
        border-bottom: 1px solid rgb(235, 238, 245);

        &:last-child {
            border-bottom: 0;
        }

        .left {
            display: flex;
            align-items: center;
            height: 100%;
        }

        .but {
            width: 70px;
            height: 30px;
            padding: 0;
        }

        p {
            margin-right: 10px;
        }
    }
}
</style>
