<template>
  <div class="container">
    <van-button type="primary" to="/resume"  style="margin-bottom: 30px; width: 200px!important">立即投递</van-button>
  </div>
</template>

<script>
export default {
  name: 'MyIndex'
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  width: 100%;
  height: 100%;
  background: no-repeat url(../assets/images/abbg01.png) ;
  background-size: cover;
}

</style>
