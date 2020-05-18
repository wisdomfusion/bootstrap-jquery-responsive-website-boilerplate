'use strict';

const pages = [
    'index',
    'about',
];

const path      = require('path');
const DIST_PATH = path.resolve(__dirname, 'dist');
const SRC_PATH  = path.relative(__dirname, './src');

const webpack = require('webpack');

const HtmlWebpackPlugin       = require('html-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const TerserJSPlugin          = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin          = require('uglifyjs-webpack-plugin');

module.exports = (env, argv) => {
    const isDev   = env.dev;
    const isProd  = env.prod;

    let config = {
        mode: isProd ? 'production' : 'development',

        devtool: isProd ? '' : 'source-map',

        entry: {
            app: './src/app.js',
        },

        output: {
            path:          DIST_PATH,
            filename:      isProd ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
            chunkFilename: isProd ? 'js/[name].[chunkhash:8].js' : 'js/[name].js',
        },

        optimization: {
            moduleIds:    'hashed',
            runtimeChunk: 'single',

            splitChunks: {
                cacheGroups: {
                    vendor: {
                        name:               'vendors',
                        test:               /[\\/]node_modules[\\/]/,
                        chunks:             'all',
                        priority:           20,
                        reuseExistingChunk: true,
                        enforce:            true,
                    }
                }
            },

            // minify files when prod
            minimizer: isProd ? [
                new UglifyJsPlugin(),
                new TerserJSPlugin(),
                new OptimizeCSSAssetsPlugin(),
            ] : [],
        },

        plugins: [
            // new webpack.ProgressPlugin(),

            new CleanWebpackPlugin(),

            new webpack.ProvidePlugin({
                $:               'jquery',
                jQuery:          'jquery',
                'window.jQuery': 'jquery',
                tether:          'tether',
                Tether:          'tether',
                'window.Tether': 'tether',
                Popper:          ['popper.js', 'default'],
                Alert:           'exports-loader?Alert!bootstrap/js/dist/alert',
                Button:          'exports-loader?Button!bootstrap/js/dist/button',
                Carousel:        'exports-loader?Carousel!bootstrap/js/dist/carousel',
                Collapse:        'exports-loader?Collapse!bootstrap/js/dist/collapse',
                Dropdown:        'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
                Modal:           'exports-loader?Modal!bootstrap/js/dist/modal',
                Popover:         'exports-loader?Popover!bootstrap/js/dist/popover',
                Scrollspy:       'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
                Tab:             'exports-loader?Tab!bootstrap/js/dist/tab',
                Tooltip:         "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
                Util:            'exports-loader?Util!bootstrap/js/dist/util'
            }),

            new MiniCssExtractPlugin({
                filename:      isProd ? 'css/[name].[contenthash:8].css' : 'css/[name].css',
                chunkFilename: isProd ? 'css/[name].[chunkhash:8].css' : 'css/[name].css',
            }),

            new webpack.HashedModuleIdsPlugin(),
        ],

        module: {
            rules: [
                {
                    test:   /bootstrap[\/\\]dist[\/\\]js[\/\\]umd[\/\\]/,
                    loader: 'imports-loader?jQuery=jquery'
                },
                {
                    test: require.resolve('jquery'),
                    use:  [{
                        loader:  'expose-loader',
                        options: 'jQuery'
                    }, {
                        loader:  'expose-loader',
                        options: '$'
                    }]
                },
                {
                    test:    /\.js$/i,
                    exclude: /node_modules|test|dist/,
                    use:     [
                        {
                            loader:  'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    ]
                },
                {
                    test: /\.(sa|sc|c)ss$/i,
                    use:  [
                        { loader: 'style-loader' },
                        {
                            loader:  MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../',
                            },
                        },
                        { loader: 'css-loader' },
                        { loader: 'postcss-loader' },
                        { loader: 'sass-loader' },
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    use:  [
                        {
                            loader:  'file-loader',
                            options: {
                                outputPath: 'img',
                                name:       '[folder]/[name].[ext]',
                            },
                        },
                    ],
                },
            ]
        },

        resolve: {
            alias: {
                Modules: SRC_PATH + '/modules',
                Pages:   SRC_PATH + '/pages',
            },
        },
    };

    pages && pages.length && pages.forEach(page => {

        config.plugins.push(new HtmlWebpackPlugin({
            template: `./src/pages/${page}/template.html`,
            filename: `${page}.html`,
            chunks:   ['vendors', 'app'],
            inject:   'head',

            minify: isProd ? {
                collapseWhitespace:            true,
                removeComments:                true,
                removeRedundantAttributes:     true,
                removeScriptTypeAttributes:    true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype:               true,
            } : {},
        }));

    });

    return config;
}