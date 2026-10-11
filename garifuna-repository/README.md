# Garifuna Repository (GitHub Pages)

Static site for www.garifunarepository.org. No server, no build tools beyond one Python script.

## Structure
- `index.html`, `article/`, `timeline/`, `sources/`, `glossary/`, `quiz/`, `about/`, `account/`, `news/`, `library/`, `tools/`, `contribute/`, `principles/`: one page per route, each with its own title, description and canonical URL.
- `assets/css/site.css`, `assets/js/app-*.js`: shared styles and scripts, cached by the browser.
- `archive/`: Markdown entries. Put a `.md` file here (see `_template.md`) and add its file name to `archive/index.json`.
- `sw.js`, `manifest.webmanifest`, `assets/icon.svg`: offline use and install-to-home-screen.
- `404.html`, `CNAME`, `.nojekyll`, `robots.txt`, `sitemap.xml`: GitHub Pages and search engines.
- `src/site.html` + `build.py`: the single-file source and the script that generates everything above.

## Publish
1. Create a GitHub repository and upload these files to the `main` branch.
2. Settings > Pages > Deploy from branch `main`, folder `/ (root)`.
3. Custom domain: `www.garifunarepository.org` (the `CNAME` file sets it). At your DNS provider add a CNAME record for `www` pointing to `<your-username>.github.io`, and tick Enforce HTTPS. Check GitHub's current Pages documentation for apex-domain records.

## Edit
Change `src/site.html`, then run `python3 build.py` and commit the result. Paths are root-absolute, so use a custom domain or a user site, not a project sub-path.

## Limits
Everything is public. Accounts, roles and drafts run in the visitor's browser and are a prototype, not secure authentication. Real publishing permissions need a server or GitHub pull requests with reviewers.
