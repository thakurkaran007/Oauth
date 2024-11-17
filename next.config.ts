import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Add custom rules for handling .html files
    config.module.rules.push({
      test: /\.html$/,
      use: ['html-loader'],
      exclude: /node_modules/,
    });

    // Ignore .html files in node_modules
    config.module.rules.push({
      test: /index\.html$/,
      use: 'ignore-loader',
    });

    return config;
  },

};

export default nextConfig;
