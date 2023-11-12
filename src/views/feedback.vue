<template>
  <div class="container">
    <div class="contentWrap">
      <van-field
        v-model="message"
        rows="6"
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
import { Toast } from 'vant'
export default {
  name: 'MyFeedback',
  data () {
    return {
      message: '',
      wxopenid: '',
      statusList: []
    }
  },
  methods: {
    accept () {
      console.log('接受')
    },
    reject () {
      console.log('拒绝')
    },
    special () {
      Toast.loading('上报中......')
      axios({
        url: 'http://123.207.73.185:8080/problems',
        method: 'POST',
        data: {
          wxopenid: this.wxopenid,
          problem: this.message
        }
      }).then((res) => {
        if (res.data.code) {
          Toast.success({
            message: '提交成功，我们会尽快联系您',
            duration: 500
          })
        } else {
          Toast.fail({
            message: res.data.msg
          })
        }
      })
    }
  },
  created () {
    const wxopenid = document.location.search.slice(4)
    this.wxopenid = wxopenid
    // 获取状态列表
    axios({
      url: 'http://123.207.73.185:8080/admin/userStatue'
    }).then(res => {
      this.statusList = res.data
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
