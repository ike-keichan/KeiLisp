module.exports = {
	"mode": "development",
	"entry": {
		"main": "./src/Example.js"
	},
	target: 'node',
	"output": {
		"path": `${__dirname}`,
		"filename": "Example.js"
	},
	module: {
		rules: [{
            test: /\.?js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-class-properties']
                }
            }
        }]
	  }
};
