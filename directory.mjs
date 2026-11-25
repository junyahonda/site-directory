import { sites } from './sites.mjs';

const list = document.querySelector('#site-list');
const template = document.querySelector('#site-template');
document.querySelector('#site-count').textContent = `${sites.length} ${sites.length === 1 ? 'site' : 'sites'}`;

for (const [index, site] of sites.entries()) {
  const card = template.content.firstElementChild.cloneNode(true);
  const status = card.querySelector('.site-status');
  const link = card.querySelector('.site-link');
  const repo = card.querySelector('.repo-link');

  card.querySelector('.site-number').textContent = String(index + 1).padStart(2, '0');
  card.querySelector('h3').textContent = site.name;
  card.querySelector('.summary').textContent = site.summary;
  status.textContent = site.status === 'live' ? 'Live' : 'Coming soon';
  card.dataset.status = site.status;

  if (site.status === 'live') {
    link.href = site.url;
    link.setAttribute('aria-label', `Visit site: ${site.name}`);
  } else {
    const domain = document.createElement('span');
    domain.className = 'site-domain';
    domain.textContent = new URL(site.url).hostname;
    link.replaceWith(domain);
  }

  if (site.repo) {
    repo.href = site.repo;
    repo.setAttribute('aria-label', `Source: ${site.name}`);
  } else {
    repo.remove();
  }

  list.append(card);
}
