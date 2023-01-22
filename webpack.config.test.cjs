const path = require('path');

module.exports = {
	entry: './tests/error.ts',
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
					/src/
				],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		modules: ['node_modules']
	},
	output: {
		filename: 'error.js',
		path: path.resolve(__dirname, 'tests'),
	},
};
