/**
 * Syntra Production Output Card
 * Displays active production capabilities — row layout, no boxes
 */

class ProductionOutputCard {
    constructor() {
        this.materials = [
            {
                symbol: 'Li',
                name: 'LITHIUM',
                capability: 'Pure grade salts'
            },
            {
                symbol: 'Ni',
                name: 'NICKEL',
                capability: 'Pure grade salt & metal'
            },
            {
                symbol: 'Co',
                name: 'COBALT',
                capability: 'Pure grade salt'
            },
            {
                symbol: 'Mn',
                name: 'MANGANESE',
                capability: 'Pure grade salt & EMM'
            },
            {
                symbol: 'Cu',
                name: 'COPPER',
                capability: 'Pure grade salts & cathode'
            },
            {
                symbol: 'Al',
                name: 'ALUMINUM',
                capability: 'Select'
            }
        ];
    }

    render(fullWidth = false) {
        const sizeClass = fullWidth ? 'w-full' : 'w-full max-w-[460px]';
        return `
            <div class="${sizeClass} border border-syntra-border shadow-xl">
                <div class="bg-white overflow-hidden">
                <!-- Accent Bar -->
                <div class="h-1.5 bg-gradient-to-r from-syntra-accent via-yellow-400 to-syntra-accent"></div>

                <!-- Header -->
                <div class="px-6 py-5 border-b border-syntra-border">
                    <div class="flex items-start justify-between">
                        <div>
                            <h3 class="font-head text-xl font-bold text-syntra-text uppercase tracking-tight leading-tight">Production Output</h3>
                            <p class="font-mono text-[10px] text-syntra-muted tracking-widest uppercase mt-1.5">Active Capabilities</p>
                        </div>
                        <div class="flex flex-col items-end gap-1">
                            <div class="flex items-center gap-2">
                                <span class="relative flex h-2 w-2">
                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                            </div>
                            <span class="font-mono text-[10px] text-green-600 font-bold tracking-wider">ONLINE</span>
                        </div>
                    </div>
                </div>

                <!-- Materials List -->
                <div class="${fullWidth ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x-0 sm:divide-x divide-y sm:divide-y-0 divide-syntra-border' : ''}">
                    ${this.materials.map((material, index) => `
                        <div class="${fullWidth ? 'flex flex-col items-start gap-2 px-6 py-5 border-b border-syntra-border lg:border-b-0 lg:border-r' : 'flex items-center gap-6 px-6 py-4 ' + (index < this.materials.length - 1 ? 'border-b border-syntra-border' : '')}">
                            <span class="font-head ${fullWidth ? 'text-5xl' : 'text-4xl'} font-bold text-syntra-text ${fullWidth ? '' : 'w-12 shrink-0'} leading-none">${material.symbol}</span>
                            <div class="${fullWidth ? 'w-full' : 'min-w-0 flex-1'}">
                                <p class="font-mono text-[10px] text-syntra-muted uppercase tracking-widest mb-0.5">${material.name}</p>
                                <p class="font-sans text-sm font-medium text-slate-600 leading-snug">${material.capability}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Footer CTA -->
                <div class="px-6 py-5 border-t border-syntra-border flex justify-center">
                    <a href="contact.html" class="font-mono text-xs text-syntra-tech uppercase tracking-widest hover:text-syntra-amber transition-colors duration-300 font-medium">
                        Request Technical Data Sheets
                    </a>
                </div>
                </div>
            </div>
        `;
    }
}

// Initialize and render production output card
function initProductionOutputCard(containerId = 'production-output-card', fullWidth = false) {
    const container = document.getElementById(containerId);
    if (!container) {
        return;
    }

    const card = new ProductionOutputCard();
    container.innerHTML = card.render(fullWidth);
}

function initAllProductionOutputCards() {
    const heroContainer = document.getElementById('production-output-card');
    if (heroContainer) {
        initProductionOutputCard('production-output-card', false);
    }
    const outputContainer = document.getElementById('production-output-card-output');
    if (outputContainer) {
        initProductionOutputCard('production-output-card-output', true);
    }
}

// Auto-initialize on page load
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllProductionOutputCards);
    } else {
        initAllProductionOutputCards();
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProductionOutputCard, initProductionOutputCard };
}
