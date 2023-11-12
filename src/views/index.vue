<template>
  <div class="container" >
    <van-button type="primary" @click="toResume"  style="margin-bottom: 30px; width: 200px!important">{{ tips }}</van-button>
  </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant'

export default {
  name: 'MyIndex',
  data () {
    return {
      wxOnpenid: '1',
      tips: '投递简历', // 按钮文字
      exist: 1, // wxopenid已注册
      userData: {},
      bgImage: ''
    }
  },
  methods: {
    async toResume () {
      // 用户未提交过简历->去提交简历
      if (!this.exist) {
        this.$router.push('/resume')
      } else {
        // 成功提交,ok = 1 ，前往查看进度,带上status
        if (this.userData.ok) {
          this.$router.push({
            path: '/result',
            query: {
              status: this.userData.status
            }
          })
        } else { // 存过草稿，ok = 0 ,带上数据回显，继续填写
          this.$router.push({
            path: '/resume',
            query: {
              userData: this.userData
            }
          })
        }
      }
      // 去获取openid
    }
  },
  created () {
    // 截取微信openid
    const wxopenid = document.location.search.slice(4)
    console.log(wxopenid)
    // 带有微信openid
    if (wxopenid) {
      this.wxOnpenid = wxopenid
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        overlay: true
      })
      // 查看用户是否已经注册
      axios({
        url: 'http://123.207.73.185:8080/isUserExist',
        params: {
          wxopenid
        }
      }).then(res => {
        this.userData = res.data.data
        // 未注册
        if (!res.data.code) {
          this.tips = '投递简历'
          this.exist = 0 // 标记注册
        } else {
          // 已注册
          if (this.userData.ok) {
            this.tips = '查看当前进度'
          } else {
            this.tips = '继续填写'
          }
        }
      })
    } else { // 没有微信openid
      // 跳转到获取微信openid
      Toast.loading('正在前往授权')
      setTimeout(() => {
        Toast.clear()
        document.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8ba1b60caf51ed26&redirect_uri=http://123.207.73.185:100/%23/resume&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      }, 1000)
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
