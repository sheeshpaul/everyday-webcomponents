import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript';

export default [
    // IIFE Development - All components bundle
    {
        input: 'src/main.ts',
        output: {
            file: pkg.unpkg,
            name: 'EverydayWebComponents',
            format: 'iife',
            esModule: false,
        },
        plugins: [
            resolve(), // Locate modules using the Node resolution algorithm, for using third party modules in node_modules
            commonjs(), // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
            typescript(), // Convert TypeScript to JavaScript
            replace({
                exclude: 'node_modules/**',
                'process.env.NODE_ENV': JSON.stringify('development'),
            }),
        ],
    },

    // IIFE Production - All components bundle
    {
        input: 'src/main.ts',
        output: {
            file: 'dist/everyday-webcomponents.min.js',
            name: 'EverydayWebComponents',
            format: 'iife',
            esModule: false,
        },
        plugins: [
            resolve(), // Locate modules using the Node resolution algorithm, for using third party modules in node_modules
            commonjs(), // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
            typescript(), // Convert TypeScript to JavaScript
            replace({
                exclude: 'node_modules/**',
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            terser(),
        ],
    },

    // IIFE Development - ew-card component bundle
    {
        input: 'src/components/ew-card/index.ts',
        output: {
            file: 'dist/everyday-ew-card-webcomponent.js',
            name: 'EverydayWebComponents',
            format: 'iife',
            esModule: false,
        },
        plugins: [
            resolve(), // Locate modules using the Node resolution algorithm, for using third party modules in node_modules
            commonjs(), // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
            typescript(), // Convert TypeScript to JavaScript
            replace({
                exclude: 'node_modules/**',
                'process.env.NODE_ENV': JSON.stringify('development'),
            }),
        ],
    },

    // IIFE Production - ew-card component bundle
    {
        input: 'src/components/ew-card/index.ts',
        output: {
            file: 'dist/everyday-ew-card-webcomponent.min.js',
            name: 'EverydayWebComponents',
            format: 'iife',
            esModule: false,
        },
        plugins: [
            resolve(), // Locate modules using the Node resolution algorithm, for using third party modules in node_modules
            commonjs(), // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
            typescript(), // Convert TypeScript to JavaScript
            replace({
                exclude: 'node_modules/**',
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            terser(),
        ],
    },

    // IIFE Development - ew-image-card component bundle
    {
        input: 'src/components/ew-image-card/index.ts',
        output: {
            file: 'dist/everyday-ew-image-card-webcomponent.js',
            name: 'EverydayWebComponents',
            format: 'iife',
            esModule: false,
        },
        plugins: [
            resolve(), // Locate modules using the Node resolution algorithm, for using third party modules in node_modules
            commonjs(), // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
            typescript(), // Convert TypeScript to JavaScript
            replace({
                exclude: 'node_modules/**',
                'process.env.NODE_ENV': JSON.stringify('development'),
            }),
        ],
    },

    // IIFE Production - ew-image-card component bundle
    {
        input: 'src/components/ew-image-card/index.ts',
        output: {
            file: 'dist/everyday-ew-image-card-webcomponent.min.js',
            name: 'EverydayWebComponents',
            format: 'iife',
            esModule: false,
        },
        plugins: [
            resolve(), // Locate modules using the Node resolution algorithm, for using third party modules in node_modules
            commonjs(), // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
            typescript(), // Convert TypeScript to JavaScript
            replace({
                exclude: 'node_modules/**',
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            terser(),
        ],
    },

    // IIFE Development - ew-carousel component bundle
    {
        input: 'src/components/ew-carousel/index.ts',
        output: {
            file: 'dist/everyday-ew-carousel-webcomponent.js',
            name: 'EverydayWebComponents',
            format: 'iife',
            esModule: false,
        },
        plugins: [
            resolve(), // Locate modules using the Node resolution algorithm, for using third party modules in node_modules
            commonjs(), // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
            typescript(), // Convert TypeScript to JavaScript
            replace({
                exclude: 'node_modules/**',
                'process.env.NODE_ENV': JSON.stringify('development'),
            }),
        ],
    },

    // IIFE Production - ew-carousel component bundle
    {
        input: 'src/components/ew-carousel/index.ts',
        output: {
            file: 'dist/everyday-ew-carousel-webcomponent.min.js',
            name: 'EverydayWebComponents',
            format: 'iife',
            esModule: false,
        },
        plugins: [
            resolve(), // Locate modules using the Node resolution algorithm, for using third party modules in node_modules
            commonjs(), // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
            typescript(), // Convert TypeScript to JavaScript
            replace({
                exclude: 'node_modules/**',
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            terser(),
        ],
    },

    // ES
    {
        input: 'src/main.ts',
        output: { file: pkg.module, format: 'es', indent: false },
        plugins: [
            resolve(),
            typescript(), // Convert TypeScript to JavaScript
        ],
    },

    // CommonJS
    {
        input: 'src/main.ts',
        output: { file: pkg.main, format: 'cjs', indent: false },
        plugins: [
            resolve(),
            typescript(), // Convert TypeScript to JavaScript
        ],
    },
];
