<template>
  <div class="container">
    <van-button type="primary" @click="toResume"  style="margin-bottom: 30px; width: 200px!important">立即投递</van-button>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'MyIndex',
  methods: {
    toResume () {
      document.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8ba1b60caf51ed26&redirect_uri=http://www.baidui.com/&response_type=code&scope=snsapi_userinfo#wechat_redirect'
    }
  }
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
