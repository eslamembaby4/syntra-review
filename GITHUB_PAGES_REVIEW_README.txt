Syntra GitHub Pages Review Package

This package is prepared for a GitHub Pages review deployment under a repository such as syntra-review.

What was fixed:
- Project files are placed at the repo root, not inside an extra /project folder.
- CNAME was removed so GitHub Pages will not connect to the production domain.
- .env, source build folders, Supabase migrations, and internal PDF/signature folders were excluded.
- Public website assets were converted from domain-root paths to relative paths.
- Internal admin pages use ../ paths so /internal/admin.html loads CSS, logo, favicons, and JS correctly.
- Missing/broken favicon files were repaired.
- .nojekyll was added for GitHub Pages compatibility.

Expected review URLs after push:
https://eslamembaby4.github.io/syntra-review/
https://eslamembaby4.github.io/syntra-review/internal/admin.html
