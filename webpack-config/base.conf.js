const path = require('path');
const config = require('./config');
// const tsImportPluginFactory = require('ts-import-plugin');
const resolve = (dir) => path.resolve(__dirname, '..', dir);

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        main: './src/index.tsx'
    },
    resolve: {
        modules: [
            resolve('src'),
            resolve('node_modules'),
        ],
        extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss'],
        alias: {
            '@': resolve('src')
        }
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath:
            process.env.NODE_ENV === 'production'
                ? config.build.assetsPublicPath
                : config.dev.assetsPublicPath
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                // options: {
                //     getCustomTransformers: () => ({
                //         before: [
                //             tsImportPluginFactory([
                //                 // {
                //                 //     libraryName: 'lego',
                //                 //     libraryDirectory: 'lib',
                //                 //     style: true
                //                 // },
                //                 {
                //                     libraryDirectory: '../_esm5/internal/operators',
                //                     libraryName: 'rxjs/operators',
                //                     camel2DashComponentName: false,
                //                     transformToDefaultImport: false
                //                 },
                //                 {
                //                     libraryDirectory: '../_esm5/internal/observable',
                //                     libraryName: 'rxjs',
                //                     camel2DashComponentName: false,
                //                     transformToDefaultImport: false,
                //                 }
                //             ])]
                //     }),
                // },
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: 'images/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: 'fonts/[name].[ext]'
                }
            }
        ]
    }
};
