import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://justgomarket.com.br',
    output: 'static',
    srcDir: './src',
    publicDir: './public',
    outDir: './dist',
    trailingSlash: 'never',
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
    redirects: {
        '/sobre.html': { status: 301, destination: '/sobre' },
        '/privacidade.html': { status: 301, destination: '/privacidade' },
        '/termos.html': { status: 301, destination: '/termos' },
        '/calculadora-roi': { status: 301, destination: '/diagnostico-condominio' },
        '/cases': { status: 301, destination: '/como-funciona-na-pratica' },
    },
    vite: {
        css: {
            devSourcemap: true,
        },
    },
});
