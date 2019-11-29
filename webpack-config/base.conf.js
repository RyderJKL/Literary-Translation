const path = require('path');
const config = require('./config');
// https://www.npmjs.com/package/webpack-theme-color-replacer
const ThemeColorReplacer = require('webpack-theme-color-replacer');
const resolve = (dir) => path.resolve(__dirname, '..', dir);

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        main: './src/index.tsx'
    },
    resolve: {
        modules: [resolve('src'), resolve('packages'), resolve('node_modules')],
        extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss'],
        alias: {
            '@': resolve('src'),
            packages: resolve('packages')
        }
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            cache: true,
                            fix: true,
                            emitWarning: true,
                            formatter: require('eslint-friendly-formatter')
                        }
                    }
                ],
                exclude: [resolve('mock'), resolve('node_modules'), resolve('packages')]
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                options: {
                    useBabel: true,
                    babelCore: '@babel/core'
                },
                exclude: [resolve('mock'), resolve('node_modules')]
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
    },
    plugins: [
        new ThemeColorReplacer({
            // colors from src/styles/lego-ui-theme.scss
            matchColors: [
                // 主题颜色
                '#7774e7',
                '#8c8aeb',

                // 危险颜色
                '#ed4014',
                '#f16643',

                // 提示颜色
                '#1890ff',
                '#52c41a',
                '#f5222d',
                '#faad14',

                // 边框颜色
                '#e6ecf5',

                // 禁用颜色
                '#e9ecef',

                // 背景颜色
                '#f8f8f8',
                // 'lighten($primary-color, 30%)',
                '#fff',

                // 文字颜色
                '#414a63',
                '#616a6e',
                '#888da8',

                // 深色
                '#000',
                '#6b6e67',
                '#001529',
                '#fff',
                '#cdc7c7',
                '#7f7e7e'
            ],
            fileName: 'css/theme-colors-[contenthash:8].css',
            isJsUgly: process.env.NODE_ENV !== 'development'
        })
    ]
};
