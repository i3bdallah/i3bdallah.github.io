/**
 * =============================================================================
 * About Me — Config-Driven Rendering Engine
 * =============================================================================
 *
 * This script powers the entire site:
 *   1. Fetches `config.yaml` at page load
 *   2. Parses it with js-yaml
 *   3. Renders every section into the DOM
 *
 * To update site content, edit config.yaml — no JS changes required.
 * =============================================================================
 */

(function () {
    'use strict';

    // =========================================================================
    // SVG Icon Library
    // =========================================================================
    // Inline SVGs keyed by name. Used for social icons, section headers, and
    // link cards so the site stays dependency-free (no icon font needed).
    // =========================================================================
    const ICONS = {
        /* Social platforms */
        email: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
        linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
        github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
        twitter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
        youtube: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/><path fill="#0f0f0f" d="m9.545 15.568 6.273-3.568-6.273-3.568z"/></svg>`,
        instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
        website: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,

        /* Content types */
        resume: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
        video: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
        course: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
        slides: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
        post: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
        link: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
        cert: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,

        /* UI elements */
        arrow: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
    };

    // =========================================================================
    // Helper: safely get an icon SVG by name
    // =========================================================================
    function icon(name) {
        return ICONS[name] || ICONS.link;
    }

    // =========================================================================
    // Render: Profile Section
    // =========================================================================
    function renderProfile(profile) {
        const el = document.getElementById('profile-section');
        el.innerHTML = `
            <img
                class="profile__avatar"
                src="${profile.avatar}"
                alt="${profile.name}"
                onerror="this.style.display='none'"
            />
            <h1 class="profile__name">${profile.name}</h1>
            <p class="profile__tagline">${profile.tagline}</p>
            <p class="profile__bio">${profile.bio}</p>
        `;
    }

    // =========================================================================
    // Render: Social Links Row
    // =========================================================================
    function renderSocial(social) {
        const el = document.getElementById('social-section');

        // Build one icon-link per social entry
        el.innerHTML = social.map(s => `
            <a
                class="social-row__link"
                href="${s.url}"
                target="${s.url.startsWith('mailto:') ? '_self' : '_blank'}"
                rel="noopener noreferrer"
                aria-label="${s.label}"
                title="${s.label}"
            >${icon(s.platform)}</a>
        `).join('');
    }

    // =========================================================================
    // Render: Link Sections (Content cards with grid layout)
    // =========================================================================
    function renderSections(sections) {
        const container = document.getElementById('sections-container');

        container.innerHTML = sections.map(section => {
            // Determine if this section should use card grid layout
            const useGridLayout = ['video', 'course', 'slides'].includes(section.icon);

            if (useGridLayout) {
                // Build content cards for grid layout
                const cards = section.links.map(link => {
                    const isSoon = link.coming_soon === true;
                    const href = isSoon ? '#' : link.url;
                    const target = href.startsWith('http') ? '_blank' : '_self';
                    const cardClass = `content-card${isSoon ? ' content-card--soon' : ''}`;

                    // Image or icon placeholder
                    const imageHtml = link.thumbnail || link.image
                        ? `<img class="content-card__image" src="${link.thumbnail || link.image}" alt="${link.name}" loading="lazy" />`
                        : `<div class="content-card__icon-placeholder">${icon(link.type || section.icon)}</div>`;

                    return `
                        <a class="${cardClass}" href="${href}" target="${target}" rel="noopener noreferrer">
                            ${imageHtml}
                            <div class="content-card__body">
                                <h3 class="content-card__title">${link.name}</h3>
                                ${link.description ? `<p class="content-card__desc">${link.description}</p>` : ''}
                            </div>
                            ${isSoon ? '<span class="content-card__badge">Soon</span>' : ''}
                        </a>
                    `;
                }).join('');

                return `
                    <section class="link-section">
                        <h2 class="link-section__title">
                            ${icon(section.icon)}
                            ${section.title}
                        </h2>
                        <div class="content-grid">${cards}</div>
                    </section>
                `;
            } else {
                // Use traditional list cards for Resume and other sections
                const cards = section.links.map(link => {
                    const isSoon = link.coming_soon === true;
                    const href = isSoon ? '#' : link.url;
                    const target = href.startsWith('http') ? '_blank' : '_self';
                    const cardClass = `content-card content-card--resume${isSoon ? ' content-card--soon' : ''}`;

                    return `
                        <a class="${cardClass}" href="${href}" target="${target}" rel="noopener noreferrer">
                            <div class="content-card__icon-placeholder">${icon(link.type || section.icon)}</div>
                            <div class="content-card__body">
                                <h3 class="content-card__title">${link.name}</h3>
                                ${link.description ? `<p class="content-card__desc">${link.description}</p>` : ''}
                            </div>
                        </a>
                    `;
                }).join('');

                return `
                    <section class="link-section">
                        <h2 class="link-section__title">
                            ${icon(section.icon)}
                            ${section.title}
                        </h2>
                        ${cards}
                    </section>
                `;
            }
        }).join('');
    }

    // =========================================================================
    // Render: Certifications Grid
    // =========================================================================
    function renderCertifications(certs) {
        if (!certs || certs.length === 0) return;

        const el = document.getElementById('certifications-section');

        const badges = certs.map(cert => {
            const tag = cert.url ? 'a' : 'span';
            const hrefAttr = cert.url ? `href="${cert.url}" target="_blank" rel="noopener noreferrer"` : '';

            // Use image if available, otherwise show icon
            const iconHtml = cert.image
                ? `<img src="${cert.image}" alt="${cert.name}" loading="lazy" />`
                : icon('cert');

            return `
                <${tag} class="cert-badge" ${hrefAttr}>
                    <span class="cert-badge__icon">${iconHtml}</span>
                    <span class="cert-badge__info">
                        <span class="cert-badge__name">${cert.name}</span>
                        <span class="cert-badge__org">${cert.org} · ${cert.year}</span>
                    </span>
                </${tag}>
            `;
        }).join('');

        el.innerHTML = `
            <h2 class="certifications__title">
                ${icon('cert')}
                Certifications
            </h2>
            <div class="certifications__grid">${badges}</div>
        `;
    }

    // =========================================================================
    // Render: Footer
    // =========================================================================
    function renderFooter(footer) {
        const el = document.getElementById('footer-section');
        el.innerHTML = `<p class="footer__text">${footer.text}</p>`;
    }

    // =========================================================================
    // Show loading indicator while config.yaml is being fetched
    // =========================================================================
    function showLoading() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="loading">
                <div class="loading__spinner"></div>
                Loading...
            </div>
        `;
    }

    // =========================================================================
    // Main: Fetch config.yaml → parse → render
    // =========================================================================
    async function init() {
        showLoading();

        try {
            // Fetch the YAML config file
            const response = await fetch('config.yaml');
            if (!response.ok) throw new Error(`Failed to load config.yaml (${response.status})`);

            const yamlText = await response.text();

            // Parse YAML into a JavaScript object using js-yaml
            const config = jsyaml.load(yamlText);

            // Restore the original HTML structure (loading indicator replaced it)
            const app = document.getElementById('app');
            app.innerHTML = `
                <section class="profile" id="profile-section"></section>
                <nav class="social-row" id="social-section" aria-label="Social links"></nav>
                <div id="sections-container"></div>
                <section class="certifications" id="certifications-section"></section>
                <footer class="footer" id="footer-section"></footer>
            `;

            // Render each section from config data
            renderProfile(config.profile);
            renderSocial(config.social);
            renderSections(config.sections);
            renderCertifications(config.certifications);
            renderFooter(config.footer);

        } catch (err) {
            console.error('Failed to initialise site:', err);
            document.getElementById('app').innerHTML = `
                <div class="loading">
                    <p>Could not load site configuration.</p>
                    <p style="font-size: 0.75rem; margin-top: 0.5rem; opacity: 0.5;">${err.message}</p>
                </div>
            `;
        }
    }

    // Kick off when the DOM is ready
    document.addEventListener('DOMContentLoaded', init);
})();
