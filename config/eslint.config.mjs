// Based on the house ESLint config (github.com/amykapernick/house/blob/prod/config/eslint.config.mjs),
// swapped from Svelte/TypeScript to Astro/JavaScript.
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import astro from 'eslint-plugin-astro';
import importX from 'eslint-plugin-import-x';
import globals from 'globals';

const houseRules = {
	'@stylistic/indent': [
		`error`,
		`tab`,
		{
			SwitchCase: 1,
			VariableDeclarator: 1,
		},
	],
	'@stylistic/arrow-spacing': [
		`error`,
		{
			before: true,
			after: true,
		},
	],
	'@stylistic/comma-dangle': [
		`error`,
		{
			objects: `only-multiline`,
			arrays: `only-multiline`,
			imports: `never`,
			exports: `never`,
			functions: `never`,
		},
	],
	'no-var': `error`,
	'no-unused-vars': 1,
	'one-var': [`error`, `never`],
	'@stylistic/quotes': [`error`, `backtick`],
	'no-param-reassign': 0,
	'class-methods-use-this': 0,
	'import-x/order': [
		`error`,
		{
			groups: [
				`builtin`,
				`external`,
				`internal`,
				`parent`,
				`sibling`,
				`index`,
				`object`,
				`type`,
			],
		},
	],
	'@stylistic/brace-style': [`error`, `stroustrup`],
};

export default [
	{
		ignores: [`node_modules/**`, `dist/**`, `.astro/**`, `.netlify/**`, `config/_.stylelintrc.js`],
	},
	js.configs.recommended,
	{
		files: [`**/*.js`, `**/*.cjs`, `**/*.mjs`],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		plugins: {
			'import-x': importX,
			'@stylistic': stylistic,
		},
		rules: houseRules,
	},
	...astro.configs.recommended,
	{
		files: [`**/*.astro`],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		plugins: {
			'import-x': importX,
			'@stylistic': stylistic,
		},
		rules: {
			...houseRules,
			// Template expressions in .astro markup don't follow script indentation
			'@stylistic/indent': `off`,
		},
	},
];
