<template>
  <div class="container">
    <div class="box1">
      备用盒子
    </div>
    <div class="box2">
      放echarts组件，实现数据可视化
    </div>
  </div>
</template>

<script>
export default {
name:'MyIndex'
}
</script>

<style scoped>
.container {
  display: flex;
  background-color: #E9EEF3;
  height: 100%;
  padding: 10px;
}
.container > div {
  width: 50%;
  height: 90%;
  padding: 10px;
  margin: 10px;
  background-color: beige;
}
</style>