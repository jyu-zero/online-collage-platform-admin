<template>

   <el-col :span="12">
    <el-dropdown trigger="click"  @command="handleCommand" >
      <span class="el-dropdown-link">
        {{command}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="单周无课">单周无课</el-dropdown-item>
      <el-dropdown-item command="双周无课">双周无课</el-dropdown-item>
      <el-dropdown-item command="单双无课">单双无课</el-dropdown-item>
      <el-dropdown-item command="单双有课">单双有课</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-col>

</template>

<script>
export default {
  data(){
    return{
      command: "单周无课"
    }
  },
  props: {
    title: {
       type: String,
      default: " 登记"
    },
  },
  methods: {
    handleCommand(command) {
        this.command=command;
       this.$emit('addArr',command);
    }
  }
};
</script>

<style>
.el-dropdown{
  width: 110px;
  box-sizing: border-box;
  padding-left: 20px; 
}
</style>