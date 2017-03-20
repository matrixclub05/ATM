var path = require('path'),
    webpack = require("webpack"),
    clientPath = path.join(__dirname, './client'),
    buildPath = path.join(__dirname, './client/build'),
    pkg = require('./package.json'),
    autoprefixer = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

var isProduction = process.env.NODE_ENV;
var config = {
    entry: path.join(clientPath, 'index.js'),
    output: {
        path: path.join(buildPath),
        filename: 'bundle.js'
    },

    module: {
        noParse: [/moment.js/],
        loaders: [{
            test: /^index.html$/,
            loader: 'ejs-loader'
        }, {
            test: /\.tpl.html$|\.template.html$/,
            loader: 'html-loader'

        }, {
            test: /\.(png|jpg)$/,
            loader: 'file-loader?name=img/[name].[ext]' // inline base64 URLs for <=10kb images, direct URLs for the rest
        },{
            test: /\.css$/,
            loaders: ['style', 'css']
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'postcss', 'sass']
        }, {
            test: /\.less$/,
            loaders: ['style', 'css', 'less']
        }, {
            test: /\.(svg|ttf|eot|woff|woff2)$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
        }]
    },
    postcss: function () {
        return [autoprefixer({
            browsers: ['last 3 versions']
        })];
    },
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: Boolean(isProduction)
        }),

        new webpack.ProvidePlugin({
            moment: 'moment',

            $: 'jquery',
            jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            pkg: pkg,
            nocache: new Date().getTime(),
            template: path.join(clientPath, 'index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin()
    ]
};

module.exports = config;