'use strict';
const path = require('path');
const config = require('./config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const packageConfig = require('../package.json');

function windows2posix(themeFilePath) {
    return path.resolve(__dirname, '../src', themeFilePath).replace(/\\/g, '/');
}

exports.assetsPath = function (_path) {
    const assetsSubDirectory =
        process.env.NODE_ENV === 'production'
            ? config.build.assetsSubDirectory
            : config.dev.assetsSubDirectory;

    return path.posix.join(assetsSubDirectory, _path);
};

exports.cssLoaders = function (options, useCssModule = true) {
    options = options || {};

    const styleLoader = {
        loader: 'style-loader',
        options: {
            sourceMap: options.sourceMap
        }
    };

    const cssLoader = () => {
        if (useCssModule) {
            return {
                loader: 'css-loader',
                options: {
                    sourceMap: options.sourceMap,
                    modules: true,
                    importLoaders: 2,
                    localIdentName: '[name]-[local]-[hash:base64:5]'
                }
            }
        }

        return {
            loader: 'css-loader',
            options: {
                sourceMap: options.sourceMap,
            }
        }
    };

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    };

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        const loaders = [];

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            loaders.push(MiniCssExtractPlugin.loader);
        } else {
            loaders.push(styleLoader)
        }

        loaders.push(cssLoader());

        if (options.usePostCSS) {
            loaders.push(postcssLoader)
        }

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        return loaders
    }

    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less', {
            javascriptEnabled: true
        }),
        sass: generateLoaders('sass', {
            indentedSyntax: true,
            prependData:  `@import "${windows2posix('styles/lego-ui-theme.scss')}";`
        }),
        scss: generateLoaders('sass', {
            prependData:  `@import "${windows2posix('styles/lego-ui-theme.scss')}";`
        }),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
};

exports.styleLoaders = function (options) {
    const output = [];
    const cssModulesLoaders = exports.cssLoaders(options);
    const noCssModulesloaders = exports.cssLoaders(options, false);

    for (const extension in cssModulesLoaders) {
        const loader = cssModulesLoaders[extension];
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader,
            exclude: /node_modules/
        })
    }

    for (const extension in noCssModulesloaders) {
        const loader = noCssModulesloaders[extension];
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader,
            include: /node_modules/
        })
    }

    return output
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
        })
    }
};
