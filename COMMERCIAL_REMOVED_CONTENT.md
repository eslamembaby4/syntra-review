# Removed Content from commercial.html

## 1. Hero Metrics Card — "COMMERCIAL OPERATIONS / CURRENT PLATFORM METRICS"

Location: Inside `<header>` hero section, `.hero-metrics-card` div (lines ~573–607)

```html
<div class="hero-metrics-card" data-animate>
    <div class="bg-white p-8" style="box-shadow: 0 10px 40px rgba(0,0,0,0.08); border-top: 3px solid #0891B2;">
        <div class="flex justify-between items-start mb-6 pb-4" style="border-bottom: 1px solid #E2E8F0;">
            <div>
                <h2 class="font-head text-xl font-bold uppercase mb-1" style="color: #0B1120;">COMMERCIAL OPERATIONS</h2>
                <p class="font-mono text-xs uppercase tracking-wide" style="color: #94A3B8;">CURRENT PLATFORM METRICS</p>
            </div>
            <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                <span class="font-mono text-[10px] uppercase tracking-widest" style="color: #94A3B8;">Live</span>
            </div>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr style="border-bottom: 2px solid #E2E8F0;">
                        <th class="text-left pb-3 font-mono text-[10px] uppercase tracking-wide" style="color: #94A3B8;">Category</th>
                        <th class="text-right pb-3 font-mono text-[10px] uppercase tracking-wide" style="color: #94A3B8;">Current</th>
                        <th class="text-right pb-3 font-mono text-[10px] uppercase tracking-wide" style="color: #94A3B8;">Target</th>
                        <th class="text-right pb-3 font-mono text-[10px] uppercase tracking-wide" style="color: #94A3B8;">Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid #F1F5F9;">
                        <td class="py-4 font-mono text-xs" style="color: #64748B;">Annual Capacity</td>
                        <td class="py-4 text-right font-head text-lg font-bold" style="color: #0B1120;">1,000 TPA</td>
                        <td class="py-4 text-right font-head text-lg font-bold" style="color: #0891B2;">50,000 TPA</td>
                        <td class="py-4 text-right text-[10px]" style="color: #94A3B8;">Scaling target 50,000 TPA</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
```

---

## 2. Platform Intro Band — "COMMERCIAL FACILITY / Feedstock-Agnostic, Closed-Loop Chemistry"

Location: `<section class="py-14 bg-white border-b border-slate-100">` (lines ~612–628)

```html
<section class="py-14 bg-white border-b border-slate-100">
    <div class="container mx-auto px-6">
            <div class="mb-8">
                <span class="inline-block px-4 py-2 font-bold text-xs tracking-wider uppercase mb-6" style="background-color: rgba(8, 145, 178, 0.15); color: #0891B2;">COMMERCIAL FACILITY</span>
                <h2 class="font-head text-3xl sm:text-4xl md:text-5xl font-bold uppercase leading-tight mb-4" style="color: #0B1120;">Feedstock-Agnostic,<br>Closed-Loop Chemistry</h2>
                <div class="space-y-8 text-lg text-slate-700 leading-relaxed border-l-4 border-syntra-accent pl-8 max-w-5xl">
                    <p class="text-base sm:text-lg md:text-xl font-light" style="color: #0B1120;">
                        The facility accepts lithium-ion black mass, spodumene concentrates, nickel sulfide concentrates, and cathode manufacturing scrap.
                    </p>
                    <p>
                        All feedstocks flow through the same unit operations, with process parameters adjusted in real time by proprietary digital twin models — delivering battery-grade output at current capacity of 1,000 TPA, scaling to 50,000 TPA.
                    </p>
                </div>
            </div>
    </div>
</section>
```

---

## 3. Capabilities Section — "OUR CAPABILITIES / POWERING THE CRITICAL MINERALS ECONOMY"

Location: Dark navy `<section>` with grid background (lines ~630–711), plus inline `<script>` for canvas animations (lines ~713–969)

Contains:
- Section label: OUR CAPABILITIES
- Heading: POWERING THE CRITICAL MINERALS ECONOMY
- Subtext: Syntra is deploying a distributed refining network and modular capacity infrastructure across North America
- 3 capability stat cards:
  - ADVANCED REFINING — 99% PURITY — Proprietary purification technology
  - PRODUCTION OUTPUT — 1000 TPA — Current facility capacity
  - GLOBAL NETWORK — 10+ PARTNERS — Across 3 continents
- Facility status bar: CONTACT FOR CAPACITY AVAILABILITY | 97 UPTIME % | 24 HRS/DAY | 365 DAYS/YR
- Inline canvas animation script for sparklines and animated icons

---

## 4. Value Proposition Section — "STRATEGIC VALUE / Partnership Advantages"

Location: `<section class="py-28 bg-white">` (lines ~971–1018)

Contains:
- Label: STRATEGIC VALUE
- Heading: Partnership Advantages
- Intro: Organizations partner with Syntra to secure access to North American refining capacity while mitigating supply chain risk, improving operational predictability, and advancing sustainability objectives.
- 4 value cards:
  - **Supply Chain Resilience**: Domestic refining infrastructure eliminates dependence on offshore processing networks and reduces exposure to geopolitical supply disruptions. Partners secure transparent, reliable access to critical minerals capacity within North America's industrial ecosystem.
  - **Qualification-Ready Outputs**: Select outputs can be produced to customer-specific purity requirements with comprehensive documentation, analytical data, and quality certifications. This qualification-ready approach reduces supplier approval timelines and eliminates reprocessing needs, accelerating time-to-production for downstream manufacturing.
  - **Environmental Superiority**: Engineered to meet stringent environmental standards and support corporate ESG commitments. Zero liquid discharge systems, closed-loop processing, and transparent emissions reporting align with partner sustainability mandates and regulatory requirements.
  - **Modular Scalability**: Modular node architecture supports incremental capacity expansion aligned with partner demand trajectories. This distributed approach eliminates the need for premature capital commitments to oversized centralized facilities that exceed near-term production requirements.
