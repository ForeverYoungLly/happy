<template>
  <div>用户端配置
    <button @click="jump">跳转</button>
  </div>
</template>

<script>
// import axios from 'axios';
export default {
  methods:{
    jump(){
      console.log('跳了一下');
    }
  },
  created(){
    const token = localStorage.getItem('token')
    if(!token)
    {
      this.$message.error('请先登录！')
      this.$router.push('/login')
    }
  }
}
</script>
<style>

</style>