import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// 加载数据文件
export function loadData() {
  const dataPath = path.join(projectRoot, 'src/data.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  return data;
}

// 加载模板文件
export function loadTemplate() {
  const templatePath = path.join(projectRoot, 'src/template.html');
  return fs.readFileSync(templatePath, 'utf-8');
}

// 生成文章列表HTML
export function generateArticlesList(articles) {
  return articles.map((article, index) => {
    return `
                  <section class="mb-4">
                    <div class="text-blue-600 hover:text-blue-700 transition-all duration-300 hover:-translate-y-1 hover:underline">
                      <span class="text-base sm:text-xl inline-flex items-center gap-1 font-mono">${index + 1}. </span>
                      <a
                        href="${article.url}"
                        class="text-base sm:text-xl inline-flex items-center gap-1"
                        target="_blank"
                      >
                          <span>${article.title}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                      </a>
                    </div>
                    <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">${article.date}</p>
                  </section>`;
  }).join('');
}

// 生成完整的HTML
export function generateHTML() {
  const data = loadData();
  const template = loadTemplate();
  
  const articlesList = generateArticlesList(data.articles);
  
  const html = template
    .replace('{{SITE_TITLE}}', data.site.title)
    .replace('{{SITE_SUBTITLE}}', data.site.subtitle)
    .replace('{{SITE_DESCRIPTION}}', data.site.description)
    .replace('{{ARTICLES_LIST}}', articlesList);
  
  return html;
}

// 写入HTML文件
export function writeHTML(html, outputPath = null) {
  const finalOutputPath = outputPath || path.join(projectRoot, 'index.html');
  fs.writeFileSync(finalOutputPath, html, 'utf-8');
  return finalOutputPath;
}