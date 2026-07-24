import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/DMZ-Clan-Website/',
  plugins: [react()],
});
