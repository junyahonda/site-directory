import assert from 'node:assert/strict';
import test from 'node:test';
import { sites } from '../sites.mjs';

test('directory entries have unique names and HTTPS addresses', () => {
  assert.ok(sites.length > 0);
  const names = new Set();
  const urls = new Set();

  for (const { name, url, repo, summary, status } of sites) {
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

    if (repo !== undefined) {
      assert.equal(new URL(repo).protocol, 'https:', `${name} must have an HTTPS source URL`);
    }
  }
});
