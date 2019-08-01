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
            '@': resolve('src/'),
            "pages": resolve('src/pages'),
            "actions": resolve('src/actions'),
            "reducers": resolve('src/reducers'),
            "epics": resolve('src/epics'),
            "services": resolve('src/services'),
            "models": resolve('src/models'),
            "components": resolve('src/components'),
            "store": resolve('src/store'),
            "utils": resolve('src/utils'),
            "hooks": resolve('src/hooks'),
            "vendor": resolve('src/vendor'),
            "routes": resolve('src/routes'),
            "constant": resolve('src/constant'),
            "middleware": resolve('src/middleware'),
            "layout": resolve('src/layout'),
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
