# Joomya’s Web Directory

A one-page list of Joomya’s websites, published through GitHub Pages at
[sites.junyahonda.com](https://sites.junyahonda.com/).

## Add or update a site

Edit [`sites.mjs`](sites.mjs) and add or update one entry. Entries display in
file order. Each entry needs a `name`, an HTTPS `url`, a short `summary`,
and a `status` of `live` or `coming soon`. An HTTPS `repo` link is optional.
For a coming-soon site the directory shows its planned address as text; switch
the status to `live` once the URL works.

## Preview and check

Run `python3 -m http.server 8000` from the repository root and open
<http://localhost:8000/>. No packages or build are required. Use Node.js 24
to run `node --test`. The Directory workflow runs those checks on pull
requests and deploys the static files after a passing check on `main`.
