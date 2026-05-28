# Syntra GitHub Pages Review Package with Admin Portal

This package includes the public website review build plus the admin portal review page.

## Review URLs after publishing to GitHub Pages

Public website:
https://eslamembaby4.github.io/syntra-review/

Admin portal:
https://eslamembaby4.github.io/syntra-review/internal/admin.html

Alternative admin shortcut:
https://eslamembaby4.github.io/syntra-review/internal/

## Important notes

- This package does not include `.env`, `CNAME`, `src`, or the `supabase` folder.
- The admin page has been added back for review.
- Asset paths inside `internal/admin.html` were adjusted so the logo, CSS, favicons, and JavaScript can load correctly from GitHub Pages.
- GitHub Pages is public, so do not add private keys, service-role keys, production-only secrets, or confidential files to this repo.

## Push/update commands

From the unzipped folder:

```powershell
git init
git branch -M main
git remote add origin https://github.com/eslamembaby4/syntra-review.git
git add -A
git commit -m "Add admin portal review version"
git push -u origin main --force
```

If the repo is already cloned locally, copy these files into the repo folder, then run:

```powershell
git add -A
git commit -m "Add admin portal review version"
git push
```
