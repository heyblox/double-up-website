# Double Up website

Marketing site for **Double Up: Unbeatable Upsell**, a Shopify Plus checkout upsell. Built with [Astro](https://astro.build) and deployed to GitHub Pages, the same way as the Blox site ([heyblox/website](https://github.com/heyblox/website)).

## Local development

```bash
npm install
npm run dev
```

Build statically:

```bash
npm run build
npm run preview
```

## Deploy

Pushes to `main` run [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) and publish `dist/` to GitHub Pages. Pull requests run the same build without deploying, and `main` requires that `build` check to pass before merging.

Dependabot ([`.github/dependabot.yml`](.github/dependabot.yml)) opens weekly PRs for npm packages and GitHub Actions.

In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Custom domain is set via [`public/CNAME`](public/CNAME) (`getdoubleup.com`), and Astro `base` is `/`. Build internal links with `withBase()` from [`src/lib/urls.ts`](src/lib/urls.ts). The project URL `https://heyblox.github.io/double-up-website/` won't style correctly while `base` is `/`; use the domain, or `npm run preview` locally.

## DNS

1. Enable GitHub Pages (Actions) and confirm a successful deploy.
2. In Pages settings, set the custom domain to `getdoubleup.com` and wait for the DNS check and HTTPS.
3. At your DNS provider, point the apex `getdoubleup.com` at the GitHub Pages A records (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and `www` as a `CNAME` to `heyblox.github.io`. See the [GitHub docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
4. Use `https://getdoubleup.com/privacy/` and `/terms/` in the Partner Dashboard listing.

Site copy uses the Double Up brand only. Blox Labs, Inc. owns the app and is named as the legal entity: in the footer copyright, the publisher in the home page's structured data, and the opening paragraph of the privacy policy and terms (which then refer to it as “Double Up”).

## App details

The App Store URL, app name and contact emails live in [`src/lib/site.ts`](src/lib/site.ts). Pricing and feature copy on the home page and FAQ should match the app ([heyblox/double-up-app](https://github.com/heyblox/double-up-app)): the billing plan is in `app/shopify.server.ts`, and the data the app stores (described in the privacy policy) is in `prisma/schema.prisma` and `shopify.app.toml`.

## Brand assets

Source files live in [`assets/`](assets/), copied from `design/logo/` in the app repo. Served copies:

| Public path | Source |
|-------------|--------|
| `/logo.png` | `assets/double-up-icon-1200.png` |
| `/logo-512.png` | `assets/double-up-icon-1200.png`, resized |
| `/apple-touch-icon.png` | `assets/double-up-icon-1200.png`, resized to 180px |
| `/favicon.svg` | `assets/double-up-favicon.svg` |
| `/favicon.png` | `design/logo/favicon-32.png` in the app repo |

`/og.png` is the 1200×630 link-preview image, rendered from [`assets/og-image.html`](assets/og-image.html) with headless Chrome. After editing the template or the logo, regenerate it with:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --force-device-scale-factor=1 --window-size=1200,630 --virtual-time-budget=5000 --screenshot="$PWD/public/og.png" "file://$PWD/assets/og-image.html"
```

## Analytics and cookie consent

Google Analytics loads only on the live site. [`BaseLayout.astro`](src/layouts/BaseLayout.astro) sets Google Consent Mode defaults before the tag loads: ad storage is denied everywhere, and analytics storage is denied in the EEA, UK and Switzerland until the visitor accepts. [`ConsentBanner.astro`](src/components/ConsentBanner.astro) asks on the first visit and saves the choice in `localStorage` (`analytics-consent`); the footer's “Cookie settings” link reopens it. The privacy policy's `#cookies` section describes this, so keep them in step.

