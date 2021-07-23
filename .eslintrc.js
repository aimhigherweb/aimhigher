module.exports = {
	extends: [`airbnb-base`],
	plugins: [
		`import`,
		`react`,
		`simple-import-sort`,
		`node`,
		`promise`,
		`babel`
	],
	parser: `@babel/eslint-parser`,
	parserOptions: {
		requireConfigFile: false,
	},
	rules: {
		'linebreak-style': 0,
		'no-tabs': 0,
		camelcase: 0,
		indent: [
			`error`,
			`tab`,
			{
				SwitchCase: 1,
				VariableDeclarator: 1
			}
		],
		'arrow-spacing': [`error`, { before: true, after: true }],
		'comma-dangle': [
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
		'one-var': [`error`, { initialized: `never`, uninitialized: `consecutive` }],
		quotes: [`error`, `backtick`],
		'no-param-reassign': 0,
		'react/jsx-uses-react': `error`,
		'react/jsx-uses-vars': `error`,
		'react/jsx-indent': [
			2,
			`tab`,
			{
				checkAttributes: true,
				indentLogicalExpressions: true
			}
		],
		// 'react/jsx-indent-props': [
		// 	2,
		// 	`tab`,
		// 	{
		// 		indentMode: 2,
		// 		ignoreTernaryOperator: true
		// 	}
		// ],
		'class-methods-use-this': 0,
		"simple-import-sort/imports": `error`,
		"sort-imports": `off`,
		"import/first": `error`,
		"import/newline-after-import": `error`,
		"import/no-duplicates": `error`
	}
};
