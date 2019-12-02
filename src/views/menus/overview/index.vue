<template>
    <div class="overview">
        <h2>今日值班</h2>
        <table class="table" v-if="arrangeList.length">
            <tr>
                <td v-for="(item,index) in timeList" :key="index">{{item}}</td>
            </tr>
            <tr>
                <td v-for="(item,index) in arrangeList" :key="index"><span v-for="(name,index) in item" :key="index">{{name}} </span></td>
            </tr>
        </table>
        <div v-else class="tip">今日无值班人员</div>
        
        <h2>今日新增内容</h2>
        <h4>新闻</h4>
        <div class="mar" v-if="newsList.length">
            <div class="common-box" v-for="(item,index) in newsList" :key="index">
                <p>{{item.news_title}} by {{item.author}}</p>
                <div>
                    <!-- TODO:这里按钮还没做 -->
                    <el-button type="primary" class="but" v-if="isTeacher">发布</el-button>
                    <el-button type="primary" class="but">查看</el-button>
                </div>
            </div>
        </div>
        <div v-else class="tip distance">今日无新增新闻</div>

        <h4>失物招领</h4>
        <div class="mar" v-if="lostList.length">
            <div class="common-box" v-for="(item,index) in lostList" :key="index">
                <div class="left">
                    <p>{{item.title}}</p>
                    <p v-if="item.state" class="gray">已找回</p>
                    <p v-if="item.hoster"  class="gray">学院托管</p>
                </div>
                <el-button type="primary" class="but">查看详细</el-button>
            </div>
        </div>
        <div v-else class="tip distance">今日无新增失物</div>
        
        <h4>在线问答 ({{questionNum}})</h4>
        <div class="mar" v-if="questionList.length">
            <div class="common-box" v-for="(item,index) in questionList" :key="index">
                <div class="left">
                    <p>{{item.title}}</p>
                    <p  class="gray" v-if="item.status">已解决</p>
                </div>
                <div class="right">
                    <div><font-awesome-icon icon="eye" />{{item.views}}</div>
                    <div><font-awesome-icon icon="comment-dots" />{{item.solutionsNum}}</div>
                    <el-button type="primary" class="but" @click="jumpQuestion(item.questionId)">查看</el-button>
                </div>
            </div>
        </div>
        <div v-else class="tip distance">今日无新增问答</div>

    </div>
</template>

<script>
import { Button, Message } from 'element-ui'
import { responseHandler, dutySchedulingApi, prefix, newsApi, questionApi, lostAndFoundApi } from '@/api'
export default {
    name: 'Overview',
    data() {
        return {
            // 安排列表
            arrangeList: [],
            timeList: ['第1节', '第2节', '第3节', '第4节', '第5节', '第6节', '第7节', '第8节'],
            // 失物列表
            lostList: [],
            // 新闻列表
            newsList: [],
            // 是否为老师
            isTeacher: 0,
            // 问题列表
            questionList: [],
            // 是否为老师
            questionNum: 0
        }
    },
    components: {
        [Button.name]: Button,
        [Message.name]: Message
    },
    created () {
        this.getTodayArrange()
        this.getTodayLost()
        this.getTodayNews()
        this.isATeacher()
        this.getQuestions()
    },
    methods: {
        getTodayArrange () {
            let date = new Date()
            let today = date.getDay()
            // 获取当前时间的毫秒数
            let nowTime = new Date().getTime()
            // 获取开学时间的毫秒数
            let etime = '2019-09-01 00:00:00'
            let times = Date.parse(new Date(etime.replace(/-/g, '/')))
            let timeDiff = nowTime - times
            let days = Math.ceil(timeDiff / 1000 / 60 / 60 / 24)
            let week = Math.ceil(days / 7) % 2
            if(today >= 1 && today <= 5) {
                this.$axios.get(prefix.api + dutySchedulingApi.getTodayArrange, {
                    params: {
                        week,
                        day: today
                    }
                }).then(response => {
                    if(!responseHandler(response.data, this)){
                        Message.error('获取值班信息失败')
                    }
                    this.arrangeList = response.data.data
                })
            }
        },
        getTodayLost () {
            this.$axios.get(prefix.api + lostAndFoundApi.todayAdd).then(response => {
                if(!responseHandler(response.data, this)){
                    Message.error('获取失物信息失败')
                }
                this.lostList = response.data.data
            })
        },
        getTodayNews () {
            this.$axios.get(prefix.api + newsApi.showTodayNews).then(response => {
                if(!responseHandler(response.data, this)){
                    Message.error('获取新闻信息失败')
                }
                this.newsList = response.data.data
            })
        },
        isATeacher () {
            this.$axios.get(prefix.api + newsApi.isTeacher).then(response => {
                if(!responseHandler(response.data, this)) {
                    Message.error('判断身份失败')
                }
                this.isTeacher = response.data.data
            })
        },
        getQuestions () {
            this.$axios.get(prefix.api + questionApi.getHomeQuestions).then(response => {
                if(!responseHandler(response.data, this)) {
                    Message.error('获取问题列表失败')
                }

                this.questionNum = response.data.data.pageCount
                this.questionList = response.data.data.information
            })
        },
        jumpQuestion (id) {
            this.$router.push({ path: '/questions/questions-specific/' + id })
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

    .tip {
        padding: 0 0 0 20px;
        box-sizing: border-box;
        background: rgb(64, 158, 255);
        border-radius: 5px;
    }
    .distance {
        margin: 20px 0;
    }
}

.table {
    border: 1px solid rgb(235, 238, 245);
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

    .common-box {
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

        .left,.right {
            display: flex;
            align-items: center;
            height: 100%;
        }

        .right {
            width: 180px;
            justify-content: space-between;
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
