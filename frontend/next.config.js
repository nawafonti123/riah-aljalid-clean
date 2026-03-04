/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // ✅ القديم (لو عندك روابط قديمة /uploads)
      {
        protocol: 'https',
        hostname: 'riah-backend.onrender.com',
        pathname: '/uploads/**',
      },
      // ✅ الجديد: Cloudinary
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;