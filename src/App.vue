// 建议尽可能少的修改这个组件
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
*{
  box-sizing: border-box;
}
html,body{
    min-width: 1000px;
    height:100%;
    margin:0;
}
#app {
  height:100%;
}
</style>
