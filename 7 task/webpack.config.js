const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	}

	if(isProd) {
		config.minimizer = [
			new OptimizeCssAssetsWebpackPlugin(),
			new TerserWebpackPlugin()
		]
	}

	return config;
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = extra => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader
		},
		'css-loader'
	]

	if(extra) {
		loaders.push(extra);
	}

	return loaders;
}

const babelOptions = preset => {
	const opts ={
    	presets: [
    		'@babel/preset-env'
    	],
        plugins: [
			'@babel/plugin-proposal-class-properties'
		]
	}

	if(preset) {
		opts.presets.push(preset);
	}

	return opts
}

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	target: 'web',
	entry: {
		main: ['@babel/polyfill','./js/script.js'],
	},
	output: {
		filename: filename('js'),
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		extensions: ['.js', '.json', '.png'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
		}
	},
	optimization: optimization(),
	devServer: {
		 port: 8080, // любой порт
		 open: true,
		 watchOptions: {
		    poll: true,
		    ignored: "/node_modules/"
		},
	},
	devtool: isDev ? 'source-map' : false,
	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [{
				from: path.resolve(__dirname, 'src/img'),
				to: path.resolve(__dirname, 'dist')
			}]
		}),
		new MiniCssExtractPlugin({
			filename: filename('css')
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: cssLoaders()
			},
			{
				test: /\.less$/,
				use: cssLoaders('less-loader')
			},
			{
				test: /\.s[ac]ss$/,
				use: cssLoaders('sass-loader')
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				use: ['file-loader']
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: ['file-loader']
			},
			{
				test: /\.xml$/,
				use: ['xml-loader']
			},
			{
				test: /\.csv$/,
				use: ['csv-loader']
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
				    options: babelOptions()
				}]
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
				    options: babelOptions('@babel/preset-typescript')
				}]
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
				    options: babelOptions('@babel/preset-react')
				}]
			}
		]
	}
}