
import { useEffect, useState } from 'react';

// This is a client-side representation of the sitemap
// In a production environment, the sitemap would typically be generated server-side
const SiteMap = () => {
  const [xml, setXml] = useState<string>('');

  useEffect(() => {
    // Create a simple XML sitemap
    const urls = [
      'https://cleanpro-example.com/',
      'https://cleanpro-example.com/admin',
      // Add any additional URLs here
    ];

    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${url === 'https://cleanpro-example.com/' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

    setXml(xmlContent);
    
    console.log('Sitemap generated client-side (for demonstration purposes)');
  }, []);

  return (
    <div>
      {xml && (
        <pre className="hidden">
          {xml}
        </pre>
      )}
    </div>
  );
};

export default SiteMap;
