module.exports = {
    devServer: {
        proxy: {
          '^/v1': {
            target: 'http://47.105.132.129:8183',
            ws: true,
            changeOrigin: true
          }
        }
    },
    assetsDir: 'static'
}