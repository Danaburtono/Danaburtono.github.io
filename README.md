# Resume Website

A from-scratch personal resume site — **plain HTML, CSS, and JavaScript**. No frameworks,
no build step, no paid tools. Open `index.html` and it just works.

## Structure

```
website/
├── index.html        # All content lives here — edit the text directly
├── css/styles.css    # Styling + dark mode + print (PDF) layout
├── js/main.js         # Theme toggle, active nav highlight, footer year
└── assets/           # Put your resume.pdf and any images here
```

## Edit your content

Everything is in [`index.html`](index.html). Look for the comment blocks
(`<!-- HERO -->`, `<!-- EXPERIENCE -->`, etc.) and replace the placeholder text.
Items marked `TODO` are the spots to fill in.

- **Links:** update `mailto:you@example.com`, the GitHub, and LinkedIn URLs.
- **PDF resume:** drop a file at `assets/resume.pdf` so the "Download resume" button works.
- **Add an experience/project:** copy one `<article>` block and edit it.

## Preview locally

Just double-click `index.html`, or run a tiny local server for cleaner behavior:

```powershell
# from the website/ folder
python -m http.server 5500
# then open http://localhost:5500
```

## Export a PDF

Open the site, press **Ctrl+P**, and choose "Save as PDF". A print stylesheet hides the
nav/buttons and formats it as a clean one-page resume.

## Deploy for free (pick one later)

**GitHub Pages**
1. Push this folder to a GitHub repo.
2. Repo → Settings → Pages → Source: your branch, folder `/website` (or move files to root).
3. Your site publishes at `https://<username>.github.io/<repo>/`.

**Netlify / Cloudflare Pages**
- Drag-and-drop the `website/` folder in their dashboard, or connect the repo.
- No build command needed; publish directory is `website`.

All three have free tiers with no credit card required.
