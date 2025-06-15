module.exports = {
	ci: {
		upload: {
			target: 'temporary-public-storage',
		},
		assert: {
			preset: 'lighthouse:no-pwa',
			assertions: {
				// Desactivado de forma momentanea hasta que terminemos el
				// proyecto o por lo menos la base del mismo.
				// Hay que eliminar estas reglas una vez esté terminado el
				// proyecto o por lo menos la base del mismo.
				'target-size': 'warn',
				'uses-rel-preconnect': 'warn',
				'meta-description': 'warn',
				'uses-responsive-images': 'warn',
				'prioritize-lcp-image': 'warn',
				'image-size-responsive': 'warn',
				label: 'warn',
				// Performance related
				'unused-javascript': 'warn',
				// Not performance related (Accessibility)
				// 'tap-targets': 'off',
				// 'non-composited-animations': 'off',
				// 'button-name': 'off',
				// 'color-contrast': 'off',
				// 'csp-xss': 'off',
				// 'errors-in-console': 'off',
				// 'external-anchors-use-rel-noopener': 'off',
				// 'heading-order': 'off',
				// 'link-name': 'off',
				// 'meta-description': 'off',
				// 'uses-text-compression': 'off',
			},
		},
	},
};
