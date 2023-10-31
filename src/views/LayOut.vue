<template>
  <!--整个页面容器 -->
  <el-container id="el_container">
      <!-- 左侧边栏 -->
      <el-aside >
          <theAside></theAside>
      </el-aside>
      <!-- 右侧主体 -->
      <el-container>
          <!-- 主体头部 -->
          <el-header style="padding:0">
              <!-- 头部组件 -->
              <theHeader></theHeader>
          </el-header>
          <!-- 路由切换区域 -->
          <router-view></router-view>
      </el-container>
  </el-container>
</template>

<script>
import theAside from '@/components/theAside.vue';
import theHeader from '@/components/theHeader.vue';

  export default{
    name:'LayOut',
    components:{
      theAside,
      theHeader
    }
  }

</script>
<style>

#el-container {
  display: flex ;
  flex-direction: column ;
  flex: 1;
}
.el-header{
  background-color: #fff;
  color: #333;
  text-align: center;
  height: 100px !important; 
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  height: 100%;
  width:12% !important ;
  overflow: hidden !important;
}

body>.el-container {
  width: 1530px;
  margin-bottom: 40px;
  position: relative;
}

</style>