// SEO Utility Library — Just Go Market
// Generates consistent, keyword-driven SEO metadata

export interface SEOProps {
    title?: string;
    description?: string;
    canonical?: string;
    ogImage?: string;
    ogType?: string;
    city?: string;
    noindex?: boolean;
}

const BRAND = 'Just Go Market';
const BRAND_SUFFIX = 'Mercado Autônomo para Condomínios';
const DEFAULT_DESCRIPTION = 'Mercado autônomo premium para condomínios em Brasília e DF. Instalação gratuita, operação 24h, custo zero para o condomínio. Tecnologia Scan & Go.';
const DEFAULT_OG_IMAGE = 'https://justgomarket.com.br/assets/images/mini-mercado-autonomo-condominio-brasilia.jpg';
const SITE_URL = 'https://justgomarket.com.br';

export function generateTitle(title?: string, city?: string): string {
    if (title) {
        const cityPart = city ? ` em ${city}` : '';
        return `${title}${cityPart} | ${BRAND} — ${BRAND_SUFFIX}`;
    }
    return `${BRAND} — ${BRAND_SUFFIX} | Brasília e DF`;
}

export function generateDescription(description?: string): string {
    return description || DEFAULT_DESCRIPTION;
}

export function generateCanonical(path: string): string {
    // Remove query params e hashes
    const pathWithoutQuery = path.split('?')[0].split('#')[0];

    // Remove index.html e .html
    let cleanPath = pathWithoutQuery
        .replace(/\/index\.html$/, '')
        .replace(/\.html$/, '');

    // Assegura trailing slash (comportamento nativo de diretórios)
    if (!cleanPath.endsWith('/')) {
        cleanPath = `${cleanPath}/`;
    }

    if (cleanPath === '' || cleanPath === '/') {
        return `${SITE_URL}/`;
    }

    return `${SITE_URL}${cleanPath}`;
}

export function generateOGImage(ogImage?: string): string {
    return ogImage || DEFAULT_OG_IMAGE;
}

export interface FullSEO {
    title: string;
    description: string;
    canonical: string;
    ogImage: string;
    ogType: string;
    noindex: boolean;
}

export function buildSEO(props: SEOProps, currentPath: string): FullSEO {
    return {
        title: generateTitle(props.title, props.city),
        description: generateDescription(props.description),
        canonical: props.canonical || generateCanonical(currentPath),
        ogImage: generateOGImage(props.ogImage),
        ogType: props.ogType || 'website',
        noindex: props.noindex || false,
    };
}

export { BRAND, BRAND_SUFFIX, SITE_URL, DEFAULT_OG_IMAGE };
