import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://justgomarket.com.br',
    output: 'static',
    srcDir: './src',
    publicDir: './public',
    outDir: './dist',
    trailingSlash: 'ignore',
    build: {
        format: 'file',
        assets: 'site-assets',
    },
    integrations: [
        sitemap({
            filter: (page) => !page.includes('/404'),
        }),
    ],
    image: {
        domains: ['justgomarket.com.br'],
    },

    vite: {
        css: {
            devSourcemap: true,
        },
    },
});
