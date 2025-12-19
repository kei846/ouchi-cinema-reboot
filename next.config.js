/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
      // よく使われるOGP画像のドメインを具体的に指定
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'ogp.me',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 's.yimg.jp', // Yahoo! JapanのOGP画像など
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'prtimes.jp', // PR TimesのOGP画像など
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'assets.st-note.com', // noteのOGP画像など
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com', // AmazonのOGP画像など
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io', // microCMSのOGP画像など
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-ak.f.st-hatena.com', // はてなブログのOGP画像など
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com', // Google Cloud StorageのOGP画像など
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // CloudinaryのOGP画像など
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com', // YouTubeのサムネイル画像
        port: '',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
