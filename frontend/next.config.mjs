/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.glsl$/,
      use: 'glslify-loader',
    });

    return config;
  },
};

export default nextConfig;
