// Schema.org Data Generators — Just Go Market

export interface FAQItem {
    question: string;
    answer: string;
}

export interface BreadcrumbItem {
    name: string;
    url: string;
}

export function organizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'Just Go Market',
        'alternateName': 'Just Go Market - Mercado Autônomo para Condomínios',
        'url': 'https://www.justgomarket.com.br',
        'logo': 'https://www.justgomarket.com.br/assets/images/just-go-market-logo-mercado-autonomo.png',
        'description': 'Mercado autônomo premium para condomínios em Brasília e DF. Instalação gratuita, operação 24h.',
        'telephone': '+5561999918007',
        'email': 'justgomarket@justgomarket.com.br',
        'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'Brasília',
            'addressRegion': 'DF',
            'postalCode': '70000-000',
            'addressCountry': 'BR',
        },
        'areaServed': [
            { '@type': 'City', 'name': 'Brasília' },
            { '@type': 'City', 'name': 'Águas Claras' },
            { '@type': 'City', 'name': 'Taguatinga' },
            { '@type': 'City', 'name': 'Valparaíso de Goiás' },
        ],
        'sameAs': [],
        'foundingLocation': {
            '@type': 'Place',
            'name': 'Brasília, DF',
        },
    };
}

export function localBusinessSchema(city?: string, coords?: { lat: number; lng: number }) {
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': `Just Go Market — Mercado Autônomo${city ? ` em ${city}` : ''}`,
        'image': 'https://www.justgomarket.com.br/assets/images/mini-mercado-autonomo-condominio-brasilia.jpg',
        '@id': 'https://www.justgomarket.com.br',
        'url': 'https://www.justgomarket.com.br',
        'telephone': '+5561999918007',
        'address': {
            '@type': 'PostalAddress',
            'addressLocality': city || 'Brasília',
            'addressRegion': 'DF',
            'addressCountry': 'BR',
        },
        ...(coords && {
            'geo': {
                '@type': 'GeoCoordinates',
                'latitude': coords.lat,
                'longitude': coords.lng,
            },
        }),
        'areaServed': city || 'Brasília',
        'description': `Mini mercado autônomo premium para condomínios${city ? ` em ${city}` : ''}. Instalação gratuita e operação 24h.`,
        'openingHoursSpecification': {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            'opens': '00:00',
            'closes': '23:59',
        },
        'priceRange': '$$',
    };
}

export function serviceSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': 'Mercado Autônomo para Condomínios',
        'provider': {
            '@type': 'Organization',
            'name': 'Just Go Market',
        },
        'description': 'Instalação e operação completa de minimercado autônomo premium em condomínios. Custo zero para o condomínio, tecnologia Scan & Go, adega gourmet e operação 24 horas.',
        'areaServed': {
            '@type': 'State',
            'name': 'Distrito Federal',
        },
        'serviceType': 'Mercado Autônomo para Condomínios',
        'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'BRL',
            'description': 'Instalação e implantação gratuita',
        },
    };
}

export function faqPageSchema(faqs: FAQItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map((faq) => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.answer,
            },
        })),
    };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': items.map((item, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'name': item.name,
            'item': item.url,
        })),
    };
}
