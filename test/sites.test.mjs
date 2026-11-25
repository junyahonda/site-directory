import assert from 'node:assert/strict';
import test from 'node:test';
import { renderDirectory } from '../scripts/render-directory.mjs';
import { sites } from '../sites.mjs';

test('directory entries have unique names and HTTPS addresses', () => {
  assert.ok(sites.length > 0);
  const names = new Set();
  const urls = new Set();

  for (const { name, url, summary, status, ...rest } of sites) {
    assert.ok(typeof name === 'string' && name.trim(), 'Site name is required');
    assert.ok(typeof summary === 'string' && summary.trim(), `${name} needs a summary`);
    assert.ok(['live', 'coming soon'].includes(status), `${name} has an invalid status`);

    const nameKey = name.trim().toLowerCase();
    const address = new URL(url);
    assert.equal(address.protocol, 'https:', `${name} must have an HTTPS URL`);
    assert.ok(!names.has(nameKey), `Duplicate name: ${name}`);
    assert.ok(!urls.has(address.href), `Duplicate URL: ${url}`);
    names.add(nameKey);
    urls.add(address.href);

    assert.deepEqual(Object.keys(rest), [], `${name} has unsupported fields`);
  }
});

test('the initial HTML contains all live site links without needing JavaScript', async () => {
  const html = await renderDirectory();
  const list = html.match(/<ul id="site-list"[^>]*>([\s\S]*?)<\/ul>/)[1];
  const links = [...list.matchAll(/<a class="site-link" href="([^"]+)"/g)];
  const liveSites = sites.filter(({ status }) => status === 'live');
  assert.ok(liveSites.length > 0);
  assert.deepEqual(
    links.map(([, url]) => url),
    liveSites.map(({ url }) => url.replaceAll('&', '&amp;')),
  );
  assert.doesNotMatch(html, /<script\b|<!-- site-(count|list) -->/);
});

test('coming-soon entries show their domain as text instead of a link', async () => {
  const html = await renderDirectory([{
    name: 'New & Upcoming',
    url: 'https://future.example.com/',
    summary: 'A <fresh> idea.',
    status: 'coming soon',
  }]);
  assert.match(html, /<h3>New &amp; Upcoming<\/h3>/);
  assert.match(html, /A &lt;fresh&gt; idea\./);
  assert.match(html, /<span class="site-domain">future\.example\.com<\/span>/);
  assert.doesNotMatch(html, /href="https:\/\/future\.example\.com/);
});
