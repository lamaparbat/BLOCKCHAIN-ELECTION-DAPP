/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['storage.googleapis.com'],
  },
  i18n: {
    locales: ['en', 'ne'],
    defaultLocale: 'en',
  }
}

module.exports = nextConfig
