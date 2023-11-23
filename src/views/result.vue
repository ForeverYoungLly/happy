<template>
  <div class="container">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="加入流程"
    />
    <van-steps :active="active" direction="vertical" style="text-align: center  !important;">
      <van-step v-for="(item,index) in status" :key="index">
        <span style="float: left; padding-left: 10px;">{{ item.status }} </span>⠀<span style="float:right;padding-right: 10px;" >{{ item.time }}</span>
      </van-step>
    </van-steps>
  </div>
</template>

<script >
import { Dialog, Toast } from 'vant'
import axios from 'axios'
export default {

  name: 'SubmitResult',
  data () {
    return {
      // status
      status: [
        // {
        //   status: '初试',
        //   time: ''
        // }
      ],
      // 已通过的流程
      active: 3,
      // 弹出框标题
      title: '投递成功',
      // 弹出框内容
      message: '期待下次与你相遇',
      // // 控制遮罩层的显示隐藏
      // overlayShow: true
      null: '',
      wxopenid: ''
    }
  },
  methods: {
    // 已通过的流程添加高亮效果
    addActive () {
      const arr = document.querySelectorAll('.van-step__title')
      console.log(arr)
      arr.forEach((item, index) => {
        if (index < this.active) {
          item.classList.add('van-step__title--active')
        }
      })
      const str = arr[this.active].innerText
      if (str[2] === '不') {
        // arr[this.active].classList.add('not')
        arr[this.active + 1].style.color = 'red'
      }
    }
  },
  created () {
    Toast.loading('加载中...')
    // 从意见反馈过来的
    const accept = this.$route.query.status
    const wxopenid = this.$route.query.wxopenid
    console.log(this.$route.query)
    this.wxopenid = wxopenid

    // 获取全部状态
    axios({
      url: 'http://123.207.73.185:8080/userHistory',
      params: {
        wxopenid: this.wxopenid
      }
    }).then(res => {
      // 有状态
      this.active = res.data.msg - 1
      const arr = res.data.data
      // 处理金鱼返回的用户所有历史状态
      const status = arr.map((item) => {
        const time = item.CreatedAt
        const end = time.indexOf('T')
        let str = time.slice(0, end)
        if (str === '0001-01-01') str = ''
        return { status: item.Message, time: str }
      })
      this.status = status
      // 根据用户情况决定弹出框内容
      if (this.wxopenid) {
        axios({
          url: 'http://123.207.73.185:8080/isUserExist',
          params: {
            wxopenid: this.wxopenid
          }
        }).then(res => {
          const userData = res.data.data
          // 有问题
          if (userData.isproblem) {
            Dialog.alert({
              title: '问题处理中',
              message: '您的反馈问题正在处理中，我们会尽快给您答复',
              theme: 'round-button',
              // 点击遮罩层后关闭弹窗
              closeOnClickOverlay: true
            }).then(() => {
            // on close
            })
          } else {
          // 从确认或拒绝按钮过来的
            if (accept) {
              console.log('确认')
            } else {
              Dialog.alert({
                title: this.title,
                message: this.message,
                theme: 'round-button',
                // 点击遮罩层后关闭弹窗
                closeOnClickOverlay: true
              }).then(() => {
                // on close
              })
            }
          }
        })
      }
    })
  },
  mounted () {
  },
  updated () {
    this.addActive()
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    position: relative;
    width: 320px;
    height: 320px;
    background-color: #fff;
    border-radius: 20px;
  }

  .content {
    height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-items: center;
  }

  .line {
  align-self: auto; /* 或者 align-self: unset; */
  flex-shrink: 0; /* 或者 flex-grow: 0; */
  }

  .not {
    color: red !important;
  }
</style>
