/**
 * Syntra Data Tables - Animated metric displays
 * Professional animated tables for key business metrics
 */

class SyntraDataTable {
  constructor(container, config) {
    this.container = container;
    this.config = config;
    this.hasAnimated = false;
    this.init();
  }

  init() {
    this.render();
    this.setupObserver();
  }

  render() {
    const { title, subtitle, columns, rows, theme = 'default' } = this.config;

    const themeClasses = {
      default: 'bg-white/90 backdrop-blur-sm border-syntra-border',
      dark: 'bg-syntra-midnight/95 backdrop-blur-md border-white/10 text-white',
      amber: 'bg-gradient-to-br from-syntra-amber/10 to-yellow-50/80 backdrop-blur-sm border-syntra-accent',
      tech: 'bg-gradient-to-br from-syntra-tech/5 to-cyan-50/80 backdrop-blur-sm border-syntra-tech/30'
    };

    const html = `
      <div class="syntra-data-table ${themeClasses[theme]} border rounded-lg shadow-md overflow-hidden opacity-0 transform translate-y-8 transition-all duration-1000">
        <div class="px-3 py-2 border-b ${theme === 'dark' ? 'border-white/10' : 'border-syntra-border'}">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-head text-base font-bold uppercase tracking-tight ${theme === 'dark' ? 'text-white' : 'text-syntra-text'}">${title}</h3>
              ${subtitle ? `<p class="font-mono text-xs uppercase tracking-wider mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-syntra-muted'}">${subtitle}</p>` : ''}
            </div>
            <div class="status-pulse-small ${theme === 'dark' ? 'bg-syntra-accent' : 'bg-syntra-tech'}"></div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="${theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'}">
                ${columns.map((col, i) => `
                  <th class="px-3 py-1.5 text-left font-mono text-xs uppercase tracking-wider ${theme === 'dark' ? 'text-slate-300' : 'text-syntra-muted'} font-bold" style="animation-delay: ${i * 100}ms">
                    ${col.label}
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              ${rows.map((row, rowIndex) => `
                <tr class="border-t ${theme === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-syntra-border hover:bg-slate-50/50'} transition-colors duration-200" style="animation-delay: ${(rowIndex + 1) * 150}ms">
                  ${columns.map((col, colIndex) => {
                    const value = row[col.key];
                    const isNumeric = col.type === 'number';
                    const isHighlight = col.highlight && row[col.key + '_highlight'];

                    return `
                      <td class="px-3 py-2 text-sm text-left ${colIndex === 0 ? 'font-semibold' : ''} ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}">
                        ${isNumeric
                          ? `<span class="syntra-counter font-head text-sm font-bold ${isHighlight ? 'text-syntra-accent' : theme === 'dark' ? 'text-white' : 'text-syntra-text'}" data-target="${value}" data-suffix="${col.suffix || ''}" data-prefix="${col.prefix || ''}">0</span>`
                          : `<span class="inline-flex items-center gap-1.5">${value}</span>`
                        }
                      </td>
                    `;
                  }).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    this.container.innerHTML = html;
    this.tableElement = this.container.querySelector('.syntra-data-table');
  }

  setupObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.animate();
          this.hasAnimated = true;
        }
      });
    }, { threshold: 0.2 });

    observer.observe(this.tableElement);
  }

  animate() {
    this.tableElement.classList.remove('opacity-0', 'translate-y-8');

    setTimeout(() => {
      this.animateCounters();
    }, 300);
  }

  animateCounters() {
    const counters = this.tableElement.querySelectorAll('.syntra-counter');

    counters.forEach((counter, index) => {
      const target = parseFloat(counter.dataset.target);
      const suffix = counter.dataset.suffix || '';
      const prefix = counter.dataset.prefix || '';
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      const stepDuration = duration / steps;

      let current = 0;

      setTimeout(() => {
        const interval = setInterval(() => {
          current += increment;

          if (current >= target) {
            current = target;
            clearInterval(interval);
          }

          let displayValue = current;
          if (target >= 1000) {
            displayValue = Math.round(current);
          } else if (target >= 10) {
            displayValue = current.toFixed(1);
          } else {
            displayValue = current.toFixed(2);
          }

          counter.textContent = `${prefix}${displayValue}${suffix}`;
        }, stepDuration);
      }, index * 100);
    });
  }
}

// Auto-initialize tables
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-syntra-table]').forEach(element => {
    const configName = element.dataset.syntraTable;
    const config = window.SYNTRA_TABLE_CONFIGS?.[configName];

    if (config) {
      new SyntraDataTable(element, config);
    }
  });
});

// CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
  .status-pulse {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    animation: pulse-dot 2s ease-in-out infinite;
    box-shadow: 0 0 0 0 currentColor;
  }

  .status-pulse-small {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    animation: pulse-dot 2s ease-in-out infinite;
    box-shadow: 0 0 0 0 currentColor;
  }

  @keyframes pulse-dot {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.1);
    }
  }

  .syntra-data-table tbody tr {
    opacity: 0;
    animation: fadeInUp 0.6s ease-out forwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .syntra-data-table thead th {
    opacity: 0;
    animation: fadeIn 0.5s ease-out forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(style);
