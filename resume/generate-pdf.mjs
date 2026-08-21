import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = resolve(__dirname, 'resume.html');
const outputPath = resolve(__dirname, '../public/assets/Joshua-Brenneman-Resume.pdf');

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();

await page.goto(`file://${inputPath}`, { waitUntil: 'networkidle0' });
await page.pdf({
  path: outputPath,
  format: 'Letter',
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});

await browser.close();
console.log(`PDF generated: ${outputPath}`);
