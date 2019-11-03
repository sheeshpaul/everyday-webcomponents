import commonjs from "rollup-plugin-commonjs";
import pkg from './package.json';
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript";
import uglify from "rollup-plugin-uglify-es";

const production = "production";

const development = "development";

const plugins = [
	resolve(),    // Locate modules using the Node resolution algorithm, for using third party modules in node_modules
	commonjs(),   // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
	typescript(), // Convert TypeScript to JavaScript
	replace({
		exclude: "node_modules/**", ENV: JSON.stringify(process.env.NODE_ENV || development),
	}),
	(process.env.NODE_ENV === production && uglify())
];

const output = {
	name: "ew",
	format: "iife",
	esModule: false
};

export default [
	// All components bundle
	{
		input: "src/main.ts",
		output: { ...output, file: process.env.NODE_ENV === production ? pkg.browser : "dist/everyday-webcomponents.js"	},
		plugins: plugins
	},

	// ew-card component bundle
	{
		input: "src/components/ew-card/index.ts",
		output: { ...output, file: process.env.NODE_ENV === production ? "dist/everyday-ew-card-webcomponent.min.js" : "dist/everyday-ew-card-webcomponent.js" },
		plugins: plugins
	},

	// ew-image-card component bundle
	{
		input: "src/components/ew-image-card/index.ts",
		output: { ...output, file: process.env.NODE_ENV === production ? "dist/everyday-ew-image-card-webcomponent.min.js" : "dist/everyday-ew-image-card-webcomponent.js" },
		plugins: plugins
	},

	// ew-carousel component bundle
	{
		input: "src/components/ew-carousel/index.ts",
		output: { ...output, file: process.env.NODE_ENV === production ? "dist/everyday-ew-carousel-webcomponent.min.js" : "dist/everyday-ew-carousel-webcomponent.js" },
		plugins: plugins
	},

	// CommonJS (for Node) and ES module (for bundlers) build
	{
		input: "src/main.ts",
		plugins: [
			typescript() // Convert TypeScript to JavaScript
		],
		output: [
			{ file: pkg.main, format: "cjs" },
			{ file: pkg.module, format: "esm" }
		]
	}
];
