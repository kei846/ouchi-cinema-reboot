/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // 一時的にワイルドカードに変更
        port: '',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
