/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable no-console */

const fs = require('node:fs');
const path = require('node:path');

console.log('🔄 Adding React imports to .tsx files with JSX...');

function addReactImport(dir) {
	const files = fs.readdirSync(dir);

	for (const file of files) {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			addReactImport(filePath);
		} else if (file.endsWith('.tsx')) {
			let content = fs.readFileSync(filePath, 'utf8');
			// Verificar si ya tiene import de React
			const hasReactImport = /import\s+React(\s+,|\s+from)/.test(content);

			// Detectar JSX más precisamente
			const jsxPatterns = [
				/<[A-Z][a-zA-Z0-9]*/, // Componentes React <Component>
				/<[a-z]+\s+[^>]*>/, // Elementos HTML con atributos <div className="">
				/<[a-z]+>/, // Elementos HTML simples <div>
				/React\.createElement/, // Si ya usa React.createElement
				/return\s*\([\s\n]*</, // return con JSX
				/=>\s*</, // Arrow function que retorna JSX
			];

			const hasJSX = jsxPatterns.some((pattern) => pattern.test(content));

			if (!hasReactImport && hasJSX) {
				// Encontrar la mejor posición para el import
				const lines = content.split('\n');
				let insertIndex = 0;
				let foundFirstImport = false;

				for (const [index, line_] of lines.entries()) {
					const line = line_.trim();

					// Saltar comentarios de licencia/header
					if (
						line.startsWith('//') ||
						line.startsWith('/*') ||
						line === ''
					) {
						continue;
					}

					// Si encontramos el primer import, insertar antes
					if (line.startsWith('import') && !foundFirstImport) {
						insertIndex = index;
						foundFirstImport = true;

						break;
					}

					// Si no hay imports y encontramos código, insertar al inicio
					if (line.length > 0 && !foundFirstImport) {
						insertIndex = index;

						break;
					}
				}

				// Insertar el import de React
				lines.splice(insertIndex, 0, "import React from 'react';");

				// Si insertamos antes de otros imports, agregar línea vacía
				if (
					foundFirstImport &&
					insertIndex < lines.length - 1 && // No agregar línea extra si ya hay una
					lines[insertIndex + 1].trim() !== ''
				) {
					lines.splice(insertIndex + 1, 0, '');
				}

				content = lines.join('\n');
				fs.writeFileSync(filePath, content);
				console.log(
					`✅ Added React import to: ${path.relative('./src', filePath)}`,
				);
			} else if (hasReactImport) {
				console.log(
					`⏭️  ${path.relative('./src', filePath)} already has React import`,
				);
			} else {
				console.log(
					`⏭️  ${path.relative('./src', filePath)} doesn't contain JSX`,
				);
			}
		}
	}
}

// Procesar todos los archivos .tsx en src
addReactImport('./src');

console.log('✅ React imports processing completed!');
