module.exports = {
	parser: '@typescript-eslint/parser',

	plugins: [
		'@typescript-eslint/eslint-plugin',
		'sonarjs',
		'unicorn',
		'react-native',
		'jsx-a11y',
		'react',
		'jsx-expressions'
	],
	extends: [
		'airbnb-typescript',
		'plugin:unicorn/all',
		'plugin:sonarjs/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:react/recommended',
		'plugin:react-native/all',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/strict',
		'plugin:@typescript-eslint/stylistic',
		'plugin:@typescript-eslint/stylistic-type-checked',
		'plugin:@typescript-eslint/strict-type-checked'
	],
	root: true,
	ignorePatterns: ['*.js'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		project: './tsconfig.base.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module'
	},
	rules: {
		'spaced-comment': ['off'],
		'@typescript-eslint/no-unsafe-call': 'off',
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',
		'unicorn/explicit-length-check': 'off',
		'@typescript-eslint/prefer-as-const': 'off',
		'@typescript-eslint/no-redundant-type-constituents': 'off',
		'unicorn/no-keyword-prefix': ['off'],
		'react/jsx-curly-brace-presence': [
			'error',
			{ props: `never`, children: 'never' }
		],
		'react/jsx-props-no-spreading': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/require-default-props': [
			'error',
			{ ignoreFunctionalComponents: true }
		],
		'@typescript-eslint/quotes': ['error', 'single'],
		'@typescript-eslint/no-non-null-assertion': 'warn',
		'@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
		'@typescript-eslint/consistent-type-imports': 'error',
		'@typescript-eslint/no-duplicate-enum-values': 'error',
		'@typescript-eslint/no-duplicate-type-constituents': 'error',
		'@typescript-eslint/no-empty-interface': 'error',
		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/no-extra-non-null-assertion': 'error',
		'max-params': ['error', 4],
		complexity: ['error', 10],
		'no-nested-ternary': 'error',
		'no-unneeded-ternary': 'error',
		'jsx-expressions/strict-logical-expressions': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'react-native/no-unused-styles': 2,
		'react-native/split-platform-components': 2,
		'react-native/no-inline-styles': 1,
		'react-native/no-color-literals': 2,
		'react-native/no-single-element-style-arrays': 2,
		'max-len': [
			'error',
			{ code: 500, ignoreTemplateLiterals: true, ignoreUrls: true }
		],
		'no-param-reassign': ['error', { props: false }],
		'no-restricted-syntax': [
			'error',
			'ForInStatement',
			'LabeledStatement',
			'WithStatement'
		],
		'no-underscore-dangle': ['error', { allow: ['_isRetry', '_count'] }],
		'no-void': ['error', { allowAsStatement: true }],
		'spaced-comment': [
			'error',
			'always',
			{ line: { markers: ['*package', '!', ',', ' '] } }
		],
		'@typescript-eslint/lines-between-class-members': [
			'error',
			'always',
			{ exceptAfterSingleLine: true }
		],
		'sonarjs/cognitive-complexity': 'error',
		'sonarjs/no-identical-expressions': 'error',
		'@typescript-eslint/naming-convention': [
			'error',
			{ selector: 'default', format: null },
			{
				selector: 'variable',
				format: ['camelCase'],
				types: ['boolean', 'string', 'number']
			},
			{
				selector: 'variableLike',
				format: ['camelCase'],
				filter: {
					regex: '^_count$|^_isRetry$|^ai_request$|',
					match: false
				}
			},
			{ selector: 'parameter', format: null },
			{
				selector: 'memberLike',
				format: ['camelCase']
			},
			{
				selector: 'typeLike',
				format: ['PascalCase']
			},
			{
				selector: 'typeParameter',
				format: ['PascalCase'],
				suffix: ['Properties', 'Type', 'Enum'],
				filter: {
					regex: '^K$|^T$',
					match: false
				}
			},
			{
				selector: 'variable',
				types: ['boolean'],
				format: ['PascalCase'],
				prefix: ['is', 'should', 'has', 'can', 'did', 'will']
			},
			{ selector: 'property', format: null },
			{ selector: 'enumMember', format: null }
		],
		'unicorn/filename-case': [
			'error',
			{
				case: 'kebabCase',
				ignore: ['App.tsx', 'use']
			}
		],
		'@typescript-eslint/no-confusing-void-expression': 'off',
		'@typescript-eslint/comma-dangle': 'off',
		'@typescript-eslint/semi': 'off',
		'@typescript-eslint/unbound-method': 'off',
		'@typescript-eslint/no-misused-promises': 'off',
		'@typescript-eslint/no-shadow': 'off',
		'@typescript-eslint/no-floating-promises': 'off',
		'@typescript-eslint/indent': 'off',
		'@typescript-eslint/no-extraneous-class': 'off',
		'@typescript-eslint/consistent-type-assertions': 'off',
		'@typescript-eslint/no-unsafe-member-access': 'off',
		'@typescript-eslint/no-unnecessary-condition': 'off',
		'@typescript-eslint/consistent-type-definitions': 'off',
		'@typescript-eslint/prefer-nullish-coalescing': 'warn',
		'@typescript-eslint/no-throw-literal': 'off',
		'no-shadow': 'off',
		'no-mixed-spaces-and-tabs': 'off',
		'class-methods-use-this': 'off',
		'consistent-return': 'off',
		'newline-per-chained-call': 'off',
		'no-await-in-loop': 'off',
		'no-continue': 'off',
		'unicorn/no-null': 'off',
		'react-native/no-raw-text': 'off',
		'react/jsx-filename-extension': 'off',
		'import/no-extraneous-dependencies': 'off',
		'import/extensions': 'off'
	}
}
