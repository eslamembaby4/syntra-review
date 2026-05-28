/**
 * Syntra Career Listings - Dynamic Job Board
 * Fetches and renders job listings from Supabase
 */

(async function() {
  if (typeof window.supabaseClient === 'undefined') {
    console.error('Supabase client not initialized');
    return;
  }

  const jobListingsContainer = document.getElementById('job-listings-container');
  const jobCountBadge = document.getElementById('job-count-badge');

  if (!jobListingsContainer) {
    console.log('Job listings container not found on this page');
    return;
  }

  try {
    const { data: jobs, error } = await window.supabaseClient
      .from('job_listings')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching job listings:', error);
      renderFallback();
      return;
    }

    if (!jobs || jobs.length === 0) {
      renderEmptyState();
      return;
    }

    if (jobCountBadge) {
      jobCountBadge.textContent = jobs.length;
      jobCountBadge.classList.add('animate-in');
    }

    renderJobListings(jobs);
  } catch (err) {
    console.error('Error loading job listings:', err);
    renderFallback();
  }
})();

function renderJobListings(jobs) {
  const container = document.getElementById('job-listings-container');

  const jobCards = jobs.map((job, index) => {
    const responsibilities = Array.isArray(job.key_responsibilities)
      ? job.key_responsibilities
      : [];

    return `
      <article
        class="job-card bg-syntra-base border border-syntra-border rounded-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:border-syntra-tech transition-all duration-300 opacity-0"
        style="animation: slideInUp 0.6s ease-out ${index * 0.1}s forwards;"
      >
        <div class="flex-1">
          <h3 class="font-head text-2xl font-bold uppercase">
            <span class="text-syntra-tech">${escapeHtml(job.title)}</span>
          </h3>
          <p class="font-mono text-[11px] text-syntra-muted uppercase mt-1">
            ${escapeHtml(job.work_type)} • ${escapeHtml(job.location)} • ${escapeHtml(job.work_arrangement)} •
            <span class="text-syntra-tech">${escapeHtml(job.compensation)}</span>
          </p>
          <p class="text-sm text-slate-600 mt-3 max-w-xl leading-relaxed">
            ${formatDescription(job.description)}
          </p>
          ${responsibilities.length > 0 ? `
            <p class="text-xs text-slate-500 mt-3 font-semibold">
              ${responsibilities.map(resp => `→ ${escapeHtml(resp)}`).join('<br>')}
            </p>
          ` : ''}
        </div>
        <div class="flex flex-col items-start md:items-end gap-2">
          <span class="text-[11px] font-mono text-slate-500 uppercase">${escapeHtml(job.department)}</span>
          <button
            onclick="openApplicationModal('${escapeHtml(job.title)}')"
            class="inline-flex items-center gap-2 px-4 py-2 bg-syntra-accent text-syntra-midnight text-xs font-head font-bold uppercase rounded hover:bg-yellow-400 transition-all duration-200 hover:scale-105 shadow-sm shadow-yellow-500/20"
          >
            Apply Now
          </button>
        </div>
      </article>
    `;
  }).join('');

  container.innerHTML = jobCards;
}

function formatDescription(description) {
  return escapeHtml(description)
    .replace(/\*\*(.*?)\*\*/g, '<span class="text-syntra-tech font-semibold">$1</span>')
    .replace(/SynCore™/g, '<span class="text-syntra-tech font-semibold">SynCore™</span>')
    .replace(/PLC\/DCS/g, '<span class="text-syntra-tech font-semibold">PLC/DCS</span>')
    .replace(/SCADA/g, '<span class="text-syntra-tech font-semibold">SCADA</span>');
}

function renderEmptyState() {
  const container = document.getElementById('job-listings-container');
  container.innerHTML = `
    <div class="bg-slate-50 border border-syntra-border rounded-sm p-12 text-center">
      <div class="max-w-md mx-auto">
        <div class="text-6xl mb-4">💼</div>
        <h3 class="font-head text-2xl font-bold uppercase text-syntra-text mb-3">No Active Openings</h3>
        <p class="text-slate-600 mb-6">
          We don't have any open positions right now, but we're always looking for exceptional talent.
        </p>
        <button
          onclick="openApplicationModal('General Application')"
          class="inline-flex items-center gap-2 px-6 py-3 bg-syntra-accent text-syntra-midnight font-head font-bold text-sm uppercase rounded hover:bg-yellow-400 transition-colors shadow-md shadow-yellow-500/20"
        >
          Submit General Application
        </button>
      </div>
    </div>
  `;
}

function renderFallback() {
  const container = document.getElementById('job-listings-container');
  container.innerHTML = `
    <div class="bg-cyan-50 border border-cyan-200 rounded-sm p-6 text-center">
      <p class="text-slate-800 font-mono text-sm">
        Unable to load job listings. Please email
        <a href="mailto:careers@syntrarefining.com" class="text-syntra-tech font-bold hover:underline">
          careers@syntrarefining.com
        </a>
        for current opportunities.
      </p>
    </div>
  `;
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
