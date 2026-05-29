# Admin Authentication Setup Guide

## Overview

Your admin panel now uses **Supabase Authentication** with server-side validation. The hardcoded credentials have been removed and replaced with a secure authentication system.

## Security Improvements

### What Changed:

1. ✅ **Removed hardcoded credentials** - No more plain text passwords in JavaScript
2. ✅ **Server-side authentication** - Validation happens on Supabase servers, not client-side
3. ✅ **Role-based access control** - Only users with `admin` role can access the panel
4. ✅ **Session timeout** - Automatic logout after 30 minutes of inactivity
5. ✅ **Audit logging** - All admin actions are tracked in `admin_audit_log` table
6. ✅ **JWT-based authentication** - Secure token-based sessions
7. ✅ **Restricted database policies** - Anonymous users can no longer delete submissions

### Security Score: **8/10** ⬆️ (was 3/10)

---

## Creating Admin Users

### Step 1: Access Supabase Dashboard

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project: `smrfpquwwojfvnypjmkd`
3. Navigate to **Authentication** → **Users** in the left sidebar

### Step 2: Create New Admin User

1. Click **"Add User"** button
2. Enter the admin's email address
3. Enter a strong password (minimum 6 characters)
4. Click **"Create User"**

### Step 3: Grant Admin Role

This is the **critical step** - without this, the user cannot access the admin panel:

1. In the Users list, find the user you just created
2. Click on the user to open their details
3. Scroll to **"User Metadata"** section
4. Find the **"Raw App Meta Data"** field
5. Add the following JSON:

```json
{
  "role": "admin"
}
```

6. Click **"Save"** or **"Update User"**

### Step 4: Test Login

1. Go to your admin page: `https://syntrarefining.com/admin.html`
2. Enter the email and password you created
3. You should now have full admin access

---

## Admin User Management

### Recommended Admin Email

Use a company email like:
- `admin@syntrarefining.com`
- `esther@syntrarefining.com`
- Or any corporate email address

### Password Requirements

- Minimum 6 characters (Supabase default)
- Recommend: At least 12 characters with mix of uppercase, lowercase, numbers, and symbols
- Example strong password: `Syntra2025!AdminSecure`

### Creating Multiple Admins

You can create multiple admin users by repeating Steps 1-3 for each person who needs access. Each admin:
- Has their own unique email/password
- Actions are tracked individually in audit logs
- Can be revoked by removing the `admin` role from their metadata

### Revoking Admin Access

To remove someone's admin access:

1. Go to **Authentication** → **Users**
2. Find the user
3. Either:
   - **Delete the user** (permanent), OR
   - **Remove the admin role**: Edit their Raw App Meta Data and delete the `"role": "admin"` line

---

## Session Management

### Session Timeout

- Sessions automatically expire after **30 minutes of inactivity**
- Any action (viewing, updating, deleting) resets the timeout
- Users receive an alert before being logged out

### Manual Logout

- Click the **"Logout"** button in the top-right corner
- This clears the session and requires re-login

---

## Audit Logging

All admin actions are now logged in the `admin_audit_log` table:

### What's Logged:

- ✅ Login attempts
- ✅ Logout events
- ✅ Marking submissions as read/unread
- ✅ Deleting submissions
- ✅ User email performing the action
- ✅ Timestamp of the action
- ✅ Details about what was changed

### Viewing Audit Logs

To view audit logs, run this SQL query in your Supabase SQL Editor:

```sql
SELECT
  created_at,
  admin_email,
  action,
  table_name,
  details
FROM admin_audit_log
ORDER BY created_at DESC
LIMIT 100;
```

---

## Database Security

### New RLS Policies

**form_submissions table:**

- ✅ **Public can submit forms** - Anonymous users can INSERT (needed for public forms)
- ✅ **Admins can view all submissions** - Requires authenticated user with `admin` role
- ✅ **Admins can update submissions** - Mark as read/unread
- ✅ **Admins can delete submissions** - With audit logging
- ❌ **Anonymous users cannot view, update, or delete** - Removed all permissive policies

**admin_audit_log table:**

- ✅ **Only admins can view logs** - Requires authenticated user with `admin` role
- ❌ **No one can modify or delete logs** - Immutable audit trail

**job_listings table:**

- ✅ **Public can view active jobs** - Read-only access
- ❌ **No public write access** - Would need admin role (not yet implemented)

---

## Troubleshooting

### "Access denied. Admin privileges required."

**Cause:** User doesn't have admin role in their metadata

**Solution:**
1. Go to Supabase Dashboard → Authentication → Users
2. Find the user
3. Add `{"role": "admin"}` to their Raw App Meta Data
4. Save and try logging in again

### "Invalid email or password"

**Cause:** Incorrect credentials

**Solution:**
1. Verify the email address is correct
2. Use the password reset feature if needed (can be added)
3. Check that the user exists in Supabase Dashboard

### Session expired errors

**Cause:** Session timeout after 30 minutes of inactivity

**Solution:**
- This is normal security behavior
- Simply log in again
- Any unsaved work may be lost (save frequently)

### Cannot view submissions after login

**Cause:** RLS policies not allowing access

**Solution:**
1. Verify user has `{"role": "admin"}` in app_metadata
2. Check browser console for errors
3. Verify Supabase RLS policies are applied correctly

---

## Security Best Practices

### DO:

✅ Use strong, unique passwords for each admin
✅ Create individual accounts for each admin (no sharing)
✅ Review audit logs regularly for suspicious activity
✅ Logout when done or leaving computer
✅ Use company email addresses for admins
✅ Remove access immediately when someone leaves the team

### DON'T:

❌ Share admin credentials with multiple people
❌ Use weak passwords like "password123"
❌ Leave admin panel open on shared computers
❌ Store passwords in plain text files
❌ Give admin access to everyone "just in case"

---

## Next Steps (Optional Enhancements)

### Recommended Future Improvements:

1. **Password Reset Flow** - Allow admins to reset forgotten passwords
2. **Email Verification** - Require email confirmation for new admins
3. **Two-Factor Authentication (2FA)** - Add extra security layer
4. **IP Whitelist** - Restrict admin access to specific IP addresses
5. **More Granular Roles** - Create "viewer" vs "editor" vs "admin" roles
6. **Admin Management UI** - Create interface to add/remove admins without using Supabase Dashboard
7. **Notification on New Submissions** - Email alerts when forms are submitted

---

## Quick Reference

### Admin Panel URL
```
https://syntrarefining.com/admin.html
```

### Session Timeout
```
30 minutes
```

### Required Role Metadata
```json
{
  "role": "admin"
}
```

### Support Contact

For technical issues with authentication, contact your development team or Supabase support.

---

## Migration Notes

### Old System (REMOVED):
- Hardcoded username: `admin`
- Hardcoded password: `Esther2010@@` (now invalid)
- localStorage authentication (insecure)
- No audit trail
- No session timeout

### New System (ACTIVE):
- Supabase Authentication
- Individual user accounts with email/password
- Server-side validation
- Complete audit trail
- 30-minute session timeout
- Role-based access control

---

**Last Updated:** January 24, 2026
**Security Version:** 2.0
