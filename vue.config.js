const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const TersetPlugin = require('terser-webpack-plugin')

function getGitVersionInfo() {
  if (process.env.NODE_ENV === 'production') {
    try {
      let fs = require('fs')
      let gitHEAD = fs.readFileSync('.git/HEAD', 'utf-8').trim() // ref: refs/heads/master
      let ref = gitHEAD.split(': ')[1] // refs/heads/master
      let branchName = gitHEAD.split('/')[2] // master
      let gitVersion = fs.readFileSync('.git/' + ref, 'utf-8').trim() // git版本号，例如：db3bxxx
      let gitCommitVersion = '"' + branchName + ': ' + gitVersion + '"' // 例如dev环境: "master: db3bxxx
      return gitCommitVersion
    } catch (error) {
      console.log(error)
      return ''
    }
  } else {
    return ''
  }
}

//用于标记项目发布时间
process.env.VUE_APP_BUILD_TIME = new Date().toString() + getGitVersionInfo()

module.exports = {
  assetsDir: 'static',
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new CompressionPlugin({
          test: /\.js$|\.html$|.\css/,
          threshold: 10240, //对超过10k的数据压缩
          deleteOriginalAssets: false,
        })
      )
      // config.plugins.push()

      config.optimization.minimizer.push(
        new TersetPlugin({
          terserOptions: {
            warnings: false,
            compress: {
              drop_debugger: true,
              drop_console: true,
            },
          },
          sourceMap: false,
          parallel: true,
        })
      )
    } else {
      config.devtool = 'source-map'
    }
  },
  productionSourceMap: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/css/variable.less')],
    },
  },
  devServer: {
    host: '0.0.0.0',
    port: 9001,
    open: true,
    // https: {
    //   key: selfSigned.key,
    //   cert: selfSigned.cert,
    // },
    // proxy: {
    // '/admin': {
    //   target: 'https://test.chicha.video:8667',
    // },
    // '/upload': {
    //   target: 'http://172.16.23.4:10000',
    // },
    // },
    before: process.env.VUE_APP_MOCK === 'true' ? require('./mock') : null,
  },
}
