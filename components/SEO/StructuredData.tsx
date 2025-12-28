interface StructuredDataProps {
  type: 'WebApplication' | 'FAQPage' | 'Organization';
  data: Record<string, any>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getSchema = () => {
    switch (type) {
      case 'WebApplication':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: data.name || 'Internet Speed Test',
          description: data.description || 'Professional internet speed testing tool',
          url: data.url || 'https://example.com',
          applicationCategory: 'UtilityApplication',
          operatingSystem: 'Web Browser',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          ...data,
        };
      case 'FAQPage':
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: data.faqs || [],
        };
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: data.name || 'SpeedTest',
          url: data.url || 'https://example.com',
          ...data,
        };
      default:
        return {};
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getSchema()) }}
    />
  );
}
