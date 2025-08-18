import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateHTML, writeHTML } from '../scripts/ssg-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Vite插件
export function ssgDevPlugin() {
  return {
    name: 'ssg-dev',
    configureServer(server) {
      // 监听JSON文件变化
      const dataPath = path.join(projectRoot, 'src/data.json');
      const templatePath = path.join(projectRoot, 'src/template.html');
      
      function regenerateHTML() {
        try {
          const html = generateHTML();
          const outputPath = path.join(projectRoot, 'index.html');
          writeHTML(html, outputPath);
          console.log('🔄 HTML已重新生成');
          
          // 触发浏览器刷新
          server.ws.send({
            type: 'full-reload'
          });
        } catch (error) {
          console.error('❌ HTML生成失败:', error.message);
        }
      }
      
      // 监听文件变化
      server.watcher.add([dataPath, templatePath]);
      server.watcher.on('change', (file) => {
        if (file === dataPath || file === templatePath) {
          console.log(`📝 检测到文件变化: ${path.basename(file)}`);
          regenerateHTML();
        }
      });
      
      console.log('🚀 SSG开发模式已启用，监听JSON和模板文件变化');
    }
  };
}