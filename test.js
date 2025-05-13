/* eslint-disable no-console */
import path from 'path';
import {fileURLToPath} from 'url';
import fs from 'fs';
import chalk from 'chalk';

//获取当前文件的目录路径，既可以在cjs模块也可以在ESM模块下运行
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//读取package.json函数
function readPackageJson(filePath) {
	try {
		const jsonData = fs.readFileSync(filePath, 'utf-8');
		return JSON.parse(jsonData);
	} catch (error) {
		console.error(`读取文件失败${filePath}`, error);
		return null;
	}
}

//修改后的比较依赖函数
function compareDependencies(rootDeps, childDeps, depType) {
	const overlaps = [];
	for (const [dep, version] of Object.entries(childDeps)) {
		if (rootDeps[dep]) {
			const versionCompare = rootDeps[dep] === version;
			overlaps.push(
				`${dep}: ${chalk.blueBright(version)} (在根目录中为: ${chalk.blueBright(rootDeps[dep])}) ${versionCompare ? chalk.green('✔') : chalk.red('✘')}`,
			);
		}
	}
	return {
		overlaps:
			overlaps.length > 0
				? `${chalk.greenBright('- 重叠的', depType)}\n` +
					overlaps.join('\n') +
					'\n\n'
				: '',
	};
}
function main() {
	const rootPackageJsonPath = path.join(__dirname, 'package.json');
	const rootPackageJson = readPackageJson(rootPackageJsonPath);
	if (!rootPackageJson) {
		console.error('无法读取根目录的 package.json 文件');
		return;
	}

	// 修改输出为终端输出，使用 chalk 增加颜色
	console.log(chalk.bold('📖 依赖分析报告\n'));

	const packagesDir = path.join(__dirname, 'packages');
	const childDirs = fs
		.readdirSync(packagesDir)
		.filter((child) =>
			fs.statSync(path.join(packagesDir, child)).isDirectory(),
		);

	for (const child of childDirs) {
		const childPackageJsonPath = path.join(
			packagesDir,
			child,
			'package.json',
		);
		const childPackageJson = readPackageJson(childPackageJsonPath);
		if (childPackageJson) {
			console.log(chalk.bold(`🟢 子项目 ${child}`));
			['dependencies', 'devDependencies', 'peerDependencies'].forEach(
				(depType) => {
					const {overlaps} = compareDependencies(
						rootPackageJson[depType] || {},
						childPackageJson[depType] || {},
						depType,
						child,
					);
					console.log(overlaps);
				},
			);
		}
	}
}

main();
