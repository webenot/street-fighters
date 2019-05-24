const webpack = require('webpack');
const Cleanlugin = require('clean-webpack-plugin');
require("@babel/polyfill");

const config = require('./config');
const staticDir =  config.get('httpServer:staticDir');

const isProduction = (process.env.NODE_ENV === 'production');

module.exports = {
    entry: {
        app: ["@babel/polyfill", staticDir + '/javascripts/src/index.js'],
    },
    devServer: {
        inline: true,
        contentBase: staticDir + '/javascripts/dist',
        compress: true,
    },
    context: staticDir + '/javascripts/src',
    devtool: (isProduction) ? false : 'inline-source-map',
    output: {
        filename: 'boundle.js',
        path: staticDir + '/javascripts/dist',
    },
    name: 'client',
    mode: (isProduction) ? 'production' : 'development',
    watch: false,
    module: {
        rules: [
            // js
            {
                test: /\.m?js$/i,
                exclude: /^(node_modules)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        configFile: "./babel.config.js",
                        cacheDirectory: true
                    }
                }
            },
        ],

    },
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }),
        new Cleanlugin()
    ],
};

// PRODUCTION ONLY
if(isProduction) {
    module.exports.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
    );
}