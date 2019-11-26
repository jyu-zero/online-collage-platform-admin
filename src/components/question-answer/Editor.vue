<template>
    <div>
        <div ref="editor"  style="text-align:left"></div>
    </div>
</template>

<script>
import E from 'wangeditor'
export default {
    name: 'editor',
    props: ['catchData'], // 接收父组件的方法
    data () {
        return {
            editorContent: '',
            editor: ''
        }
    },
    methods: {
        getContent: function () {
            alert(this.editorContent)// 该方法可以获取富文本的内容
        },
        clear: function(){
            console.log(this.editor)
            this.editorContent = ''
            this.editor.txt.html('')
            this.$emit('input', this.editorContent)
        }// 该方法可以清除富文本的内容同时发送更新信号给父组件
    },
    mounted() {
        var editor = new E(this.$refs.editor)
        this.editor = editor
        editor.customConfig.onchange = (html) => {
            this.editorContent = html
            this.$emit('input', this.editorContent)
        }
        editor.customConfig.uploadImgShowBase64 = true
        editor.create()
        editor.txt.html(this.catchData)
    }
}
</script>

<style>

</style>
