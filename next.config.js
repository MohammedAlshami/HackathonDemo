const CopyPlugin = require("copy-webpack-plugin");
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,

      fs: false,
    };

    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: "./node_modules/onnxruntime-web/dist/ort-wasm.wasm",
            to: "static/chunks",
          },
          {
            from: "./node_modules/onnxruntime-web/dist/ort-wasm-simd.wasm",
            to: "static/chunks",
          },
          {
            from: "./public/model",
            to: "static/chunks/app",
          },
        ],
      })
    );

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
  env: {
    solutionType: "pineapple",
    SUBDOMAIN_NAME: (() => {
      try {
        // In Node.js environment, we can use require('os').hostname()
        const os = require("os");
        const hostname =
          process.env.NEXT_PUBLIC_VERCEL_URL ||
          process.env.VERCEL_URL ||
          os.hostname() ||
          "localhost";

        const subdomain = hostname.split(".")[0];
        return subdomain === "localhost" ? "" : subdomain;
      } catch (error) {
        return "";
      }
    })(),
  },
};

module.exports = withNextIntl(nextConfig);
