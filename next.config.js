/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Disable Turbopack for now (webpack config compatibility)
  turbopack: {},
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Experimental features
  experimental: {
    // optimizePackageImports: ['lucide-react'],
  },
  
  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.pdf',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'application/pdf',
          },
        ],
      },
    ];
  },
  
  // Redirects (if needed)
  async redirects() {
    return [
      // Redirect root to default locale
      {
        source: '/',
        destination: '/zh',
        permanent: true,
      },
    ];
  },
  
  // Webpack configuration (for PDF handling)
  webpack: (config, { isServer }) => {
    // Handle PDF files
    config.module.rules.push({
      test: /\.(pdf)$/,
      type: 'asset/resource',
      generator: {
        filename: 'assets/papers/[name][ext]',
      },
    });
    
    return config;
  },
};

module.exports = nextConfig;