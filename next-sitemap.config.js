/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/', '/_next/', '/assets/'] },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    const priorityMap = {
      '/zh': 1.0,
      '/en': 1.0,
      '/zh/projects': 0.9,
      '/en/projects': 0.9,
      '/zh/contact': 0.7,
      '/en/contact': 0.7,
    };

    const changeFreqMap = {
      '/zh': 'weekly',
      '/en': 'weekly',
      '/zh/projects': 'weekly',
      '/en/projects': 'weekly',
    };

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';

    return {
      loc: `${siteUrl}${path}`,
      changefreq: changeFreqMap[path] || 'monthly',
      priority: priorityMap[path] || 0.5,
      lastmod: new Date().toISOString(),
    };
  },
};