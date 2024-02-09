/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (
    config,
   
  ) => {
    config.externals.push({ canvas: 'commonjs canvas' })
    return config
  },
};

module.exports = nextConfig;
