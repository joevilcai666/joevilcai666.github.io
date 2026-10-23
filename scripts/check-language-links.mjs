import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { test } from 'node:test';

const readPage = (path) => readFile(new URL(`../dist/${path ? `${path}/` : ''}index.html`, import.meta.url), 'utf8');
const articleSlugs = async (prefix = '') => (await readdir(new URL(`../dist/${prefix}blog/`, import.meta.url), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
const articles = await articleSlugs();

for (const page of ['', 'work', 'projects', 'blog', ...articles.map((slug) => `blog/${slug}`)]) {
  for (const lang of ['zh', 'en']) {
    test(`${lang} ${page || 'home'}: language switch preserves the current page`, async () => {
      const html = await readPage(`${lang === 'en' ? 'en/' : ''}${page}`.replace(/\/$/, ''));
      const href = html.match(/<a\b[^>]*href="([^"]+)"[^>]*hreflang=/)?.[1];
      const expected = `${lang === 'zh' ? '/en' : ''}/${page}`;
      assert.ok(href, 'Missing language switch');
      assert.equal(href.replace(/\/$/, '') || '/', expected.replace(/\/$/, '') || '/');
      await readPage(expected.replace(/^\/|\/$/g, ''));
    });
  }
}

for (const lang of ['zh', 'en']) {
  const prefix = lang === 'en' ? 'en/' : '';
  test(`${lang} home: blog has a visible link`, async () => {
    const html = await readPage(prefix.replace(/\/$/, ''));
    assert.match(html, new RegExp(`<a\\b[^>]*href="/${prefix}blog/"[^>]*>`));
  });

  test(`${lang} blog: no articles remain and the empty state is visible`, async () => {
    assert.deepEqual(await articleSlugs(prefix), []);
    const html = await readPage(`${prefix}blog`);
    assert.ok(html.includes(lang === 'en' ? 'No posts yet.' : '还没有文章。'));
    assert.ok(!html.includes('class="row-link"'));
  });
}

test('RSS contains no old article entries', async () => {
  const xml = await readFile(new URL('../dist/rss.xml', import.meta.url), 'utf8');
  assert.ok(xml.includes('<rss'));
  assert.ok(!xml.includes('<item>'));
});

test('published articles have matching English versions', async () => {
  assert.deepEqual(articles, await articleSlugs('en/'));
});

test('English work page localizes the current period', async () => {
  const html = await readPage('en/work');
  assert.ok(html.includes('2025.12 — Present'));
  assert.ok(!html.includes('至今'));
});
