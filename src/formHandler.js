import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function handleFormSubmission(formType, formData) {
  try {
    const { data, error } = await supabase
      .from('form_submissions')
      .insert([{
        form_type: formType,
        first_name: formData.first_name || formData.name || null,
        last_name: formData.last_name || null,
        email: formData.email,
        company: formData.company || null,
        phone: formData.phone || null,
        message: formData.message || null,
        additional_data: formData.additional_data || {}
      }])
      .select('reference_id')
      .single();

    if (error) throw error;

    const referenceId = data.reference_id;

    await supabase.functions.invoke('send-form-notification', {
      body: {
        formType,
        referenceId,
        formData
      }
    });

    return { success: true, referenceId };
  } catch (error) {
    console.error('Form submission error:', error);
    return { success: false, error: error.message };
  }
}

export function showSuccessMessage(container, referenceId, message) {
  container.innerHTML = `
    <div class="bg-slate-50 border-2 border-cyan-600 rounded-lg p-6 text-center">
      <div class="text-cyan-600 text-5xl mb-4">✓</div>
      <h3 class="text-2xl font-bold text-slate-800 mb-2">Success!</h3>
      <p class="text-slate-700 mb-4">${message || 'Your submission has been received.'}</p>
      <p class="text-sm text-cyan-600">Reference ID: <strong>${referenceId}</strong></p>
      <button onclick="location.reload()" class="mt-4 bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700 transition">
        Submit Another
      </button>
    </div>
  `;
}

export function showErrorMessage(container, error) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'bg-red-50 border-2 border-red-500 rounded-lg p-4 mt-4';
  errorDiv.innerHTML = `
    <p class="text-red-700 font-semibold">Error: ${error}</p>
    <p class="text-red-600 text-sm mt-2">Please try again or contact us directly.</p>
  `;
  container.insertBefore(errorDiv, container.firstChild);
  setTimeout(() => errorDiv.remove(), 5000);
}
