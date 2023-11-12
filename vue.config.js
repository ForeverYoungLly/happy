const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   port: 8080,
  //   proxyTable: {
  //     '/api': {
  //       target: 'http://123.207.73.185:8080',
  //       changeOrigin: true, // 开启代理
  //       pathRewrite: {
  //         '^/api': ' '
  //       }
  //     }
  //   }
  // },
  publicPath: './'
})
