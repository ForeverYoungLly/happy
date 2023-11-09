const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false, //关闭eslint校验,
//   devServer: {
//     port: 8080,
//     proxy: {
//         '/api': {
//             target: 'http://123.207.73.185:8080',
//             pathRewrite: {
//                 '/api': ''
//             }
//         },
//     }
// },
  publicPath: './'
})
