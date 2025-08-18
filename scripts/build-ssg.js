import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateHTML, writeHTML } from './ssg-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// 主函数
function main() {
  try {
    console.log('🚀 开始生成静态页面...');
    
    // 备份原始文件
    const outputPath = path.join(projectRoot, 'index.html');
    const backupPath = path.join(projectRoot, 'index.html.backup');
    if (fs.existsSync(outputPath)) {
      fs.copyFileSync(outputPath, backupPath);
      console.log('📦 已备份原始 index.html');
    }
    
    const html = generateHTML();
    writeHTML(html, outputPath);
    
    console.log('✅ 静态页面生成完成！');
    console.log(`📄 输出文件: ${outputPath}`);
    
  } catch (error) {
    console.error('❌ 生成失败:', error.message);
    process.exit(1);
  }
}

main();