<template>
  <div id="app">
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
  </div>
</template>

<style >
*{
  margin:0;
  padding: 0;
  box-sizing: border-box;

}
a{ 
    text-decoration: none;
    color: rgb(254, 254, 254);
}
body {
  display: flex  !important;
  height: 100vh !important;

}
#app{
  display: flex;
  flex: 1;
  height: 100% !important;
}
</style>
