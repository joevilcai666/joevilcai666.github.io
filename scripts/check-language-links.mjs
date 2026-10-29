import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { test } from 'node:test';

const readPage = (path) => readFile(new URL(`../dist/${path ? `${path}/` : ''}index.html`, import.meta.url), 'utf8');
const articleSlugs = async (prefix = '') => (await readdir(new URL(`../dist/${prefix}blog/`, import.meta.url), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
const articles = await articleSlugs();

for (const page of ['work', 'projects', 'blog', ...['origin-im', 'origin-health', 'craft', 'prose'].map(id => `projects/${id}`), ...articles.map((slug) => `blog/${slug}`)]) {
  for (const lang of ['zh', 'en']) {
    test(`${lang} ${page || 'home'}: language switch preserves the current page`, async () => {
      const html = await readPage(`${lang === 'en' ? 'en/' : ''}${page}`.replace(/\/$/, ''));
      const href = html.match(/<a\b[^>]*href="([^"]+)"[^>]*hreflang=/)?.[1];
      const expected = `${lang === 'zh' ? '/en' : ''}/${page}`;
      assert.ok(!html.includes('<header'), 'Inner pages have no permanent navigation header');
      assert.ok(!html.includes('data-theme-choice="system"'));
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

  test(`${lang} blog: the three requested essays are available`, async () => {
    assert.deepEqual(await articleSlugs(prefix), ['environment', 'good-writing-good-product', 'vision']);
    const html = await readPage(`${prefix}blog`);
    assert.ok(html.indexOf('/blog/good-writing-good-product/') < html.indexOf('/blog/environment/'));
    assert.ok(html.indexOf('/blog/environment/') < html.indexOf('/blog/vision/'));
    for (const slug of ['environment', 'good-writing-good-product', 'vision']) {
      assert.ok(html.includes(`href="/${prefix}blog/${slug}/"`));
      const post = await readPage(`${prefix}blog/${slug}`);
      assert.ok(post.includes('class="prose"'));
      const meta = post.match(/<p class="post-meta">([\s\S]*?)<\/p>/)?.[1] || '';
      assert.ok(!meta.includes('<span'));
      if (slug === 'environment') assert.ok(meta.includes('2026-09-18'));
      if (slug === 'vision') assert.ok(meta.includes('2026-08-04'));
    }
  });
}

test('RSS contains the three requested essays', async () => {
  const xml = await readFile(new URL('../dist/rss.xml', import.meta.url), 'utf8');
  assert.ok(xml.includes('<rss'));
  assert.equal((xml.match(/<item>/g) || []).length, 3);
  for (const slug of ['environment', 'good-writing-good-product', 'vision']) assert.ok(xml.includes(`/blog/${slug}/`));
});

test('published articles have matching English versions', async () => {
  assert.deepEqual(articles, await articleSlugs('en/'));
});

test('English work page localizes the current period', async () => {
  const html = await readPage('en/work');
  assert.ok(html.includes('2026.07 — Present'));
  assert.ok(!html.includes('至今'));
});
