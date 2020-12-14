const CracoLessPlugin = require('craco-less')
const { purple } = require('@ant-design/colors')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': purple.primary },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}
