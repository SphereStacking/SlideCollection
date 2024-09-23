import { defineConfig } from 'vite';
import { config as dotenvConfig } from 'dotenv';

// 環境変数を読み込む
dotenvConfig();

export default defineConfig({
  define: {
    'process.env': {
      VITE_COMPANY_NAME_1: process.env.VITE_COMPANY_NAME_1,
      VITE_COMPANY_NAME_2: process.env.VITE_COMPANY_NAME_2,
    },
  },
});
