// // @ts-check

// /**
//  * @type {import('next').NextConfig}
//  **/
// module.exports = {
//   reactStrictMode: true,
//   swcMinify: true,
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  swcMinify: true,
  env: {
    ROOT: __dirname,
  },
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.plugins.push(
        new webpack.ProvidePlugin({
          global: "global"
        })
      )
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        buffer: require.resolve("buffer"),
        global: require.resolve("global"),
        readline: require.resolve("readline"),
      }
      return config
    }
    return config
  }
}
module.exports = nextConfig