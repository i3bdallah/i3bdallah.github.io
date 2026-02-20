# About Me — Config-Driven Static Site

A modern, Linktree-inspired personal site built with vanilla HTML, CSS, and JavaScript.
All content is driven from a single `config.yaml` file — no code changes needed to update your info.

## Architecture

```
about_me/
  index.html       ← Minimal HTML shell (rarely needs editing)
  styles.css        ← Modern dark-theme styles with CSS custom properties
  app.js            ← Rendering engine: fetches config.yaml → builds the DOM
  config.yaml       ← ALL site content lives here (edit this!)
  assets/
    avatar.jpg      ← Your profile picture
    *.pdf           ← Resume and other downloadable files
```

## How It Works

1. `index.html` loads `js-yaml` from CDN and `app.js`
2. `app.js` fetches `config.yaml`, parses it, and renders every section
3. All content — name, bio, links, certifications — comes from the YAML

## Editing Content

Open `config.yaml` and update the sections:

- **profile** — name, tagline, bio, avatar path
- **social** — social media links (email, linkedin, github, etc.)
- **sections** — categorized link cards (resume, videos, courses, slides, posts)
- **certifications** — professional badges with credential URLs
- **footer** — copyright text

### Adding a new link

```yaml
sections:
  - title: "My New Section"
    icon: "link"          # icon name: resume, video, course, slides, post, link
    links:
      - name: "Link Title"
        url: "https://example.com"
        type: "link"
        description: "Short description shown below the title"
```

### Adding a new certification

```yaml
certifications:
  - name: "Cert Name"
    org: "Issuing Org"
    url: "https://credential-url.com"
    year: 2025
```

## Theming

Edit the CSS custom properties at the top of `styles.css`:

```css
:root {
    --bg-primary: #0f0f0f;       /* Page background */
    --accent: #3b82f6;           /* Accent colour (links, icons) */
    --text-primary: #f5f5f5;     /* Main text */
    --text-secondary: #a1a1aa;   /* Tagline, descriptions */
}
```

## Deployment

This is a fully static site. Deploy to any static host:

- **GitHub Pages** — push to a `gh-pages` branch or enable Pages on `main`
- **Netlify / Vercel** — connect the repo, no build step needed
- **Any web server** — just serve the files as-is

## Tech Stack

- HTML5, CSS3 (Grid, Flexbox, Custom Properties)
- Vanilla JavaScript (ES2017+, async/await)
- [js-yaml](https://github.com/nodeca/js-yaml) via CDN for YAML parsing
- [Inter](https://rsms.me/inter/) font from Google Fonts
- Inline SVG icons (no external icon library)
