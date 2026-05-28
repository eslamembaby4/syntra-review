// NOTE: Update these values with your own Supabase project credentials
// Get them from: https://supabase.com/dashboard/project/_/settings/api
// These values are safe to expose in client-side code (protected by RLS)
const SUPABASE_URL = 'https://woailjjdiamgvahcxnrj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvYWlsampkaWFtZ3ZhaGN4bnJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxOTQxODAsImV4cCI6MjA4Mjc3MDE4MH0.M7F-J8Ael6RwEuHy9XmJUYNXLhaVSo7ra_YWZGjeF9Y';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.supabaseClient = supabase;
window.supabaseUrl = SUPABASE_URL;
window.supabaseAnonKey = SUPABASE_ANON_KEY;

async function submitFormToDatabase(formData) {
  try {
    const { data, error } = await supabase
      .from('form_submissions')
      .insert([formData])
      .select();

    if (error) throw error;

    // Send email notification to appropriate department
    await sendEmailNotification(data[0]);

    return { success: true, data };
  } catch (error) {
    console.error('Error submitting form:', error);
    return { success: false, error: error.message };
  }
}

async function sendEmailNotification(submissionData) {
  try {
    const apiUrl = `${SUPABASE_URL}/functions/v1/send-form-notification`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formType: submissionData.form_type,
        referenceId: submissionData.reference_id,
        formData: submissionData,
      }),
    });

    if (!response.ok) {
      console.warn('Failed to send email notification:', await response.text());
    } else {
      const result = await response.json();
      console.log('Email notification sent to:', result.destinationEmail);
    }
  } catch (error) {
    console.warn('Error sending email notification:', error);
    // Don't throw - we don't want to fail the form submission if email fails
  }
}
