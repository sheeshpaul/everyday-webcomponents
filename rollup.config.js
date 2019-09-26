import commonjs from "rollup-plugin-commonjs";
import pkg from './package.json';
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript";
import uglify from "rollup-plugin-uglify-es";

export default [
	// Browser-friendly iife build
	{
		input: "src/main.ts",
		output: {
			name: "ew",
			file: process.env.NODE_ENV !== "production" ? "dist/everyday-webcomponents.js" : pkg.browser,
			format: "iife",
			esModule: false
		},
		plugins: [
			resolve(),    // Locate modules using the Node resolution algorithm, for using third party modules in node_modules
			commonjs(),   // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
			typescript(), // Convert TypeScript to JavaScript
			replace({
				exclude: "node_modules/**", ENV: JSON.stringify(process.env.NODE_ENV || "development"),
			}),
			(process.env.NODE_ENV === "production" && uglify())
		]
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
