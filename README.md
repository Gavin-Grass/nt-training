# Nia Hagler Wrestling

Static personal-training website for Nia Hagler Wrestling.

Live site: https://nia-hagler.gavgrass.workers.dev/

## Project type

This is a public marketing site. It does not currently include accounts, login, payments, contact forms, API endpoints, or database-backed features. Booking is handled off-site through Instagram messages.

## Security posture

- No runtime secrets are required for the live site.
- `.env*` files are ignored and should not be committed.
- Security headers are defined in `_headers`.
- The deployed page uses static HTML/CSS and embedded/local image assets.
- There is no server-side user input, so authentication, database controls, and API validation are not applicable unless those features are added later.

See [SECURITY.md](SECURITY.md) for the detailed security and operations checklist.

## Project structure

```text
.
├── _headers                  # Cloudflare security headers
├── README.md                 # Project overview
├── SECURITY.md               # Security checklist, diagrams, and operations notes
├── .openai/hosting.json      # Sites hosting configuration
├── static/
│   ├── index.html            # Editable source version
│   ├── index-embedded.html   # Deployed single-file HTML
│   └── images/               # Logo and wrestling images
├── app/, worker/, db/        # Starter scaffolding, not used by live static page
└── package.json              # Build/test scripts from the starter
```

## Update workflow

1. Edit the source website in `static/index.html`.
2. Regenerate or update `static/index-embedded.html` when images/assets need to be embedded.
3. Publish the deployed root `index.html` through GitHub version control.
4. Cloudflare deploys the latest GitHub version.
5. Verify the live URL and response headers.

## Useful checks

```bash
npm run build
npm test
```

