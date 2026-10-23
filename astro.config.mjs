// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Custom domain getdoubleup.com is served at the site root.
export default defineConfig({
	site: 'https://getdoubleup.com',
	base: '/',
	trailingSlash: 'always',
	integrations: [
		sitemap({
			// Terms of Use and Privacy Policy are linked for merchants but should not be indexed.
			filter: (page) => {
				const { pathname } = new URL(page);
				return pathname !== '/terms/' && pathname !== '/privacy/';
			},
		}),
	],
});
