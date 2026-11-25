# Joomya’s Web Directory

A one-page list of Joomya’s websites, published through GitHub Pages at
[sites.junyahonda.com](https://sites.junyahonda.com/).

## Add or update a site

Edit [`sites.mjs`](sites.mjs) and add or update one entry. Entries display in
file order. Each entry needs a `name`, an HTTPS `url`, a short `summary`,
and a `status` of `live` or `coming soon`.
For a coming-soon site the directory shows its planned address as text; switch
the status to `live` once the URL works.

## Preview and check

With Node.js 24, run the following from the repository root and open
<http://localhost:8000/>:

```sh
mkdir -p _site
cp 404.html styles.css favicon.svg CNAME _site/
node scripts/render-directory.mjs > _site/index.html
python3 -m http.server 8000 --directory _site
```

No packages are required. The Directory workflow runs `node --test` on pull
requests and deploys the generated HTML after a passing check on `main`.
