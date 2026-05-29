# Email Signature Template Variables

## Variable Replacement Guide for Microsoft 365 Deployment

When deploying to Microsoft 365 Exchange, you need to replace the template variables with Exchange dynamic fields.

---

## Variable Mapping Table

| Template Variable | Exchange Dynamic Field | Example Value | Required |
|------------------|----------------------|---------------|----------|
| `{{FULL_NAME}}` | `%%displayName%%` | John Smith | ✅ Yes |
| `{{JOB_TITLE}}` | `%%title%%` | Chief Technology Officer | ✅ Yes |
| `{{EMAIL}}` | `%%emailAddress%%` | john.smith@syntrarefining.com | ✅ Yes |
| `{{PHONE}}` | `%%mobilePhone%%` or `%%telephoneNumber%%` | +1 (902) 555-0100 | ⚠️ Optional |

---

## Find & Replace Instructions

### Step 1: Open Signature HTML File
Open either `signature-static.html` or `signature-animated.html` in a text editor.

### Step 2: Replace Variables
Perform the following find-and-replace operations:

```
Find: {{FULL_NAME}}
Replace with: %%displayName%%

Find: {{JOB_TITLE}}
Replace with: %%title%%

Find: {{EMAIL}}
Replace with: %%emailAddress%%

Find: {{PHONE}}
Replace with: %%mobilePhone%%
```

### Step 3: Update Logo URL
```
Find: https://your-domain.com/assets/syntra-logo-white.png
Replace with: [Your actual logo URL]
```

---

## Example: Before Replacement

```html
<td>{{FULL_NAME}}</td>
<td>{{JOB_TITLE}}</td>
<td><a href="mailto:{{EMAIL}}">{{EMAIL}}</a></td>
```

## Example: After Replacement

```html
<td>%%displayName%%</td>
<td>%%title%%</td>
<td><a href="mailto:%%emailAddress%%">%%emailAddress%%</a></td>
```

---

## Complete List of Available Exchange Fields

If you need additional fields, Microsoft 365 Exchange provides these dynamic variables:

### Personal Information
- `%%displayName%%` - Full display name
- `%%firstName%%` - First name only
- `%%lastName%%` - Last name only
- `%%initials%%` - User initials
- `%%title%%` - Job title

### Contact Information
- `%%emailAddress%%` - Primary email address
- `%%mobilePhone%%` - Mobile phone number
- `%%telephoneNumber%%` - Office phone number
- `%%homePhone%%` - Home phone number

### Organizational Information
- `%%company%%` - Company name (typically "Syntra Refining Corporation")
- `%%department%%` - Department name
- `%%office%%` - Office location

### Address Information
- `%%streetAddress%%` - Street address
- `%%city%%` - City
- `%%state%%` - State/Province
- `%%zipCode%%` - Postal/ZIP code
- `%%country%%` - Country
- `%%poBox%%` - P.O. Box

### Other Fields
- `%%customAttribute1%%` through `%%customAttribute15%%` - Custom attributes
- `%%manager%%` - Manager's name
- `%%assistant%%` - Assistant's name

---

## Validation Checklist

Before deploying to Exchange, verify:

- [ ] All `{{VARIABLES}}` replaced with `%%exchangeFields%%`
- [ ] Logo URL updated to your hosted image
- [ ] HTTPS used for logo URL
- [ ] All required fields present in user profiles
- [ ] HTML validated (no syntax errors)
- [ ] Tested in Outlook preview

---

## Testing User Profile Data

To verify a user has all required fields populated:

1. Go to **Microsoft 365 Admin Center**
2. Navigate to **Users** → **Active users**
3. Select a user
4. Check the following fields are populated:
   - Display name ✅
   - Job title ✅
   - Email ✅
   - Mobile phone (optional)

If fields are missing:
1. Click **Edit** next to the user
2. Fill in missing information
3. Save changes
4. Wait 15 minutes for synchronization

---

## Advanced Customization

### Conditional Fields (Phone Number)

If you want to show phone number only when available:

**Current HTML (shows always):**
```html
<tr>
    <td>%%mobilePhone%%</td>
</tr>
```

**Conditional approach:**
Phone numbers cannot be conditionally hidden in Exchange transport rules. Options:
1. Always include the field (shows blank if not set)
2. Populate phone for all users who need it
3. Use a separate signature rule for executives with phones

### Role-Based Signatures

To create different signatures for different roles:

1. Create multiple Exchange rules
2. Use conditions like:
   - "The sender is a member of [Security Group]"
   - "The sender's manager is [Name]"
   - "The sender's department is [Department]"

**Example:**
- Rule 1: Executives (with phone number)
- Rule 2: Standard employees (no phone number)
- Rule 3: External-facing roles (with additional disclaimer)

---

## Sample Populated Signature

### Input Data:
- Display Name: Sarah Johnson
- Title: Director of Operations
- Email: sarah.johnson@syntrarefining.com
- Mobile: +1 (902) 555-0123

### Output:
```
Sarah Johnson
Director of Operations
SYNTRA REFINING CORPORATION

sarah.johnson@syntrarefining.com
+1 (902) 555-0123
www.syntrarefining.com
Halifax, Nova Scotia, Canada
```

---

## Troubleshooting

### Problem: Variables show as "%%displayName%%" in sent emails
**Cause:** Rule not processing variables correctly
**Solution:**
- Verify rule type is "Apply disclaimers"
- Ensure rule action is "Append the disclaimer"
- Check rule is in "Enforce" mode

### Problem: Logo shows as broken image
**Cause:** Logo URL not publicly accessible
**Solution:**
- Test logo URL in incognito browser
- Verify HTTPS certificate is valid
- Check no authentication required

### Problem: Signature applies inconsistently
**Cause:** Rule priority or scope issue
**Solution:**
- Set rule priority to 0 (highest)
- Check user is in scope
- Verify no conflicting rules

---

## Quick Reference: Most Common Variables

For a basic Syntra signature, you only need these 3:

1. `%%displayName%%` → Name
2. `%%title%%` → Job Title
3. `%%emailAddress%%` → Email

Everything else is static company information.

---

## Support

Need help with variable mapping?
- Reference: `DEPLOYMENT_GUIDE.md`
- Contact: IT Support at support@syntrarefining.com

---

**Last Updated:** January 2026
