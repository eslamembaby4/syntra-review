# ✅ Admin Security Setup Checklist

## Your admin panel is now secure! Follow these steps to get started:

---

## Step 1: Create Admin User ⚠️ REQUIRED

### Go to Supabase Dashboard:
1. Open: https://supabase.com/dashboard
2. Select project: **smrfpquwwojfvnypjmkd**
3. Click **Authentication** (left sidebar)
4. Click **Users**

### Create User:
5. Click **"Add User"** button
6. Enter email: `_______________________` (your email)
7. Enter strong password: `_______________________`
8. Click **"Create User"**

---

## Step 2: Grant Admin Role ⚠️ CRITICAL

### Set Admin Permissions:
1. Find the user you just created in the list
2. Click on the user to open details
3. Scroll to **"Raw App Meta Data"** section
4. Paste this JSON:
   ```json
   {
     "role": "admin"
   }
   ```
5. Click **"Save"** or **"Update User"**

---

## Step 3: Test Login ✅

1. Go to: `https://syntrarefining.com/admin.html`
2. Enter the email you created
3. Enter the password you created
4. Click **"Login"**
5. ✅ You should now see all form submissions

---

## Step 4: Add More Admins (Optional)

Repeat Steps 1-2 for each person who needs admin access.

**Recommended admin emails:**
- ☐ `admin@syntrarefining.com`
- ☐ `esther@syntrarefining.com`
- ☐ `yourname@syntrarefining.com`

---

## Common Issues

### ❌ "Access denied. Admin privileges required."
**Fix:** You forgot Step 2. Go back and add the admin role to user metadata.

### ❌ "Invalid email or password"
**Fix:** Double-check the email and password you're entering.

### ❌ Can't see form submissions after login
**Fix:** Verify the `{"role": "admin"}` is in Raw App Meta Data (not User Meta Data).

---

## What Changed

| Old System | New System |
|------------|------------|
| Hardcoded password | Individual user accounts |
| No expiration | 30-minute session timeout |
| Anyone could bypass | Server-side validation |
| No audit trail | Complete logging |
| Security: 3/10 | Security: 8/10 ✅ |

---

## Important Notes

⚠️ **Old credentials no longer work:**
- Username: `admin` ❌ REMOVED
- Password: `Esther2010@@` ❌ REMOVED

✅ **You must create Supabase Auth users**

✅ **Each admin needs the `{"role": "admin"}` in their metadata**

✅ **Sessions expire after 30 minutes of inactivity**

---

## Need Help?

📖 **Full Setup Guide:** See `ADMIN_AUTHENTICATION_SETUP.md`

📖 **Security Details:** See `SECURITY_UPDATE_SUMMARY.md`

---

**Status:** ⚠️ Setup Required
**Priority:** 🔴 High - Do this before accessing admin panel

**Time Required:** ~3 minutes
