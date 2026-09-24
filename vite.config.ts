import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function uploadPortraitPlugin(): Plugin {
  return {
    name: 'upload-portrait-plugin',
    configureServer(server) {
      server.middlewares.use('/api/upload-portrait', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', () => {
          try {
            const { filename, dataUrl } = JSON.parse(body);
            if (!filename || !dataUrl) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'filename and dataUrl required' }));
              return;
            }

            const cleanFilename = path.basename(filename);
            const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');

            const targetDir = path.resolve('public/assets/portraits');
            if (!fs.existsSync(targetDir)) {
              fs.mkdirSync(targetDir, { recursive: true });
            }

            const targetPath = path.join(targetDir, cleanFilename);
            fs.writeFileSync(targetPath, buffer);

            const distDir = path.resolve('dist/assets/portraits');
            if (fs.existsSync(distDir)) {
              fs.writeFileSync(path.join(distDir, cleanFilename), buffer);
            }

            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, filename: cleanFilename }));
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), uploadPortraitPlugin()],
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve('index.html'),
          explore: path.resolve('explore.html'),
          creatures: path.resolve('creatures.html'),
          pantheons: path.resolve('pantheons.html'),
          timeline: path.resolve('timeline.html'),
          connections: path.resolve('connections.html'),
          about: path.resolve('about.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
