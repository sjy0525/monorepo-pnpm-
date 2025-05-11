const OFF = 0;
const ERROR = 2;

module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'd:\\monorepo+pnpm\\my-monorepo\\tsconfig.eslint.json',
	},
	plugins: ['@typescript-eslint'],
	rules: {
		'no-var': ERROR,
		'no-tabs': OFF,
		'no-console': ERROR,
		'no-debugger': ERROR,
		'no-unused-vars': 'off', // 禁用原生规则
		'@typescript-eslint/no-unused-vars': ERROR, // 使用 TypeScript 版本
		'prefer-const': ERROR,
		// 禁用所有格式化相关规则，让 Prettier 负责
		'@typescript-eslint/comma-dangle': 'off',
		'@typescript-eslint/quotes': 'off',
		'@typescript-eslint/semi': 'off',
		'@typescript-eslint/explicit-function-return-type': OFF,
		'@typescript-eslint/indent': 'off',
		'@typescript-eslint/no-explicit-any': ERROR,
	},
	ignorePatterns: [
		'**/node_modules/**',
		'**/dist/**',
		'**/build/**',
		'**/.next/**',
		'**/coverage/**',
		'**/pnpm-lock.yaml',
		'**/package-lock.json',
		'**/yarn.lock',
		'.eslintrc.js',
	],
};
