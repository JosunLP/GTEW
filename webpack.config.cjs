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
		extensions: ['.tsx', '.ts'],
		modules: ['node_modules']
	},
	output: {
		filename: 'gtew.js',
		library: {
			name: 'gtew',
			type: 'module',
		},
		path: path.resolve(__dirname, 'dist'),
	}
};
