'use strict';
const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('./config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./base.conf');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TersePlugin = require('terser-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

const env = require('./config/' + process.env.env_config + '.env');

// For NamedChunksPlugin
const seen = new Set();
const nameLength = 4;

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),
        // extract css into its own file
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[contenthash:8].css'),
            chunkFilename: utils.assetsPath('css/[name].[contenthash:8].css')
        }),
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: './src/index.html',
            inject: true,
            favicon: resolve(config.siteSettings.favicon),
            title: config.siteSettings.title,
            templateParameters: {
                BASE_URL: config.build.assetsPublicPath + config.build.assetsSubDirectory
            },
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            }
        }),
        new ScriptExtHtmlWebpackPlugin({
            inline: /runtime\..*\.js$/
        }),
        new webpack.NamedChunksPlugin(chunk => {
            if (chunk.name) {
                return chunk.name;
            }
            const modules = Array.from(chunk.modulesIterable);
            if (modules.length > 1) {
                const hash = require('hash-sum');
                const joinedHash = hash(modules.map(m => m.id).join('_'));
                let len = nameLength;
                while (seen.has(joinedHash.substr(0, len))) len++;
                seen.add(joinedHash.substr(0, len));
                return `chunk-${joinedHash.substr(0, len)}`;
            } else {
                return modules[0].id;
            }
        }),
        new webpack.HashedModuleIdsPlugin()
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, '../static'),
        //         to: config.build.assetsSubDirectory,
        //         ignore: ['.*']
        //     }
        // ])
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: 'chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial' // 只打包初始时依赖的第三方
                },
                legoUI: {
                    name: 'chunk-legoUI', // 单独将 legoUI 拆包
                    priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                    test: /[\\/]node_modules[\\/]lego-ui[\\/]/
                },
                commons: {
                    name: 'chunk-commons',
                    test: resolve('src/components'), // 可自定义拓展规则
                    minChunks: 3, // 最小公用次数
                    priority: 5,
                    reuseExistingChunk: true
                }
            }
        },
        runtimeChunk: 'single',
        minimizer: [
            new TersePlugin({
                chunkFilter: chunk => {
                    // Exclude uglification for the `vendor` chunk
                    // todo: use dll
                    if (chunk.name === 'vendor') {
                        return false;
                    }

                    return true;
                },
                sourceMap: config.build.productionSourceMap,
                terserOptions: {
                    output: {
                        comments: false
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin()
        ]
    }
});

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin');

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
        })
    );
}

if (config.build.generateAnalyzerReport || config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

    if (config.build.bundleAnalyzerReport) {
        webpackConfig.plugins.push(
            new BundleAnalyzerPlugin({
                analyzerPort: 8080,
                generateStatsFile: false
            })
        );
    }

    if (config.build.generateAnalyzerReport) {
        webpackConfig.plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                reportFilename: 'bundle-report.html',
                openAnalyzer: false
            })
        );
    }
}

module.exports = webpackConfig;
