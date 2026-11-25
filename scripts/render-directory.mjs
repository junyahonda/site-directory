import { readFile } from 'node:fs/promises';
import { sites } from '../sites.mjs';

const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
const escapeHtml = (text) => text.replace(/[&<>"]/g, (character) => entities[character]);

function renderCard({ name, url, summary, status }, index) {
  const number = String(index + 1).padStart(2, '0');
  const live = status === 'live';
  const action = live
    ? `<a class="site-link" href="${escapeHtml(url)}" aria-label="Visit site: ${escapeHtml(name)}">Visit site <span aria-hidden="true">↗</span></a>`
    : `<span class="site-domain">${escapeHtml(new URL(url).hostname)}</span>`;

  return `<li class="site" data-status="${live ? 'live' : 'coming soon'}">
              <div class="site-top">
                <span class="site-number" aria-hidden="true">${number}</span>
                <span class="site-status">${live ? 'Live' : 'Coming soon'}</span>
              </div>
              <h3>${escapeHtml(name)}</h3>
              <p class="summary">${escapeHtml(summary)}</p>
              <div class="site-links">
                ${action}
              </div>
            </li>`;
}

export async function renderDirectory(entries = sites) {
  const template = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  return template
    .replace('<!-- site-count -->', `${entries.length} ${entries.length === 1 ? 'site' : 'sites'}`)
    .replace('<!-- site-list -->', () => entries.map(renderCard).join('\n            '));
}

if (import.meta.main) process.stdout.write(await renderDirectory());
