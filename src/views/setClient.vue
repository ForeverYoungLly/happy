<template>
  <div>用户端配置
    <button @click="jump">跳转</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  methods:{
    async jump(){
       await axios({
        url:'http://42.194.194.197:80/templateMessage',
        method:'POST',
        params:{
          wxOpenId:'osNMd6yQN02kDAW7UiNsotP8J1YU',
          name:'带鲸鱼',
          message:'你好啊！',
          nowStatus:'已通过',
          HTTP:'https://www.baidu.com'
        }
      }).then( Result =>{
        console.log(Result.data);
      }).catch( error =>{
        console.log(error);
      })
    }
  },
  created(){
    if(!localStorage.getItem('token'))
    {
      this.$message.error('请先登录！')
      this.$router.push('/login')
    }
  }
}
</script>
<style>

</style>