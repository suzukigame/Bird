const { SitemapStream, streamToPromise } = require('sitemap');
const { writeFileSync } = require('fs');
const path = require('path');

const hostname = 'https://suzukigame.github.io/Bird'; // あなたのGitHub PagesのURLに置き換えてください

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname });

  // サイトの各ページのURLを追加
  sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  sitemap.write({ url: '/collection', changefreq: 'weekly', priority: 0.8 });

  // 必要に応じて、動的に生成されるページのURLもここに追加
  // 例: 各鳥の詳細ページなど

  sitemap.end();

  try {
    const sitemapBuffer = await streamToPromise(sitemap); // ストリームからPromiseに変換
    const outputPath = path.resolve(__dirname, 'build', 'sitemap.xml');
    writeFileSync(outputPath, sitemapBuffer);
    console.log(`Sitemap generated to ${outputPath}`);
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

generateSitemap();
