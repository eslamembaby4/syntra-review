/**
 * Syntra Metrics Header Card - Hero Right Floating Version
 * Reusable compact metrics card for hero sections
 */

class MetricsHeaderCard {
    constructor(config = {}) {
        this.title = config.title || 'COMPANY OVERVIEW';
        this.subtitle = config.subtitle || 'ORGANIZATIONAL METRICS';
        this.metrics = config.metrics || this.getDefaultMetrics();
    }

    getDefaultMetrics() {
        return [
            {
                category: 'Team Members',
                current: '16',
                yoyGrowth: '80 Capacity',
                details: 'Engineering-focused'
            },
            {
                category: 'Patents Filed',
                current: '8.00',
                yoyGrowth: '300.0%',
                details: 'Process IP'
            },
            {
                category: 'Strategic Partners',
                current: '12.0',
                yoyGrowth: '50.0%',
                details: 'Global reach'
            },
            {
                category: 'Years in R&D',
                current: '7.00',
                yoyGrowth: '17.0%',
                details: 'Technology development'
            }
        ];
    }

    render() {
        return `
            <div class="w-full bg-white rounded-xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <!-- Card Header -->
                <div class="border-b border-slate-200 px-5 py-4 bg-slate-50/50 rounded-t-xl flex items-center justify-between">
                    <div>
                        <h3 class="font-head text-base font-bold text-syntra-text uppercase tracking-wide">${this.title}</h3>
                        <p class="font-mono text-[9px] text-slate-500 tracking-widest uppercase mt-0.5">${this.subtitle}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="relative flex h-2 w-2">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                    </div>
                </div>

                <!-- Desktop Table -->
                <div class="hidden md:block p-5">
                    <table class="w-full table-fixed">
                        <thead>
                            <tr class="border-b border-slate-200">
                                <th class="text-left py-2.5 px-2 font-mono text-[9px] text-slate-500 uppercase tracking-widest font-bold w-[32%]">Category</th>
                                <th class="text-right py-2.5 px-2 font-mono text-[9px] text-slate-500 uppercase tracking-widest font-bold w-[18%]">Current</th>
                                <th class="text-right py-2.5 px-2 font-mono text-[9px] text-slate-500 uppercase tracking-widest font-bold w-[18%]">Target</th>
                                <th class="text-right py-2.5 px-2 font-mono text-[9px] text-slate-500 uppercase tracking-widest font-bold w-[32%]">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.metrics.map((row, index) => `
                                <tr class="border-b border-slate-100 hover:bg-slate-50/50 transition-colors group last:border-0">
                                    <td class="py-3 px-2 font-mono text-[9px] text-slate-500 uppercase tracking-widest font-bold whitespace-nowrap">${row.category}</td>
                                    <td class="py-3 px-2 text-right">
                                        <span class="font-head font-bold text-lg whitespace-nowrap" style="color: #0B1120;">${row.current}</span>
                                    </td>
                                    <td class="py-3 px-2 text-right">
                                        <span class="font-mono text-slate-600 text-xs whitespace-nowrap">${row.yoyGrowth}</span>
                                    </td>
                                    <td class="py-3 px-2 text-right">
                                        <span class="text-slate-500 text-xs whitespace-nowrap">${row.details}</span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <!-- Mobile Cards -->
                <div class="md:hidden p-4 space-y-3">
                    ${this.metrics.map((row) => `
                        <div class="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                            <div class="flex items-start justify-between mb-2">
                                <h4 class="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-bold">${row.category}</h4>
                            </div>
                            <div class="grid grid-cols-3 gap-2 text-xs">
                                <div>
                                    <p class="font-mono text-[9px] text-slate-400 uppercase tracking-wider mb-1">Current</p>
                                    <p class="font-head font-bold text-lg" style="color: #0B1120;">${row.current}</p>
                                </div>
                                <div>
                                    <p class="font-mono text-[9px] text-slate-400 uppercase tracking-wider mb-1">Target</p>
                                    <p class="font-mono text-slate-600">${row.yoyGrowth}</p>
                                </div>
                                <div>
                                    <p class="font-mono text-[9px] text-slate-400 uppercase tracking-wider mb-1">Details</p>
                                    <p class="text-slate-500 text-xs">${row.details}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

// Initialize and render metrics header card in specified container
function initMetricsHeaderCard(containerId = 'metrics-header-card', configNameOrObject = null) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`MetricsHeaderCard: Container with id "${containerId}" not found`);
        return;
    }

    let config = {};

    // If a string is provided, look up the config from SYNTRA_METRICS_CONFIGS
    if (typeof configNameOrObject === 'string') {
        const pageConfig = window.SYNTRA_METRICS_CONFIGS?.[configNameOrObject];
        if (pageConfig) {
            config = pageConfig;
        } else {
            console.warn(`MetricsHeaderCard: Config "${configNameOrObject}" not found in SYNTRA_METRICS_CONFIGS`);
        }
    } else if (configNameOrObject && typeof configNameOrObject === 'object') {
        // If an object is provided, use it directly
        config = configNameOrObject;
    } else {
        // Check if the container has a data attribute specifying which config to use
        const configName = container.dataset.metricsConfig;
        if (configName) {
            const pageConfig = window.SYNTRA_METRICS_CONFIGS?.[configName];
            if (pageConfig) {
                config = pageConfig;
            }
        }
    }

    const card = new MetricsHeaderCard(config);
    container.innerHTML = card.render();
}

// Auto-initialize on page load
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            // Check if container exists before initializing
            const container = document.getElementById('metrics-header-card');
            if (container) {
                const configName = container.dataset.metricsConfig;
                initMetricsHeaderCard('metrics-header-card', configName);
            }
        });
    } else {
        const container = document.getElementById('metrics-header-card');
        if (container) {
            const configName = container.dataset.metricsConfig;
            initMetricsHeaderCard('metrics-header-card', configName);
        }
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MetricsHeaderCard, initMetricsHeaderCard };
}
