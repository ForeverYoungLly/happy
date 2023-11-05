const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // transpileDependencies: true,
  lintOnSave:false, //关闭eslint校验
  devServer: {
    // https:true,
    port: 6103,
      proxy: {
        '/api': {
          target: 'http://123.207.73.185:8080',  //代理的地址
          changeOrigin: true,//是否跨域
          secure:false,
          pathRewrite: {
            '^/api': ''//重定向
          }
        }
      },
  },
})
