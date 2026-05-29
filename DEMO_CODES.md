# Syntra Refining - Demo Access Information

## Observer Portal Access

**Access URL:** `/observer.html`

**Demo Tokens:**
- `OBSERVER2025`
- `OBS-DEMO-001`
- `OBS-2025-DEMO`

**Features:**
- Single access token field (no email required)
- Session-based authentication persists on refresh
- "Request Observer Status" link redirects to partner ecosystem form (`index.html#partner-ecosystem-access`)
- No demo tokens displayed on login page

## Supplier Portal Access

**Access URL:** `/supplier.html`

**Demo Tokens:**
- `SUPPLIER001`
- `SUPPLIER002`
- `DEMO2026`

**Features:**
- Single access token field (no email required)
- Session-based authentication persists on refresh
- "Register as Supplier" link redirects to partner ecosystem form (`index.html#partner-ecosystem-access`)
- No demo tokens displayed on login page
- Dashboard includes RFQ listings, document submission, and supplier resources

## How Forms Work Now

### All Form Submissions
- **Dynamic submission** - Forms submit via AJAX to Supabase database
- **No page redirects** - Success/error messages appear on the same page
- **Reference ID tracking** - Each submission gets a unique ID (format: SR-REQ-000001)
- **No demo codes visible** - All hardcoded tokens have been removed from the UI

### Available Forms

1. **Partner Ecosystem Access** (index.html#partner-ecosystem-access)
   - Form Type: `partner_inquiry`
   - Collects: Name, organization, email, interest type, message
   - Reference ID format: SR-REQ-######

2. **Investor Relations** (investor.html)
   - Form Type: `investor_inquiry`
   - Collects: Name, organization, email, interest type, message
   - Reference ID format: SR-REQ-######

3. **Supplier Registration** (supplier.html)
   - Form Type: `supplier_registration`
   - Collects: Name, organization, email, material type, details
   - Reference ID format: SR-REQ-######

4. **RFQ Response** (supplier.html - Supplier Dashboard)
   - Form Type: `rfq_response`
   - Opens in modal dialog
   - Collects: Company name, contact name, email, phone, volume, pricing, details
   - Reference ID format: SR-REQ-######

5. **Document Submission** (supplier.html - Supplier Dashboard)
   - Form Type: `supplier_document`
   - Collects: Company name, email, document type, notes
   - Reference ID format: SR-REQ-######

## Viewing Submissions

All form submissions can be viewed at:
- **URL**: `/admin.html`
- **Features**:
  - View all submissions with filters
  - Mark as read/unread
  - See reference IDs
  - Filter by form type and status
  - Real-time stats dashboard

## Database Structure

All submissions are stored in the `form_submissions` table with:
- Automatic reference ID generation
- Form type classification
- Read/unread status tracking
- Timestamps
- Additional metadata in JSON format

## Email Notifications

### Automatic Email Routing

Every form submission automatically sends an email notification to the appropriate department:

**Email Addresses by Form Type:**
- Partner Inquiry → commercial@syntrarefining.com
- Investor Inquiry → investors@syntrarefining.com
- Supplier Registration → purchasing@syntrarefining.com
- RFQ Response → purchasing@syntrarefining.com
- Supplier Document → purchasing@syntrarefining.com
- TDS Request → commercial@syntrarefining.com
- HSE/SDS Inquiry → hse@syntrarefining.com
- Career Applications → careers@syntrarefining.com

**Email Content Includes:**
- Reference ID for tracking
- All form field data
- Submission timestamp
- Link to admin dashboard

**Setup Required:** Email service integration (Resend/SendGrid) - see `/EMAIL_ROUTING_SETUP.md`

## Security Notes

- **Public Access**: Anyone can submit forms (anonymous access enabled)
- **Admin Access**: Only authenticated users can view submissions
- **Observer Portal**: Protected by demo access tokens (OBSERVER2025, OBS-DEMO-001, OBS-2025-DEMO)
- **Supplier Portal**: Protected by demo access tokens (SUPPLIER001, SUPPLIER002, DEMO2026)
- **RLS Enabled**: Row Level Security policies protect all data
- **Email Notifications**: Routed to department emails automatically
- **Session Management**: Portal logins persist via sessionStorage
