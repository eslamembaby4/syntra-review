# Syntra Forms - Complete Implementation Guide

This guide shows you how to wire up every form on the Syntra Refining website using the unified form system.

---

## Quick Start

### 1. Include Required Scripts (in order)

Add these scripts to **every page with a form**, in this exact order:

```html
<!-- Step 1: Supabase SDK (CDN) -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- Step 2: Supabase Client Configuration -->
<script src="/js/supabase-client.js"></script>

<!-- Step 3: Syntra Forms Handler -->
<script src="/js/syntra-forms.js"></script>
```

### 2. Initialize Form

Add initialization code in a `<script>` tag at the bottom of your page:

```html
<script>
  document.addEventListener('DOMContentLoaded', function() {
    SyntraForms.init('yourFormId', {
      formType: 'partner_inquiry',
      interestType: 'Commercial Partnership'
    });
  });
</script>
```

---

## Form Type Reference

| Form Type | Email Destination | Used On |
|-----------|-------------------|---------|
| `partner_inquiry` | commercial@syntrarefining.com | index.html (Partner Form) |
| `investor_inquiry` | investors@syntrarefining.com | investor.html |
| `career_application` | careers@syntrarefining.com | careers.html |
| `supplier_document_submission` | commercial@syntrarefining.com | supplier.html |
| `supplier_rfq_response` | commercial@syntrarefining.com | supplier.html |
| `tds_package_request` | commercial@syntrarefining.com | index.html (TDS Form) |
| `sds_inquiry` | hse@syntrarefining.com | index.html (SDS Form) |
| `newsletter_subscription` | marketing@syntrarefining.com | index.html (Newsletter) |

---

## Implementation Examples

### Example 1: Partner Inquiry Form (index.html)

**HTML Structure:**

```html
<form id="partnerForm" class="space-y-4">
  <div class="grid md:grid-cols-2 gap-4">
    <input type="text" name="firstName" placeholder="First Name" required />
    <input type="text" name="lastName" placeholder="Last Name" required />
  </div>

  <input type="email" name="email" placeholder="Email" required />
  <input type="tel" name="phone" placeholder="Phone" />
  <input type="text" name="organization" placeholder="Company Name" required />

  <select name="interestType" required>
    <option value="">Select Interest...</option>
    <option>Commercial Partnership</option>
    <option>Feedstock Supply</option>
    <option>Product Offtake</option>
  </select>

  <textarea name="message" rows="4" placeholder="Tell us about your inquiry..."></textarea>

  <button type="submit">SUBMIT INQUIRY</button>

  <!-- Message container for inline errors -->
  <div id="partnerFormMessage"></div>
</form>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    SyntraForms.init('partnerForm', {
      formType: 'partner_inquiry',
      messageContainerId: 'partnerFormMessage'
    });
  });
</script>
```

---

### Example 2: Investor Inquiry Form (investor.html)

**HTML Structure:**

```html
<form id="investorForm" class="space-y-6">
  <div class="grid md:grid-cols-2 gap-4">
    <input type="text" name="name" placeholder="Full Name" required />
    <input type="email" name="email" placeholder="Email" required />
  </div>

  <input type="text" name="organization" placeholder="Fund / Organization" required />

  <select name="investmentInterest" required>
    <option value="">Investment Interest...</option>
    <option>Equity Investment</option>
    <option>Project Finance</option>
    <option>Strategic Partnership</option>
    <option>General Inquiry</option>
  </select>

  <textarea name="message" rows="4" placeholder="Investment thesis / message..." required></textarea>

  <label>
    <input type="checkbox" name="ndaConsent" required />
    I understand that access to investor materials requires execution of a standard NDA.
  </label>

  <button type="submit">SUBMIT INQUIRY</button>
</form>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    SyntraForms.init('investorForm', {
      formType: 'investor_inquiry',
      customFieldMapping: {
        investmentInterest: 'interest_type',
        ndaConsent: 'nda_consent'
      }
    });
  });
</script>
```

---

### Example 3: Career Application Form with Resume Upload (careers.html)

**HTML Structure:**

```html
<form id="applicationForm" class="space-y-4">
  <input type="hidden" name="role" id="roleInput" value="" />

  <div class="grid md:grid-cols-2 gap-4">
    <input type="text" name="firstName" placeholder="First Name" required />
    <input type="text" name="lastName" placeholder="Last Name" required />
  </div>

  <input type="email" name="email" placeholder="Email" required />
  <input type="tel" name="phone" placeholder="Phone" />
  <input type="url" name="linkedin" placeholder="LinkedIn Profile URL" />

  <!-- File Upload -->
  <div>
    <label>Resume/CV (PDF, DOC, DOCX - max 5MB) *</label>
    <input
      type="file"
      id="resume"
      name="resume"
      accept=".pdf,.doc,.docx"
      required
    />
  </div>

  <textarea name="coverLetter" rows="6" placeholder="Why Syntra? Tell us about your background..." required></textarea>

  <button type="submit" id="submitBtn">SUBMIT APPLICATION</button>
</form>

<script>
  // Function to open modal and set role
  function openApplicationModal(roleName) {
    document.getElementById('roleInput').value = roleName;
    document.getElementById('applicationModal').classList.remove('hidden');
  }

  // Initialize form with file upload support
  document.addEventListener('DOMContentLoaded', function() {
    SyntraForms.init('applicationForm', {
      formType: 'career_application',
      hasFileUpload: true,
      fileInputId: 'resume',
      customFieldMapping: {
        role: 'interest_type',
        coverLetter: 'message',
        linkedin: 'linkedin'
      },
      onSuccess: function(result) {
        // Close modal after successful submission
        setTimeout(() => {
          document.getElementById('applicationModal').classList.add('hidden');
        }, 3000);
      }
    });
  });
</script>
```

---

### Example 4: Supplier RFQ Response Form (supplier.html)

**HTML Structure:**

```html
<form id="rfqResponseForm" class="space-y-4">
  <input type="hidden" name="rfqName" id="rfqName" value="" />

  <input type="text" name="company" placeholder="Company Name" required />
  <input type="text" name="contactName" placeholder="Contact Name" required />
  <input type="email" name="email" placeholder="Email" required />
  <input type="tel" name="phone" placeholder="Phone" />

  <input type="text" name="material" id="rfqMaterial" readonly />

  <div class="flex gap-2">
    <input type="number" name="quantity" placeholder="Quantity" required />
    <select name="quantityUnit" required>
      <option value="MT/month">MT/month</option>
      <option value="MT/shipment">MT/shipment</option>
      <option value="MT/year">MT/year</option>
    </select>
  </div>

  <textarea name="grade" rows="2" placeholder="Grade / Specs..."></textarea>
  <input type="text" name="location" placeholder="Origin Location" required />
  <textarea name="pricing" rows="2" placeholder="Pricing structure..."></textarea>
  <input type="text" name="leadTime" placeholder="Lead Time" />
  <textarea name="notes" rows="3" placeholder="Additional notes..."></textarea>

  <button type="submit">SUBMIT RESPONSE</button>
</form>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    SyntraForms.init('rfqResponseForm', {
      formType: 'supplier_rfq_response',
      customFieldMapping: {
        contactName: 'first_name',
        company: 'organization',
        rfqName: 'rfq_name',
        material: 'material',
        quantity: 'quantity',
        quantityUnit: 'quantity_unit',
        grade: 'grade',
        location: 'location',
        pricing: 'pricing',
        leadTime: 'lead_time',
        notes: 'message'
      }
    });
  });
</script>
```

---

### Example 5: TDS Package Request Form (index.html)

**HTML Structure:**

```html
<form id="tdsForm" class="space-y-6">
  <input type="text" name="name" placeholder="Full Name" required />
  <input type="email" name="email" placeholder="Email" required />
  <input type="text" name="company" placeholder="Company Name" required />

  <select name="productInterest" required>
    <option value="">Select Product...</option>
    <option>Lithium Carbonate / Hydroxide</option>
    <option>Nickel Sulfate</option>
    <option>Cobalt Sulfate</option>
    <option>Manganese Sulfate</option>
    <option>Mixed Hydroxide Precipitate (MHP)</option>
  </select>

  <textarea name="message" rows="4" placeholder="Application details or questions..."></textarea>

  <button type="submit">REQUEST TDS PACKAGE</button>
</form>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    SyntraForms.init('tdsForm', {
      formType: 'tds_package_request',
      customFieldMapping: {
        productInterest: 'interest_type'
      }
    });
  });
</script>
```

---

### Example 6: SDS Inquiry Form (index.html)

**HTML Structure:**

```html
<form id="sdsForm" class="space-y-6">
  <input type="text" name="name" placeholder="Full Name" required />
  <input type="email" name="email" placeholder="Email" required />
  <input type="text" name="company" placeholder="Company Name" required />

  <select name="productCategory" required>
    <option value="">Select Product Category...</option>
    <option>Lithium Products</option>
    <option>Nickel Products</option>
    <option>Cobalt Products</option>
    <option>Manganese Products</option>
    <option>Process Chemicals</option>
  </select>

  <textarea name="message" rows="3" placeholder="Specific products or questions..."></textarea>

  <button type="submit">REQUEST SDS</button>
</form>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    SyntraForms.init('sdsForm', {
      formType: 'sds_inquiry',
      customFieldMapping: {
        productCategory: 'interest_type'
      }
    });
  });
</script>
```

---

## Field Mapping Reference

The form handler automatically maps these field names to database columns:

| HTML Field Name | Database Column | Notes |
|-----------------|-----------------|-------|
| `firstName`, `first_name` | `first_name` | Required |
| `lastName`, `last_name` | `last_name` | Optional |
| `name` | `first_name` (split if contains space) | Single name field support |
| `email` | `email` | Required |
| `phone` | `phone` | Optional |
| `organization`, `company`, `companyName` | `organization` | Optional |
| `message`, `notes`, `coverLetter` | `message` | Optional |
| `interestType`, `role`, `investmentInterest` | `interest_type` | Optional |

All other fields are stored in `additional_data` JSONB column.

---

## Custom Field Mapping

If your form has fields with different names, use `customFieldMapping`:

```javascript
SyntraForms.init('myForm', {
  formType: 'partner_inquiry',
  customFieldMapping: {
    'fullName': 'first_name',
    'companyWebsite': 'website',
    'specialRequests': 'message'
  }
});
```

---

## Success/Error Callbacks

Add custom behavior after submission:

```javascript
SyntraForms.init('partnerForm', {
  formType: 'partner_inquiry',
  onSuccess: function(result) {
    console.log('Submitted with reference:', result.referenceId);
    // Custom success logic (e.g., close modal, redirect, analytics)
  },
  onError: function(error) {
    console.error('Submission failed:', error);
    // Custom error handling (e.g., show custom message, retry logic)
  }
});
```

---

## Custom Success Message

Override the default success message:

```javascript
SyntraForms.init('partnerForm', {
  formType: 'partner_inquiry',
  successMessage: `
    <div class="custom-success-style">
      <h3>Thank You!</h3>
      <p>We've received your inquiry and will respond within 24 hours.</p>
    </div>
  `
});
```

---

## Testing

### Local Testing

**Important:** Forms will NOT work with `file://` protocol. You must use a local server.

```bash
# Option 1: Using Vite (recommended)
npm run dev

# Option 2: Using Python
python -m http.server 8000

# Option 3: Using Node.js http-server
npx http-server -p 8000
```

Then visit `http://localhost:8000` (or appropriate port).

### Test Checklist

- [ ] Form validates required fields before submission
- [ ] Submit button shows "SUBMITTING..." loading state
- [ ] Success message displays with reference ID (e.g., SR-REQ-000001)
- [ ] Entry appears in Supabase `form_submissions` table
- [ ] File upload works (for career form)
- [ ] Email notification sent (check edge function logs)
- [ ] Error handling works (try disconnecting internet)

---

## Troubleshooting

### Issue: "syntraSupabase is not defined"

**Solution:** Make sure scripts are loaded in correct order:
1. Supabase SDK (CDN)
2. supabase-client.js
3. syntra-forms.js
4. Your initialization code

### Issue: "Form submits but no database entry"

**Solution:**
- Check browser console for errors
- Verify RLS policies are set correctly
- Make sure `anon` role has INSERT permission
- Check sequence permissions (`GRANT USAGE ON SEQUENCE`)

### Issue: "File upload fails"

**Solution:**
- Verify storage bucket `career-applications` exists
- Check storage policies allow `anon` INSERT
- Verify file is under 5MB
- Check file type is PDF/DOC/DOCX

### Issue: "Email not received"

**Solution:**
- Email notifications are non-blocking (form still succeeds if email fails)
- Check Supabase Edge Function logs
- Verify RESEND_API_KEY is configured in Supabase
- Email routing is configured in edge function

---

## Next Steps

1. ✅ Run the SQL migration script (SYNTRA_FORMS_COMPLETE_MIGRATION.sql)
2. ✅ Set up storage bucket (STORAGE_BUCKET_SETUP.md)
3. ✅ Add script includes to all form pages
4. ✅ Initialize each form using examples above
5. ✅ Test all forms locally
6. ✅ Deploy to production

---

**Implementation Complete!** All forms across the Syntra website now use a unified, consistent submission system.
