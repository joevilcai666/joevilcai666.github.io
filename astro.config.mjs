import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 用户站点仓库 joevilcai666.github.io → base 用 '/'，网址即 https://joevilcai666.github.io/
// 若以后改为项目仓库（<用户名>.github.io/<仓库名>），把 base 改成 '/<仓库名>'
export default defineConfig({
  site: 'https://joevilcai666.github.io',
  base: '/',
  integrations: [sitemap()],
});
