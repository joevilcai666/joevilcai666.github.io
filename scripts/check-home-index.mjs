import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
for (const [path, prefix] of [['', ''], ['en/', 'en/']]) {
  test(`${path || 'zh'} homepage keeps full prose, inline topics, and compact controls`, async () => {
    const html = await readFile(new URL(`../dist/${path}index.html`, import.meta.url), 'utf8');
    for (const id of ['projects', 'work', 'writing', 'origin-im', 'origin-health', 'craft', 'prose', 'skills']) {
      assert.match(html, new RegExp(`href="#${id}"`));
      assert.match(html, new RegExp(`id="${id}"`));
    }
    for (const href of ['https://github.com/joevilcai666/writing-doc-skill', 'https://github.com/joevilcai666/how-it-works-skill', 'https://github.com/joevilcai666/product-prototype-skill', 'https://github.com/joevilcai666/google-ads-skill']) assert.ok(html.includes(href));
    assert.ok(!html.includes('蔡骥淳'));
    assert.ok(html.includes('Origin AI'));
    assert.ok(html.includes('Origin Health'));
    assert.ok(html.includes('Shadoweave'));
    assert.ok(!html.includes('<header'), 'Homepage has no navigation header');
    assert.ok(!html.includes('<footer'), 'Homepage has no colophon');
    assert.ok(html.includes('Product Builder'));
    assert.ok(html.includes('entry-part">noun'));
    assert.equal((html.match(/class="narrative-paragraph"/g) || []).length, 4);
    assert.ok(!html.includes('hero-actions'));
    assert.ok(!html.includes('data-theme-choice="system"'));
    assert.ok(html.includes(`href="/${prefix}blog/"`));
  });
}
