/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lhogqynmbdmlxhbrmrke.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // Transpile packages that need it
  transpilePackages: ['lucide-react'],
};

module.exports = nextConfig;
