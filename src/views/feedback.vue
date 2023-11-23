<template>
  <div class="container">
    <van-overlay :show="overlayShow" />
    <div class="contentWrap">
      <van-field
        v-model="message"
        rows="8"
        autosize
        label="特殊情况"
        type="textarea"
        maxlength="100"
        placeholder="如果有特殊情况请说明情况"
        show-word-limit
      />
    </div>
    <div class="center">
      <van-button style="margin: 10px; width: 44%;" @click="accept">接受</van-button>
      <van-button type="info" style="margin: 10px; width: 44%;" @click="reject">拒绝</van-button>
      <van-button type="primary" size="large" style="border-radius: 30px !important; margin-top: 10px; width:90%" @click="special">特殊情况点我上报</van-button>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import { Toast, Dialog, Notify } from 'vant'
export default {
  name: 'MyFeedback',
  data () {
    return {
      // 意见反馈信息
      message: '',
      // 服务端传过来的数据
      query: {
        // id: '',
        // wxopenid: '',
        // now: '',
        // next: ''
      },
      // 遮罩层
      overlayShow: false
    }
  },
  methods: {
    // 接受
    accept () {
      Toast.loading('发送中...')
      axios({
        url: 'http://123.207.73.185:8080/feedback',
        method: 'POST',
        data: {
          code: 1,
          message: '',
          wxopenid: this.query.wxopenid,
          status: this.query.next,
          id: this.query.id
        }
      }).then((res) => {
        if (res.data.code) {
          Toast.success('发送成功！')
          // 弹出确认框
          Dialog.confirm({
            title: '接受',
            message: '提交成功，期待与您相遇',
            confirmButtonText: '查看当前进度'
          })
            .then(() => {
              this.$router.push({
                path: '/result',
                query: {
                  status: 1,
                  wxopenid: this.query.wxopenid

                }
              })
            })
            .catch(() => {
              // on cancel
            })
        } else {
          Toast.fail(res.data.msg)
        }
      }).catch(() => {
        Toast.fail('网络请求错误')
      })
    },
    // 拒绝
    reject () {
      Toast.loading('发送中...')
      axios({
        url: 'http://123.207.73.185:8080/feedback',
        method: 'POST',
        data: {
          code: 2,
          message: '',
          wxopenid: this.query.wxopenid,
          status: this.query.now,
          id: this.query.id
        }
      }).then((res) => {
        if (res.data.code) {
          Toast.success('发送成功！')
          // 弹出确认框
          Dialog.confirm({
            title: '拒绝',
            message: '期待下次相遇',
            confirmButtonText: '查看当前进度'
          })
            .then(() => {
              this.$router.push({
                path: '/result',
                query: {
                  status: 1,
                  wxopenid: this.query.wxopenid
                }
              })
            })
            .catch(() => {
              // on cancel
            })
        } else {
          Toast.fail(res.data.msg)
        }
      }).catch(() => {
        Toast.fail('网络请求失败！')
      })
    },
    // 特殊情况
    special () {
      Toast.loading('上报中...')
      axios({
        url: 'http://123.207.73.185:8080/feedback',
        method: 'POST',
        data: {
          code: 3,
          message: this.message,
          wxopenid: this.query.wxopenid,
          id: this.query.id
        }
      }).then((res) => {
        // 反馈成功
        if (res.data.code) {
          Dialog.confirm({
            title: '处理结果',
            message: '反馈成功,我们会尽快给您答复',
            confirmButtonText: '查看当前进度'
          })
            .then(() => {
              this.$router.push({
                path: '/result',
                query: {
                  wxopenid: this.query.wxopenid
                }
              })
            })
            .catch(() => {
            // on cancel
            })
        } else {
          // 反馈失败
          Toast.fail({
            message: res.data.msg
          })
        }
      }).catch(res => {
        Toast.fail('网络请求失败！')
      })
    }
  },
  created () {
    // 获取涵哥过来的数据
    const query = this.$route.query
    this.query = query
    Toast.loading({
      message: '加载中...',
      duration: 2000
    })
    // 询问id是否使用过
    axios({
      url: 'http://123.207.73.185:8080/isIdUsed',
      params: {
        id: this.query.id
      }
    }).then(res => {
      if (res.data.code) {
        Toast.clear()
        console.log('未使用')
      } else {
        this.overlayShow = true
        Notify({
          message: '请勿重复回复，正在前往查看进度页面！',
          duration: 1000
        })
        this.$router.push({
          path: '/result',
          query: this.query
        })
      }
    })
  }
}
</script>

<style scoped>
.contentWrap {
  padding: 15px;
  border-radius: 10px;
}
.center {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.container {
  flex:1;
  width: 100%;
  height: 100%;
  background-color: #ececec;
}
</style>
