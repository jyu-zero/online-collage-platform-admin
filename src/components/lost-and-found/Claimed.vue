<template>
  <div class="thing-item">
        <!-- 这里img的地址应写用户上传的失物图片 -->
        <img :src="thingItem.imgSrc" alt="">
        <div class="position-all">
            <div class="flex-center thing-bg position-all">
                <p class="title">{{thingItem.info}}</p>
                <!-- 是否学院托管 -->
                <span v-if="thingItem.isManagedByCollage">学院托管</span>
            </div>
            <div class="info already">
                <div class="info-body">
                    <div class="body-message">
                        <div class="thing-message">
                            <p class="thing-title" :title="thingItem.title">{{thingItem.title}}</p>
                            <div class="content">
                                <p class="item">&nbsp;拾取地址:&nbsp;</p>
                                <span>{{thingItem.foundAtWhere}}</span>
                            </div>
                            <div class="content">
                                <p class="item">&nbsp;拾取时间:&nbsp;</p>
                                <span>{{thingItem.foundAtWhen}}</span>
                            </div>
                            <div class="content">
                                <p class="item">&nbsp;拾取者姓名:&nbsp;</p>
                                <span>{{thingItem.foundBy}}</span>
                            </div>
                            <div class="content">
                                <p class="item">&nbsp;联系方式:&nbsp;</p>
                                <span>{{thingItem.foundContact}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="info position-all">
            <div class="bg-blur position-all">
                <!-- 这里img的地址应写用户上传的失物图片 -->
                <img :src="thingItem.imgSrc" alt="">
            </div>
            <div class="info-body">
                <div class="body-message" v-if="unclaimed">
                    <div class="thing-message">
                        <p class="thing-title" :title="thingItem.title">{{thingItem.title}}</p>
                        <div class="content">
                            <p class="item">&nbsp;认领人:&nbsp;</p>
                            <span>{{thingItem.retrieveBy}}</span>
                        </div>
                        <div class="content">
                            <p class="item">&nbsp;联系方式:&nbsp;</p>
                            <span>{{thingItem.retrieveContact}}</span>
                        </div>
                        <div class="content">
                            <p class="item">&nbsp;认领时间:&nbsp;</p>
                            <span>{{thingItem.retrieveAtWhen}}</span>
                        </div>
                    </div>
                </div>
                <p v-show="!unclaimed">什么都没有哦</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Claimed',
    props: {
        thingItem: {
            type: Object
        },
        unclaimed: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style>

</style>
