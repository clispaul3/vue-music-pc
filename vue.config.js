const path = require('path')
module.exports = {
    configureWebpack:{
        resolve:{
            extensions:['.js','.vue','.scss'],
            alias:{
                '@base':path.resolve('./src/components/baseComponents'),
                '@module':path.resolve('./src/components/moduleComponents'),
                '@page':path.resolve('./src/components/pages'),
                '@main':path.resolve('./mainprocess'),
                '@asstets':path.resolve('./src/asstets'),
                '@api':path.resolve('./src/api'),
                '@utils':path.resolve('./src/utils')
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import "./src/style/common.scss";`
            }
        }
    }
}