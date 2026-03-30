import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';

export default defineConfig([
  // ESM build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.mjs',
      format: 'es',
      sourcemap: true,
    },
    external: [],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './dist',
        rootDir: './src',
      }),
    ],
  },
  // CommonJS build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    external: [],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        rootDir: './src',
      }),
    ],
  },
]);