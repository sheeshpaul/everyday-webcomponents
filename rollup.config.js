import commonjs from "rollup-plugin-commonjs";
import pkg from './package.json';
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript";
import uglify from "rollup-plugin-uglify-es";

export default [
	// browser-friendly iife build
	{
		input: "src/main.ts",
		output: {
			name: "ew",
			file: process.env.NODE_ENV === "production" ? "dist/iife/everyday-webcomponents.min.js" : pkg.browser,
			format: "iife",
			esModule: false
		},
		plugins: [
			resolve(),   // so Rollup can find `ms`
			commonjs(),  // so Rollup can convert `ms` to an ES module
			typescript(), // so Rollup can convert TypeScript to JavaScript
			replace({
				exclude: "node_modules/**", ENV: JSON.stringify(process.env.NODE_ENV || "development"),
			}),
			(process.env.NODE_ENV === "production" && uglify())
		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
	{
		input: "src/main.ts",
		external: ["ms"],
		plugins: [
			typescript() // so Rollup can convert TypeScript to JavaScript
		],
		output: [
			{ file: pkg.main, format: "cjs" },
			{ file: pkg.module, format: "esm" }
		]
	}
];
