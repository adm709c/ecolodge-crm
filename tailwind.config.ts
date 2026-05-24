import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Eco-Chic Palette
        'eco': {
          '50': '#f8fdf6',
          '100': '#f0fbed',
          '200': '#ddf5d5',
          '300': '#c4e9b3',
          '400': '#a3d986',
          '500': '#7ec456',
          '600': '#5fa842',
          '700': '#4a8535',
          '800': '#3d6a2b',
          '900': '#325624',
        },
        'sage': {
          '50': '#f6f9f6',
          '100': '#eff3ee',
          '200': '#d4e5d1',
          '300': '#b8d5b0',
          '400': '#8eb77d',
          '500': '#6b9d5f',
          '600': '#527c47',
          '700': '#435f3a',
          '800': '#374c31',
          '900': '#2d3d28',
        },
        'sand': {
          '50': '#fffdfb',
          '100': '#fef9f3',
          '200': '#fce4c7',
          '300': '#f8d1a5',
          '400': '#f5b877',
          '500': '#f09a4a',
          '600': '#d97f32',
          '700': '#c46828',
          '800': '#a85522',
          '900': '#8a441d',
        },
        'terracotta': {
          '50': '#fef8f6',
          '100': '#fdefea',
          '200': '#faccc4',
          '300': '#f7a89b',
          '400': '#f27d6e',
          '500': '#e8543d',
          '600': '#d43d2a',
          '700': '#b82f21',
          '800': '#9e261b',
          '900': '#7d1f15',
        },
        'cream': '#faf7f2',
        'charcoal': '#2c2c24',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};

export default config;
