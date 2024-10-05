import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs)$/,
      use: ['raw-loader', 'glslify-loader'],
      include: path.resolve(__dirname, 'shaders'),
    });
    return config;
  },
};

export default nextConfig;
