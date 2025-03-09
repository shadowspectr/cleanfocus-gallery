
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  type?: string;
  name?: string;
  canonicalUrl?: string;
}

const SEO = ({
  title = "Clean Pro - Профессиональная химчистка мебели и ковров",
  description = "Профессиональная химчистка мебели, диванов, ковров и матрасов в вашем городе. Безопасные средства, качественный результат и доступные цены.",
  type = "LocalBusiness",
  name = "Clean Pro",
  canonicalUrl = "https://cleanpro-example.com"
}: SEOProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    "name": name,
    "description": description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ваш город",
      "addressRegion": "Регион"
    },
    "telephone": "+7 (XXX) XXX-XX-XX",
    "email": "info@example.com",
    "priceRange": "$$",
    "openingHours": "Mo-Fr 09:00-19:00",
    "image": "https://cleanpro-example.com/og-image.png",
    "url": canonicalUrl,
    "serviceType": "Химчистка мебели и ковров"
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Химчистка",
    "provider": {
      "@type": "LocalBusiness",
      "name": name
    },
    "areaServed": "Ваш город",
    "description": description,
    "offers": {
      "@type": "Offer",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "RUB"
      }
    }
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
