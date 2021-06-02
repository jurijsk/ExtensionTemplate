import * as path from 'path';
import webpack from 'webpack';
import fs from 'fs';
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

// just in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
	throw err;
});


function compilerRunCallback(error: Error, stats: webpack.Stats) {
	if(error) {
		throw error;
	}
	let statsJson = stats.toJson({all: false, warnings: true, errors: true});
	for(const error of statsJson.errors) {
		
	}
	if(statsJson.errors.length) {
		// Only keep the first error. Others are often indicative
		// of the same problem, but confuse the reader with noise.
		if(statsJson.errors.length > 1) {
			statsJson.errors.length = 1;
		}
		throw new Error(statsJson.errors.join('\n\n'));
	}
	return webpack.Stats;
}

function build() {
	console.log("build.ts is running");
	const mode = process.argv[2] || 'development';
	// Do this as the first thing so that any code reading it knows the right env.
	process.env.NODE_ENV = mode;

	const {config} = require('../webpack.config');
	const compiler = webpack(config);
	return new Promise((resolve, reject) => {
		try {
			const stats = compiler.run(compilerRunCallback);
			resolve(stats);
		} catch (error) {
			return reject(error);
		}
	});
}

build();