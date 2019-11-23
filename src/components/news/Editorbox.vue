<template>
    <div>
        <div ref="editor"  style="text-align:left"></div>
        <!-- <button @click="getContent">确定</button> -->
    </div>
</template>

<script>
import E from 'wangeditor'
export default {
    name: 'Editor',
    props: ['accept'], // 接收父组件的方法
    data () {
        return {
            editorContent: ''
        }
    },
    methods: {
        getContent: function () {
            alert(this.editorContent)
        }
    },
    mounted() {
        var editor = new E(this.$refs.editor)
        editor.customConfig.onchange = (html) => {
            this.editorContent = html
            this.$emit('func', this.editorContent)
        }
        editor.customConfig.uploadImgShowBase64 = true
        editor.create()
    }
}
</script>

<style>

</style>
