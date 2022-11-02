/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.geojson$/,
      use: ["json-loader"]
    });
    return config;
  },

}

module.exports = nextConfig
