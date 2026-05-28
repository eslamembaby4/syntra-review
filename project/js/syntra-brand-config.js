/*
  SYNTRA BRAND TAILWIND CONFIGURATION
  Exact brand colors from SYNTRA Brand Guidelines 2026
*/

tailwind.config = {
  theme: {
    extend: {
      colors: {
        syntra: {
          // Primary Colors (exact hex from brand brief)
          'midnight-navy': '#0B1120',
          'signal-yellow': '#FFD700',
          'deep-slate': '#0F172A',
          'slate-50': '#F9FAFC',
          'white': '#FFFFFF',

          // Secondary Colors (use sparingly)
          'cyan': '#0891B2',
          'slate-300': '#CBD5E1',
          'slate-400': '#94A3B8',
          'slate-500': '#64748B',
          'slate-800': '#1E293B',
        }
      },
      fontFamily: {
        // Typography per brand brief
        'heading': ['Oswald', 'sans-serif'],  // Headings: Oswald Bold only
        'body': ['Inter', 'sans-serif'],      // Body: Inter Light (Medium for emphasis)
        'mono': ['JetBrains Mono', 'monospace'], // Data/Specs/Nav: JetBrains Mono Light
      },
      borderRadius: {
        // Reduced radius for sharp premium feel
        'brand-sm': '2px',
        'brand-md': '4px',
        'brand-lg': '6px',
        'none': '0',
      },
      spacing: {
        // Standard spacing scale
        'brand-xs': '0.5rem',
        'brand-sm': '1rem',
        'brand-md': '1.5rem',
        'brand-lg': '2rem',
        'brand-xl': '3rem',
        'brand-2xl': '4rem',
        'brand-3xl': '6rem',
      }
    }
  }
};
