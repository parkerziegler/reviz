// @ts-check

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  transpilePackages: ['@reviz/compiler', '@reviz/ui'],
};
