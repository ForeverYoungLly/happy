<template>
  <div>用户端配置
    <button @click="jump">跳转</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  methods:{
    jump(){
      axios({
        url:'http://42.194.194.197:8080/templateMessage',
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
      })
    }
  }
}
</script>
<style>

</style>