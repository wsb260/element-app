module.exports = {
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    proxy: {
      // 配置跨域
      '/api': {
        target: 'https://ele-interface.herokuapp.com/api/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    externals: {
      AMap: 'window.AMap'
    }
  }
}
