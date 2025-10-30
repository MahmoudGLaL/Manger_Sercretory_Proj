/** @type {import('next').NextConfig} */
const nextConfig = {
  // typescript: {
  //   ignoreBuildErrors: true, // ✅ Disable TypeScript type checking
  // },
  // eslint: {
  //   ignoreDuringBuilds: true, // ✅ Disable ESLint during builds
  // },
  // webpack: (config, { dev }) => {
  //   if (dev) {
  //     // Modify Webpack's watchOptions for development mode
  //     config.watchOptions = {
  //       poll: 1000, // Optional: Use polling for file watching
  //       aggregateTimeout: 300, // Delay after change before recompiling
  //     };
  //   }

  //   return config;
  // },

  
  // webpack: (config) => {
  //   config.snapshot = {
  //     ...config.snapshot,
  //     managedPaths: [],
  //   };
  //   return config;
  // },
  env: {
    NEXT_PUBLIC_SOCKET_URL: 'ws://128.16.66.169:7272', // WebSocket URL
  },
};

export default nextConfig;
