/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable unicorn/no-process-exit */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable no-console */
/* eslint-disable unicorn/prefer-module */
const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

console.log('🔄 Converting TypeScript to JavaScript...');

// Paso 1: Limpiar directorio de salida
if (fs.existsSync('./dist-js')) {
	fs.rmSync('./dist-js', { recursive: true, force: true });
}

// Paso 2: Ejecutar TypeScript compiler
try {
	execSync('npx tsc --project tsconfig.build.json', { stdio: 'inherit' });
	console.log('✅ TypeScript compilation completed');
} catch {
	console.error('❌ TypeScript compilation failed');
	process.exit(1);
}

// Paso 3: Procesar archivos y renombrar .tsx -> .jsx
function processJSFiles(dir, srcDir = './src') {
	const files = fs.readdirSync(dir);

	for (const file of files) {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			processJSFiles(filePath, srcDir);
		} else if (file.endsWith('.js')) {
			// Determinar si el archivo original era .tsx
			const relativePath = path.relative('./dist-js', filePath);
			const originalTSPath = path.join(
				srcDir,
				relativePath.replace('.js', '.tsx'),
			);
			const originalTSExists = fs.existsSync(originalTSPath);
			let content = fs.readFileSync(filePath, 'utf8');

			// Limpiar imports de tipos
			content = content.replaceAll(
				/import\s+type\s+.*?from\s+.*?;?\n/g,
				'',
			);
			content = content.replaceAll(
				/import\s+.*?\s+type\s+.*?from\s+.*?;?\n/g,
				'',
			);

			// Limpiar path aliases (convertir a rutas relativas)
			content = content.replaceAll(
				/from\s+['"]@\/([^'"]*)['"]/g,
				(match, p1) => {
					const currentDir = path.dirname(filePath);
					const targetPath = path.join('./dist-js', p1);
					const relativePath = path.relative(currentDir, targetPath);

					return `from './${relativePath.replaceAll('\\', '/')}'`;
				},
			);

			// Actualizar imports internos para usar extensiones .jsx
			content = content.replaceAll(
				/from\s+['"](\.[^'"]*)['"]/g,
				(match, p1) => {
					// Si la ruta importada existe como .jsx, actualizarla
					const importPath = path.resolve(path.dirname(filePath), p1);
					const jsxPath = `${importPath}.jsx`;

					if (fs.existsSync(jsxPath) || p1.includes('/')) {
						return match.replace(p1, `${p1}.jsx`);
					}

					return match;
				},
			);

			// Otras limpiezas
			content = content.replaceAll(/\/\*\* @type.*?\*\//g, '');

			// ✅ Si el archivo original era .tsx, renombrarlo a .jsx
			if (originalTSExists) {
				const newFilePath = filePath.replace('.js', '.jsx');

				fs.writeFileSync(newFilePath, content);
				fs.unlinkSync(filePath); // Eliminar el archivo .js
				console.log(
					`✅ Converted: ${file} -> ${path.basename(newFilePath)}`,
				);
			} else {
				// Mantener como .js si era originalmente .ts
				fs.writeFileSync(filePath, content);
				console.log(`✅ Processed: ${file}`);
			}
		}
	}
}

// Paso 4: Procesar archivos JS generados
processJSFiles('./dist-js');

// Paso 5: Actualizar imports en todos los archivos para referenciar .jsx
function updateImports(dir) {
	const files = fs.readdirSync(dir);

	for (const file of files) {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			updateImports(filePath);
		} else if (file.endsWith('.js') || file.endsWith('.jsx')) {
			let content = fs.readFileSync(filePath, 'utf8');

			// Actualizar imports que ahora deben apuntar a .jsx
			content = content.replaceAll(
				/from\s+['"](\.[^'"]*?)['"](?!\.jsx)/g,
				(match, importPath) => {
					const fullImportPath = path.resolve(
						path.dirname(filePath),
						importPath,
					);
					const jsxExists = fs.existsSync(`${fullImportPath}.jsx`);
					const jsExists = fs.existsSync(`${fullImportPath}.js`);

					if (jsxExists) {
						return `from '${importPath}.jsx'`;
					}

					if (jsExists) {
						return `from '${importPath}.js'`;
					}

					return match;
				},
			);

			fs.writeFileSync(filePath, content);
		}
	}
}

updateImports('./dist-js');

console.log('✅ Conversion completed! Check ./dist-js directory');
console.log('📁 .tsx files converted to .jsx');
console.log('📁 .ts files converted to .js');
