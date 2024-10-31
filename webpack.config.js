const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => ({
	entry: "./src/index.tsx",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	devtool: "source-map",
	devServer: {
		port: 3030,
		open: true,
		historyApiFallback: true,
		proxy: [
			{
				context: ["/api"],
				target: "http://localhost:3000"
			}
		]
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: "babel-loader"
			},
			{
				test: /\.(sa|sc|c)ss$/, // styles files
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader"
				],
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
				loader: "url-loader",
				options: { limit: false },
			},
		]
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'e3d',
			filename: "remoteEntry.js",
			exposes: {
				"e3dListFragment": "./src/pages/list/bootstrapRemote.tsx",
				"e3dEditFragment": "./src/pages/edit/bootstrapRemote.tsx",
				"e3dViewFragment": "./src/pages/view/bootstrapRemote.tsx",
			},
			shared: {
				react: {
					eager: true,
					singleton: true,
				},
				"react-dom": {
					eager: true,
					singleton: true,
				},
			}
		}),
		new HtmlWebpackPlugin({
			template: "public/index.html", // to import index.html file inside index.js
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		})
	],
})
