var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
    entry: path.join(__dirname, 'src/app.ts'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'game.js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            // pixi: path.join(__dirname, 'node_modules/phaser-ce/build/custom/pixi.js'),
            // phaser: path.join(__dirname, 'node_modules/phaser-ce/build/custom/phaser-split.js'),
            // phaser: path.join(__dirname, 'node_modules/phaser-ce/build/phaser.js'),
            // p2: path.join(__dirname, 'node_modules/phaser-ce/build/custom/p2.js'),
            // ads: path.join(__dirname, 'node_modules/@orange-games/phaser-ads/build/phaser-ads.js'),
            // ads: path.join(__dirname, 'vendor/phaser-ads/phaser-ads.js'),
            // spriter: path.join(__dirname, 'vendor/spriter/spriter.js'),
            assets: path.join(__dirname, 'assets/')
        }
    },
    plugins: [
        new WebpackShellPlugin({
            onBuildStart: ['npm run assets:dev']
        }),
        new webpack.DefinePlugin({
            'DEBUG': true,

            // Do not modify these manually, you may break things...
            'DEFAULT_GAME_WIDTH': /*[[DEFAULT_GAME_WIDTH*/960/*DEFAULT_GAME_WIDTH]]*/,
            'DEFAULT_GAME_HEIGHT': /*[[DEFAULT_GAME_HEIGHT*/720/*DEFAULT_GAME_HEIGHT]]*/,
            'MAX_GAME_WIDTH': /*[[MAX_GAME_WIDTH*/960/*MAX_GAME_WIDTH]]*/,
            'MAX_GAME_HEIGHT': /*[[MAX_GAME_HEIGHT*/720/*MAX_GAME_HEIGHT]]*/,
            'SCALE_MODE': JSON.stringify(/*[[SCALE_MODE*/'SHOW_ALL'/*SCALE_MODE]]*/),

            // The items below most likely the ones you should be modifying
            'GOOGLE_WEB_FONTS': JSON.stringify([ // Add or remove entries in this array to change which fonts are loaded
                //'Barrio'
                'Anton'
            ]),
            'SOUND_EXTENSIONS_PREFERENCE': JSON.stringify([ // Re-order the items in this array to change the desired order of checking your audio sources (do not add/remove/modify the entries themselves)
                'webm', 'ogg', 'm4a', 'mp3', 'aac', 'ac3', 'caf', 'flac', 'mp4', 'wav'
            ])
        }),
        new CleanWebpackPlugin([
            path.join(__dirname, 'dist')
        ]),
        new HtmlWebpackPlugin({
            title: 'Test',
            gaScript: '',
            phaserScript: `<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/phaser-ce/2.9.0/phaser.min.js"></script>`, //
            imaScript: '', // `<script type="text/javascript" src="https://imasdk.googleapis.com/js/sdkloader/ima3.js"></script>`, //
            template: path.join(__dirname, 'templates/index.ejs')
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        inline: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: true,
            ignored: /node_modules/
        }
    },
    module: {
        rules: [
            { test: /\.ts$/, enforce: 'pre', loader: 'tslint-loader' },
            { test: /assets(\/|\\)/, loader: 'file-loader?name=assets/[hash].[ext]' },
            // { test: /pixi\.js$/, loader: 'expose-loader?PIXI' },
            // { test: /phaser-split\.js$/, loader: 'expose-loader?Phaser' },
            // { test: /phaser\.js$/, loader: 'expose-loader?Phaser' },
            // { test: /p2\.js$/, loader: 'expose-loader?p2' },
            // { test: /phaser-ads\.js$/, loader: 'expose-loader?PhaserAds' },
            // { test: /spriter\.js$/, loader: 'expose-loader?Spriter' },
            { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' }
        ]
    },
    devtool: 'source-map'
};
