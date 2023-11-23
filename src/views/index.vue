<template>
  <div class="container"  >
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
      wxopenid: '',
      tips: '投递简历', // 按钮文字
      exist: 1, // wxopenid已注册
      // 用户信息
      userData: {},
      // 背景图片
      imgurl: ''
    }
  },
  methods: {
    async toResume () {
      // 用户未提交过简历->去提交简历
      if (!this.exist) {
        this.$router.push('/resume')
      } else {
        // 成功提交,ok = 1 ，前往查看进度,带上wxopenid
        if (this.userData.ok) {
          this.$router.push({
            path: '/result',
            query: {
              wxopenid: this.userData.wxopenid
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
    }
  },
  created () {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      overlay: true
    })
    // 获取首页图片
    axios({
      url: 'http://123.207.73.185:8080/homePicture'
    }).then(res => {
      if (res.data.code) {
        const str = 'http://'
        this.imgurl = str + res.data.data
        const container = document.querySelector('.container')
        container.style.backgroundImage = `url(${this.imgurl})`
        Toast.clear()
      } else {
        console.log('图片加载失败！')
      }
    }).catch(() => {
      Toast.fail('背景图片获取失败，网络有误')
    })
    // 截取微信openid
    const wxopenid = document.location.search.slice(10)
    console.log(wxopenid)
    // 带有微信openid
    if (wxopenid) {
      this.wxopenid = wxopenid
      // 查看用户是否已经注册 -> 决定按钮的功能
      axios({
        url: 'http://123.207.73.185:8080/isUserExist',
        params: {
          wxopenid
        }
      }).then(res => {
        // 用户提交过
        if (res.data.code) {
          this.userData = res.data.data
          // 是否草稿 ok=1 不是草稿 ok = 0 是草稿
          if (this.userData.ok) {
            this.tips = '查看当前进度'
          } else {
            console.log('继续填写')
            this.tips = '继续填写'
          }
        } else {
          this.tips = '投递简历'
          this.exist = 0 // 标记未注册
        }
      })
    } else { // 没带wxopenid进来的 请先关注测试号
      // 跳转到获取微信openid
      Toast.loading('正在前往微信授权')
      setTimeout(() => {
        document.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8ba1b60caf51ed26&redirect_uri=http://123.207.73.185:100/%23/resume&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      }, 1000)
    }
  },
  mounted () {
    // 渲染背景图片
    if (this.imgurl) {
      const container = document.querySelector('.container')
      container.style.backgroundImage = `url(${this.imgurl})`
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
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(../assets/images/abbg01.png);
}

</style>
