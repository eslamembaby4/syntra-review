# Syntra Refining - Complete Forms Inventory

This document provides a comprehensive inventory of all forms across the Syntra Refining website, including their current state, required changes, and email routing configuration.

---

## Executive Summary

- **Total Forms Found:** 8 forms across 4 pages
- **Forms Requiring Updates:** 8 (all forms)
- **Pages with Forms:** index.html, careers.html, investor.html, supplier.html
- **Email Destinations:** 4 unique email addresses

---

## Detailed Inventory

### 1. index.html

#### 1.1 Partner Inquiry Form
- **Form ID:** `partnerForm`
- **Form Type:** `partner_inquiry`
- **Email Destination:** commercial@syntrarefining.com
- **Current Status:** Partially implemented with inline Supabase code
- **Fields:**
  - First Name, Last Name (or single Name field)
  - Email
  - Phone
  - Organization/Company
  - Interest Type (dropdown)
  - Message
- **Required Changes:**
  - Remove inline Supabase code
  - Add shared module includes
  - Initialize with SyntraForms.init()
- **Priority:** HIGH (main contact form)

#### 1.2 Newsletter Subscription Form
- **Form ID:** `newsletterForm`
- **Form Type:** `newsletter_subscription`
- **Email Destination:** commercial@syntrarefining.com
- **Current Status:** Basic HTML form, no backend
- **Fields:**
  - Email
  - Consent checkbox
- **Required Changes:**
  - Add form submission handler
  - Store in database
  - Optional: integrate with email marketing platform
- **Priority:** MEDIUM

#### 1.3 TDS Package Request Form
- **Form ID:** `tdsForm`
- **Form Type:** `tds_package_request`
- **Email Destination:** commercial@syntrarefining.com
- **Current Status:** Partially implemented
- **Fields:**
  - Name
  - Email
  - Company
  - Product Interest (dropdown)
  - Message
- **Required Changes:**
  - Standardize with shared modules
  - Update initialization
- **Priority:** MEDIUM

#### 1.4 SDS Inquiry Form
- **Form ID:** `sdsForm`
- **Form Type:** `sds_inquiry`
- **Email Destination:** hse@syntrarefining.com
- **Current Status:** Partially implemented
- **Fields:**
  - Name
  - Email
  - Company
  - Product Category (dropdown)
  - Message
- **Required Changes:**
  - Standardize with shared modules
  - Update initialization
- **Priority:** MEDIUM

#### 1.5 Investor Documents Form (on index.html)
- **Form ID:** `investorDocsForm`
- **Form Type:** `investor_inquiry`
- **Email Destination:** investors@syntrarefining.com
- **Current Status:** Partially implemented
- **Fields:** (Similar to investor.html form)
- **Required Changes:**
  - Standardize with shared modules
- **Priority:** LOW (duplicate of investor.html)

---

### 2. careers.html

#### 2.1 Career Application Form (Modal)
- **Form ID:** `applicationForm`
- **Form Type:** `career_application`
- **Email Destination:** careers@syntrarefining.com
- **Current Status:** Implemented with Supabase but incomplete
- **Special Features:** Resume/CV file upload
- **Fields:**
  - Hidden: Role/Position (set by modal trigger)
  - First Name
  - Last Name
  - Email
  - Phone
  - LinkedIn URL
  - Resume Upload (PDF/DOC/DOCX, max 5MB)
  - Cover Letter / Why Syntra (textarea)
- **Modal Triggers:**
  - Apply buttons for specific roles (Mechanical Engineer, Control Systems Technologist, etc.)
  - General Application button
- **Required Changes:**
  - Fix resume upload (currently not working)
  - Standardize with shared modules
  - Ensure file gets stored in Supabase Storage
  - Store file URL in additional_data
- **Priority:** HIGH (user-facing recruitment)

---

### 3. investor.html

#### 3.1 Investor Inquiry Form
- **Form ID:** `investorForm`
- **Form Type:** `investor_inquiry`
- **Email Destination:** investors@syntrarefining.com
- **Current Status:** Implemented with Supabase
- **Fields:**
  - Name (single field)
  - Email
  - Organization / Fund
  - Investment Interest (dropdown: Equity Investment, Project Finance, Strategic Partnership, General Inquiry)
  - Message / Investment Thesis
  - NDA Consent (checkbox)
- **Required Changes:**
  - Standardize with shared modules
  - Store NDA consent in additional_data
- **Priority:** HIGH (investor relations)

---

### 4. supplier.html

#### 4.1 Supplier Document Submission Form
- **Form ID:** `supplierDocsForm`
- **Form Type:** `supplier_document_submission`
- **Email Destination:** commercial@syntrarefining.com
- **Current Status:** Implemented with Supabase
- **Fields:**
  - Company Name
  - Email
  - Document Type (dropdown: Spec Sheet, Assay Report, MSDS, Certificate of Analysis, Other)
  - Notes
- **Required Changes:**
  - Standardize with shared modules
- **Priority:** MEDIUM

#### 4.2 Supplier RFQ Response Form (Modal)
- **Form ID:** `rfqResponseForm`
- **Form Type:** `supplier_rfq_response`
- **Email Destination:** commercial@syntrarefining.com
- **Current Status:** Implemented with Supabase
- **Special Features:** Modal-based, RFQ name set dynamically
- **Fields:**
  - Hidden: RFQ Name (set by modal trigger)
  - Company
  - Contact Name
  - Email
  - Phone
  - Material (readonly, set by modal)
  - Available Quantity + Unit (MT/month, MT/shipment, MT/year)
  - Grade / Specs
  - Location / Origin
  - Pricing Structure
  - Lead Time
  - Notes
- **Required Changes:**
  - Standardize with shared modules
  - Fix field mapping issues
- **Priority:** MEDIUM

---

### 5. observer.html

**No forms requiring backend integration.** This page only has a login form that validates against hardcoded tokens (front-end only).

---

## Email Routing Configuration

| Form Type | Email Destination | Department |
|-----------|-------------------|------------|
| `partner_inquiry` | commercial@syntrarefining.com | Commercial Team |
| `investor_inquiry` | investors@syntrarefining.com | Investor Relations |
| `career_application` | careers@syntrarefining.com | HR / Talent |
| `supplier_document_submission` | commercial@syntrarefining.com | Commercial Team |
| `supplier_rfq_response` | commercial@syntrarefining.com | Commercial Team |
| `tds_package_request` | commercial@syntrarefining.com | Commercial Team |
| `sds_inquiry` | hse@syntrarefining.com | HSE / Safety |
| `newsletter_subscription` | commercial@syntrarefining.com | Marketing (optional) |

---

## Database Schema Requirements

### Core Columns (Shared across all forms)

| Column | Type | Required | Default | Notes |
|--------|------|----------|---------|-------|
| `id` | uuid | Yes | gen_random_uuid() | Primary key |
| `reference_id` | text | Yes | Auto-generated | SR-REQ-000001, SR-REQ-000002, etc. |
| `form_type` | text | Yes | - | Identifies form source |
| `first_name` | text | Yes | - | From firstName or name field |
| `last_name` | text | No | null | From lastName or split name |
| `email` | text | Yes | - | Contact email |
| `phone` | text | No | null | Contact phone |
| `organization` | text | No | null | Company/fund/organization |
| `company` | text | No | null | Alias for organization |
| `interest_type` | text | No | null | Category/role/product interest |
| `message` | text | No | null | Long-form message/notes |
| `read_status` | boolean | Yes | false | For admin dashboard |
| `additional_data` | jsonb | Yes | '{}' | Form-specific fields |
| `created_at` | timestamptz | Yes | now() | Submission timestamp |
| `updated_at` | timestamptz | Yes | now() | Last update timestamp |

### Additional Data Examples

**Career Application:**
```json
{
  "role": "Mechanical Engineer",
  "linkedin": "https://linkedin.com/in/johndoe",
  "resume_url": "https://storage.supabase.co/...",
  "resume_path": "resumes/1234567890-resume.pdf",
  "resume_filename": "john-doe-resume.pdf"
}
```

**Investor Inquiry:**
```json
{
  "investment_interest": "Equity Investment",
  "nda_consent": true
}
```

**Supplier RFQ Response:**
```json
{
  "rfq_name": "LI-ION BLACK MASS SUPPLY",
  "material": "Black Mass",
  "quantity": "100",
  "quantity_unit": "MT/month",
  "grade": "Li: 3-5%, Ni: 10-15%, Co: 5-8%",
  "location": "Ontario, Canada",
  "pricing": "LME-based with premium",
  "lead_time": "30 days"
}
```

---

## Storage Requirements

### Bucket: `career-applications`

- **Public Access:** No (private bucket)
- **Max File Size:** 5 MB
- **Allowed Extensions:** .pdf, .doc, .docx
- **Folder Structure:** `resumes/{timestamp}-{reference_id}-{filename}`
- **Policies:**
  - Anonymous users: Can UPLOAD to `resumes/` folder
  - Authenticated users: Can READ all files

---

## Dead Button / CTA Audit

### Pages with Non-Functional CTAs

#### index.html
- [ ] "Learn More" buttons (various sections) → Should scroll to relevant section or open modal
- [ ] "Partner with Us" CTAs → Should scroll to #partner-ecosystem-access or open form
- [ ] "Request Access" buttons → Should open partner/investor/supplier modals
- [ ] "View Products" → Should scroll to products section or open product modal
- [ ] "Contact Commercial Team" → Should scroll to contact form
- [ ] Navigation links to non-existent sections → Fix anchor IDs

#### careers.html
- [x] "Apply Now" buttons → Already functional (open modal)
- [x] "General Application" button → Already functional

#### investor.html
- [ ] "Submit Inquiry" button → Should be a submit button on form (not anchor)
- [ ] Navigation links → Verify all work

#### supplier.html
- [x] "Submit Response" buttons → Already functional (open RFQ modal)
- [ ] "Submit Another" after success → Should reload page or reset form

#### observer.html
- [x] Login form → Functional (validates token)
- [x] Dashboard → Functional display

---

## Implementation Priority

### Phase 1: Critical Forms (MUST FIX)
1. **Career Application** (careers.html) - Resume upload broken
2. **Partner Inquiry** (index.html) - Main contact form
3. **Investor Inquiry** (investor.html) - Investor relations

### Phase 2: Commercial Forms
4. **Supplier RFQ Response** (supplier.html)
5. **Supplier Document Submission** (supplier.html)
6. **TDS Package Request** (index.html)
7. **SDS Inquiry** (index.html)

### Phase 3: Low Priority
8. **Newsletter** (index.html) - Basic signup

---

## Testing Checklist

For each form:
- [ ] Form validates required fields
- [ ] Submit button shows loading state
- [ ] Database record created with correct reference_id
- [ ] Email notification sent to correct address
- [ ] Success message displays with reference_id
- [ ] File upload works (career form)
- [ ] Error handling works (network failures, validation)
- [ ] Mobile responsive
- [ ] Keyboard accessible
- [ ] Works on all major browsers

---

## Migration Timeline Estimate

- **SQL Migration:** 5 minutes (paste and run script)
- **Storage Setup:** 10 minutes (create bucket + policies)
- **Per Form Update:** 15-30 minutes each
- **Testing:** 1-2 hours (all forms)
- **Total Estimated Time:** 4-6 hours for complete implementation

---

## Success Criteria

✅ **Complete when:**
- All 8 forms use unified submission system
- All forms save to `form_submissions` table
- All forms send email notifications
- Resume upload works on career form
- No dead buttons on site
- All forms tested and working in production

---

**Inventory Last Updated:** 2025-12-31
