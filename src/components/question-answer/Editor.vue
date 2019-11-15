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
            this.$emit('input', this.editorContent)
        }
        editor.customConfig.uploadImgShowBase64 = true
        editor.create()
    }
}
</script>

<style>

</style>
