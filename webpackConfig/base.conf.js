const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config');

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
            '@/': resolve('src/'),
            // 'store': resolve('src/store/'),
            // 'actions': resolve('src/actions/'),
            // 'views': resolve('src/views/'),
            // 'components': resolve('src/components/'),
            // 'containers': resolve('src/containers/'),
            // 'reducers': resolve('src/reducers/'),
            // 'utils': resolve('src/utils/'),
            // 'vendor': resolve('src/vendor/'),
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
                enforce: 'pre',
                use: [
                    {
                        loader: 'tslint-loader',
                        options: {
                            formattersDirectory: 'node_modules/tslint-formatter-beauty',
                            formatter: 'beauty'
                        }
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                loader: ['awesome-typescript-loader'],
                exclude: /node_modules/,
            },
            // {
            //     test: /\.scss$/,
            //     use: [{
            //         loader: "style-loader"
            //     },
            //         {
            //             loader: "css-loader",
            //             options: {
            //                 camelcase: false,
            //                 modules: false
            //             }
            //         },
            //         {
            //             loader: "postcss-loader"
            //         },
            //         {
            //             loader: "sass-loader"
            //         }
            //     ]
            // },
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
