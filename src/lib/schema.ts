import { site } from '../config/site';

/** Organization / LocalBusiness del proveedor. Los campos de local (geo, horario) solo van con LocalBusiness. */
export function businessSchema(): Record<string, unknown> {
  const isLocal = site.schemaType === 'LocalBusiness';
  return {
    '@context': 'https://schema.org',
    '@type': site.schemaType,
    '@id': `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/favicon.svg`,
    image: `${site.url}/og.png`,
    description: site.description,
    telephone: site.phoneHref,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: site.email,
      telephone: site.phoneHref,
      areaServed: 'MX',
      availableLanguage: ['es', 'en'],
    },
    areaServed: site.areaServed.map((name) => ({ '@type': 'State', name })),
    knowsAbout: [...site.processes.map((p) => p.title), ...site.industries.map((i) => `Industria ${i.title.toLowerCase()}`)],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de maquinado',
      itemListElement: site.processes.map((p) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: p.title, description: p.description },
      })),
    },
    ...(isLocal
      ? {
          geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
          openingHoursSpecification: site.hours.map((h) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: h.schema,
            opens: h.open,
            closes: h.close,
          })),
        }
      : {}),
    ...(site.social.length ? { sameAs: site.social.map((s) => s.href) } : {}),
  };
}

export function faqSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: site.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: site.locale,
    publisher: { '@id': `${site.url}/#organization` },
  };
}
