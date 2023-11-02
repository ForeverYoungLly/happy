<template>
  <div class="container">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="加入流程"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-steps :active="active" direction="vertical" style="text-align: center  !important;">
      <van-step>待提交简历</van-step>
      <van-step>提交简历成功</van-step>
      <van-step>筛选通过</van-step>
      <van-step>初试通过</van-step>
      <van-step>复试通过</van-step>
      <van-step>终试通过</van-step>
    </van-steps>
    <van-overlay :show="overlayShow" @click="overlayShow = false">
      <div class="wrapper" @click.stop>
        <!-- 遮罩层内容 -->
        <div class="block">
          <van-divider class="line">期待与您相遇</van-divider>
          <h1 style="text-align: center;margin-top: 70px;">提交成功!</h1>
          <van-button style="margin:60px 110px !important;background-color: lightskyblue;border-radius: 5px;width: 100px; font-size: 18px;font-weight: bold;" @click="overlayShow = false">完成</van-button>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script >
export default {
  name: 'SubmitResult',
  data () {
    return {
      // 已通过的流程
      active: 1,
      // 控制遮罩层的显示隐藏
      overlayShow: true
    }
  },
  methods: {
    // 已通过的流程添加高亮效果
    addActive () {
      const arr = document.querySelectorAll('.van-step__title')
      arr.forEach((item, index) => {
        if (index <= this.active) {
          item.classList.add('van-step__title--active')
        }
      })
    }
  },
  mounted () {
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
</style>
