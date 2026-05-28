# GitHub Pages Review Deployment

This folder is a cleaned public-review version of the website. It excludes `.env`, `internal/`, `supabase/`, `src/`, and the original `CNAME` file.

## Recommended setup

1. Create a new GitHub repository in your personal GitHub account, for example `syntra-review`.
2. Upload everything from this folder to the repository root.
3. Go to repository **Settings → Pages**.
4. Under **Build and deployment**, select **GitHub Actions**.
5. Push or re-run the workflow under the **Actions** tab.
6. Your review URL should be: `https://YOUR-GITHUB-USERNAME.github.io/syntra-review/`

## Notes

- Keep the repository private if this review link is not meant for public viewing. GitHub Pages availability for private repos depends on your GitHub plan.
- Do not upload `.env`, internal documents, or employee/email-signature folders to a public repository.
- This is for review/staging, not production DNS. Do not add the production `CNAME` file unless you are intentionally connecting the live domain.
