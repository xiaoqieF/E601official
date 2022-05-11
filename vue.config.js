const { defineConfig } = require('@vue/cli-service')
const TerserPlugin = require("terser-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production', config=>{
      config.entry('app').clear().add('./src/main-prod.js')
    })
    config.when(process.env.NODE_ENV === 'development', config=>{
      config.entry('app').clear().add('./src/main-dev.js')
    })
  },
})
