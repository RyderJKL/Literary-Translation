'use strict';
const path = require('path');
const config = require('./config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const packageConfig = require('../package.json');

exports.assetsPath = function(_path) {
    const assetsSubDirectory =
        process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory;

    return path.posix.join(assetsSubDirectory, _path);
};

exports.generatorCssLoader = function(loader, options) {
    // generate loader string to be used with extract text plugin
    return function generateLoaders(loaderOptions) {
        loaderOptions = loaderOptions || {};

        const styleLoader = {
            loader: 'style-loader',
            options: {
                sourceMap: options.sourceMap
            }
        };

        const cssLoader = {
            loader: 'css-loader',
            options: Object.assign({}, {
                modules: true,
                importLoaders: 2,
                localIdentName: '[name]-[local]-[hash:base64:5]'
            })
        };

        const postcssLoader = {
            loader: 'postcss-loader',
            options: {
                sourceMap: options.sourceMap
            }
        };

        const loaders = [];

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            loaders.push(MiniCssExtractPlugin.loader);
        } else {
            loaders.push(styleLoader);
        }

        loaders.push(cssLoader);

        if (options.usePostCSS) {
            loaders.push(postcssLoader);
        }

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            });
        }

        return loaders;
    };
    // return {
    //     css: generateLoaders,
    //     postcss: generateLoaders,
    //     // less: generateLoaders('less'),
    //     // sass: generateLoaders('sass'),
    //     scss: generateLoaders,
    //     // stylus: generateLoaders('stylus'),
    //     styl: generateLoaders
    // }
};

exports.styleLoaders = function(options) {
    const output = [];
    const loaderExtensions = ['css', 'postcss', 'scss'];
    const loaders = loaderExtensions.map(loader => {
        return {
            loaderName: loader,
            loader: exports.generatorCssLoader(loader === 'scss' ? 'sass' : loader, options)
        };
    });

    loaders.forEach(loader => {
        if (loader.loaderName === 'css') {
            // output.push({
            //     test: new RegExp('\\.' + loader.loaderName + '$'),
            //     use: loader.loader(),
            //     include: /node_modules/,
            // });

            output.push({
                test: new RegExp('\\.' + loader.loaderName + '$'),
                use: loader.loader({
                    modules: true,
                    importLoaders: 2,
                    localIdentName: '[name]-[local]-[hash:base64:5]'
                }),
                exclude: /node_modules/
            });
        } else {
            output.push({
                test: new RegExp('\\.' + loader.loaderName + '$'),
                use: loader.loader(),
                exclude: /node_modules/
            });
        }
    });

    return output;
};

exports.createNotifierCallback = () => {
    const notifier = require('node-notifier');

    return (severity, errors) => {
        if (severity !== 'error') return;

        const error = errors[0];
        const filename = error.file && error.file.split('!').pop();

        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png')
        });
    };
};
