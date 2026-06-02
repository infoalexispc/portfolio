import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [
    angular({
      include: ['src/**/*.ts'],
      exclude: ['node_modules/**']
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test.ts'],
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'src/main.ts',
        'src/test.ts',
        '*.config.ts',
        '**/*.module.ts'
      ]
    }
  }
});