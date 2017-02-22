module.exports = {
	entry: ['./index.js'],
	watch : true,
	output: {
		path: __dirname + '/bundle/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: { presets: [ 'es2015'] }
			}
		]
	}
};