<template>
  <el-col :span='12'>
    <el-dropdown trigger='click' @command='handleCommand'>
      <span class='el-dropdown-link'>
        {{ command }}<i class='el-icon-arrow-down el-icon--right'></i>
      </span>
      <el-dropdown-menu slot='dropdown'>
        <el-dropdown-item command='单周无课'>单周无课</el-dropdown-item>
        <el-dropdown-item command='双周无课'>双周无课</el-dropdown-item>
        <el-dropdown-item command='单双无课'>单双无课</el-dropdown-item>
        <el-dropdown-item command='单双有课'>单双有课</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-col>
</template>

<script>
import { Dropdown, DropdownItem, DropdownMenu, Col } from 'element-ui'
export default {
    name: 'Course',
    components: {
        [Dropdown.name]: Dropdown,
        [DropdownItem.name]: DropdownItem,
        [DropdownMenu.name]: DropdownMenu,
        [Col.name]: Col
    },
    data(){
        return {
            command: '单周无课'
        }
    },
    methods: {
    // 向父组件传参
        handleCommand(command) {
            this.command = command
            this.$emit('add-to-arr', command)
        }
    }
}
</script>

<style>
.el-dropdown {
  width: 100px;
  box-sizing: border-box;
  padding-left: 20px;
  font-size: 12px;
}
</style>
