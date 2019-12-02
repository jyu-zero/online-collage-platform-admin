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
    props: ['value'], // 接收父组件的方法
    data () {
        return {
            editorContent: this.value,
            editor: undefined
        }
    },
    methods: {
        getContent() {
            alert(this.editorContent)
        }
    },
    mounted() {
        this.editor = new E(this.$refs.editor)
        this.editor.customConfig.onchange = (html) => {
            this.editorContent = html
            this.$emit('input', this.editorContent)
        }
        this.editor.customConfig.uploadImgShowBase64 = true
        this.editor.create()
        this.editor.txt.html(this.editorContent)
    },
    watch: {
        value(newVal){
            this.editor.txt.html(newVal)
        }
    }
}
</script>

<style>

</style>
