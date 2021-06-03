import * as path from 'path';
import * as webpack from 'webpack';
import * as fs from 'fs';
import 'webpack-dev-server'; // just in case you run into any typescript error when configuring `devServer`
import {ExtensionReloader} from 'webpack-extension-reloader'

import MiniCssExtractPlugin = require('mini-css-extract-plugin');
import CopyWebpackPlugin = require("copy-webpack-plugin");
import HtmlWebpackPlugin = require("html-webpack-plugin");

type ConfigEnv = {production: boolean}

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const rootDir = fs.realpathSync(process.cwd());
function resolvePath(relativePath: string) {
	return path.resolve(rootDir, relativePath);
}

export default function configBuilder(env: ConfigEnv) {
	const production = env.production;
	const mode = production ? 'production' : 'development';
	process.env.NODE_ENV = mode;

	const paths = (function buildPaths() {
		const paths = {
			rootDir: rootDir,
			assemblyDir: resolvePath('assembly'),
			buildDir: resolvePath('build'),
			/** Directory for compilable resources */
			srcDir: resolvePath('sources'),
			/** Everything what needs to be delivered with the plugin, icons, manifest etc */
			assetsDir: 'assets',
			assetsDirPath: '',
			copyAssetsDir: 'copy',
			copyAssetsDirPath: '',
			outputDir: '',
			popupHtml: '',
			contentHtml: ''
		};
		paths.assetsDirPath = resolvePath(paths.assetsDir)
		paths.copyAssetsDirPath = path.join(paths.assetsDirPath, paths.copyAssetsDir);
		paths.outputDir = production ? paths.buildDir : paths.assemblyDir
		paths.popupHtml = path.join(paths.srcDir, 'popup.html');

		return paths;
	}());

	function getAssetModuleFilename(filename: string) {
		if(filename.startsWith(paths.assetsDir)) {
			filename = filename.substr(paths.assetsDir.length + 1);
		}
		return filename;
	}
	const config: webpack.Configuration = {
		mode: mode,
		devtool: production ? false : 'inline-source-map',
		optimization: {
			minimize: false, //for now
			providedExports: true,
			usedExports: true,
		},
		context: paths.rootDir,
		entry: {
			popup: {import: path.join(paths.srcDir, "popup.tsx")},
			background: { import: path.join(paths.srcDir, "background/background.ts") },
			'content-script': {import: path.join(paths.srcDir, "content-script/content-script.ts")}
		},
		output: {
			path: paths.outputDir,
			assetModuleFilename: pathData => getAssetModuleFilename(pathData.filename), //[1]
			filename: '[name].js',
			//clean: true
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.s[ac]ss$/i,
					sideEffects: true,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader",
						"sass-loader",
					],
				},
				{
					test: /\.svg$/, //[1]
					type: 'asset/resource',
					use: [
						{
							loader: 'svgo-loader',
							options: {
								configFile: false,
								plugins: [
									'removeDimensions'
								]
							}
						}]
				},
				{
					test: /\.png/,
					type: 'asset/resource'
				}
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		plugins: [
			new HtmlWebpackPlugin({
				filename: 'popup.html',
				template: paths.popupHtml,
				inject: false,
				minify: false
			}),
			new MiniCssExtractPlugin({filename: "[name].css"}),
			new CopyWebpackPlugin({
				patterns: [
					{
						from: '**/*',
						context: paths.copyAssetsDirPath, //[1]
					}
				]
			}),
			new ExtensionReloader({
				entries: {
					contentScript: "content-script",
					background: "background",
					extensionPage: "popup"
				}
			})
		],
		stats: {
			colors: true,
			//logging: 'verbose',
			excludeAssets: [
			(assetName) => { 
				return !(assetName in {'popup.js': '', 'shared.js': '', 'decoy.js': ''});
			}
			],
			modules: false
		},
	};
	production && (config.mode = mode); //Extension Reloaded wants to have mode set to 'development' for it to work.
	//!production && (config.devtool = 'inline-source-map');
	return config;
}

/**
 * [1] To be able to use svg in scss `url(..)` and to transform them along the way,
 * e.g. remove width and height attributes and optimize,
 * svgo-loader and new [asset modules](https://webpack.js.org/guides/asset-modules/) config
 * was added to the pipeline. And to keep the name of the svg nice and tight
 * `assetModuleFilename` was added to output config.
 *
 * And since this creates race condition between CopyWebpackPlugin and assets modules
 * resources dir renamed to assets and split to 'processabe' and 'copyable' files.
 *
 * Future alternative to `svgo-loader` if we will need to process other extensions is
 * https://github.com/tcoopman/image-webpack-loader and good in-depth article on webpack 5
 * asset modules https://dev.to/smelukov/webpack-5-asset-modules-2o3h
 */
