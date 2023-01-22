const path = require('path');

module.exports = {
	entry: './src/gtew.ts',
	devtool: 'source-map',
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: [
					/node_modules/,
					/dist/,
					/tests/
				],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		modules: ['node_modules']
	},
	output: {
		filename: 'gtew.js',
		path: path.resolve(__dirname, 'dist'),
	},
};
