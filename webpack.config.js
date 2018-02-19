//MODULES
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// SOURCE PATHS
const SRC_DIR = path.resolve(__dirname, 'src');
const SRC_APP_JS = './index.js';
const SRC_HTML = 'index.html';

// BUILD PATHS
const OUTPUT_DIR = path.resolve(__dirname, 'dist');
const OUTPUT_STYLE_DIR = path.resolve(OUTPUT_DIR, 'style');
const OUTPUT_IMAGE_DIR = path.resolve(OUTPUT_DIR, 'images');
const OUTPUT_JS_BUNDLE_FILE = 'js/bundle.js';
const OUTPUT_CSS_BUNDLE_FILE = 'style/bundle.css';

const cssExtractor = new ExtractTextPlugin({
    filename: OUTPUT_CSS_BUNDLE_FILE,
    disable: false,
    allChunks: true
});

const htmlExtractor = new HtmlWebpackPlugin({
    template: SRC_HTML
});

const cleaner = new CleanWebpackPlugin([OUTPUT_DIR]);

const config = {
    // DEVTOOL AND OTHER CONFIGS
    context: SRC_DIR,
    devtool: 'source-map',
    target: 'web',
    cache: false,
    watchOptions: {
        aggregateTimeout: 1000,
        poll: true
    },
    // RESOLVE
    resolve: {
        modules: ['node_modules', SRC_DIR],
        extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
        descriptionFiles: ['package.json']
    },
    // ENTRY
    entry: {
        app: ['babel-polyfill', SRC_APP_JS]
    },

    // OUTPUT
    output: {
        path: OUTPUT_DIR,
        filename: OUTPUT_JS_BUNDLE_FILE,
        sourceMapFilename: 'sourcemaps/[file].map'
    },
    // MODULES
    module: {
        rules: [
            // RULES FOR JS | JSX
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: [SRC_DIR],
                exclude: /node_modules/,
                options: {
                    presets: ['es2015', 'react', 'stage-2']
                }
            },
            //RULES FOR HTML
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            // RULES FOR CSS | SCSS
            {
                test: /\.(css|scss)$/,
                use: cssExtractor.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            },
            //RULES FOR IMAGES
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    name: '[path][name].[ext]',
                    publicPath: OUTPUT_IMAGE_DIR
                }
            },
            //RULES FOR FONTS
            {
                test: /\.(ttf|woff|eot|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    },
    // DEV SERVER
    devServer: {
        compress: true,
        inline: true,
        port: 3030,
        open: true
    },
    // PLUGINS
    plugins: [
        cssExtractor,
        htmlExtractor,
        cleaner
    ]
};


module.exports = config;