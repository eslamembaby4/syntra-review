/**
 * Syntra Talent Signals Card
 * Displays team composition metrics and hiring focus areas
 */

class TalentSignalsCard {
    constructor() {
        this.metrics = [
            {
                area: 'Process & Chemistry',
                percentage: 38
            },
            {
                area: 'Controls & SynCore™',
                percentage: 28
            },
            {
                area: 'Industrial Data',
                percentage: 18
            },
            {
                area: 'Operations',
                percentage: 16
            }
        ];

        this.stats = [
            {
                label: 'Applications',
                value: '420+',
                sublabel: 'IN 2025'
            },
            {
                label: 'Team Satisfaction',
                value: '94%',
                sublabel: 'ENGAGEMENT SCORE'
            }
        ];
    }

    render() {
        return `
            <div class="w-full bg-white rounded-xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <!-- Header -->
                <div class="border-b border-slate-200 bg-gradient-to-r from-white to-slate-50 px-5 py-3.5">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="font-head text-base font-bold text-syntra-text uppercase tracking-tight">Talent Signals</h3>
                            <p class="font-mono text-[9px] text-slate-500 tracking-widest uppercase mt-0.5">Team Composition & Metrics</p>
                        </div>
                        <div class="flex items-center gap-1.5">
                            <span class="relative flex h-2 w-2">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-syntra-tech opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-syntra-tech"></span>
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Stats Grid -->
                <div class="grid grid-cols-2 gap-4 p-5 border-b border-slate-200 bg-slate-50/30">
                    ${this.stats.map(stat => `
                        <div class="text-center py-3 px-2 bg-white rounded border border-slate-100 hover:border-syntra-accent transition-all duration-300 hover:shadow-md group">
                            <div class="font-head text-2xl font-bold text-syntra-accent group-hover:text-syntra-amber transition-colors">${stat.value}</div>
                            <div class="font-mono text-[9px] text-slate-500 uppercase tracking-widest mt-1">${stat.label}</div>
                            <div class="font-mono text-[8px] text-slate-400 uppercase tracking-wider mt-0.5">${stat.sublabel}</div>
                        </div>
                    `).join('')}
                </div>

                <!-- Table -->
                <div class="p-5">
                    <div class="mb-3">
                        <h4 class="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-bold">Current Team Distribution</h4>
                    </div>
                    <table class="w-full table-fixed">
                        <thead>
                            <tr class="border-b border-slate-200">
                                <th class="text-left py-2.5 px-2 font-mono text-[9px] text-slate-500 uppercase tracking-widest font-bold w-[60%]">Focus Area</th>
                                <th class="text-right py-2.5 px-2 font-mono text-[9px] text-slate-500 uppercase tracking-widest font-bold w-[40%]">Team %</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.metrics.map((metric, index) => `
                                <tr class="border-b border-slate-100 hover:bg-slate-50/50 transition-colors group last:border-0">
                                    <td class="py-3 px-2 text-sm font-medium text-syntra-text whitespace-nowrap">${metric.area}</td>
                                    <td class="py-3 px-2 text-right">
                                        <span class="font-mono font-bold text-syntra-amber text-sm group-hover:text-syntra-accent transition-colors">${metric.percentage}%</span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>

                    <!-- Footer Text -->
                    <div class="pt-4 mt-3 border-t border-slate-200">
                        <p class="text-xs text-slate-500 leading-relaxed">
                            We prioritize candidates with hands-on experience shipping production systems: industrial equipment, control software, process optimization, or lab-scale validations.
                        </p>
                    </div>
                </div>
            </div>
        `;
    }
}

// Initialize and render talent signals card
function initTalentSignalsCard(containerId = 'talent-signals-card') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`TalentSignalsCard: Container with id "${containerId}" not found`);
        return;
    }

    const card = new TalentSignalsCard();
    container.innerHTML = card.render();
}

// Auto-initialize on page load
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            const container = document.getElementById('talent-signals-card');
            if (container) {
                initTalentSignalsCard();
            }
        });
    } else {
        const container = document.getElementById('talent-signals-card');
        if (container) {
            initTalentSignalsCard();
        }
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TalentSignalsCard, initTalentSignalsCard };
}
