import { createGlobalTheme, createThemeContract } from '@vanilla-extract/css';

export const rawVars = {
  color: {
    black: '#000000',
    white: '#ffffff',
    teal700: '#0f766e',
    slate900: '#0f172a',
    red600: '#dc2626',
    indigo100: '#e0e7ff',
    indigo500: '#6366f1'
  },

  opacity: {
    base: 0.5
  }
};

export const vars = createGlobalTheme(':root', {
  color: {
    black: rawVars.color.black,
    white: rawVars.color.white,
    slate50: '#f8fafc',
    slate100: '#f1f5f9',
    slate200: '#e2e8f0',
    slate300: '#cbd5e1',
    slate400: '#94a3b8',
    slate500: '#64748b',
    slate600: '#475569',
    slate700: '#334155',
    slate800: '#1e293b',
    slate900: rawVars.color.slate900,
    indigo50: '#eef2ff',
    indigo100: rawVars.color.indigo100,
    indigo200: '#c7d2fe',
    indigo300: '#a5b4fc',
    indigo400: '#818cf8',
    indigo500: rawVars.color.indigo500,
    indigo600: '#4f46e5',
    indigo700: '#4338ca',
    indigo800: '#3730a3',
    indigo900: '#312e81',
    teal100: '#ccfbf1',
    teal500: '#14b8a6',
    teal600: '#0d9488',
    teal700: rawVars.color.teal700,
    amber500: '#f59e0b',
    red100: '#fee2e2',
    red600: '#dc2626',
    red700: '#b91c1c'
  },

  fontFamily: {
    body: `'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`
  },

  fontSize: {
    base: '16px',
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2rem'
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  },

  ring: {
    offsetWidth: '2px'
  }
});

export const ringVarsContract = createThemeContract({
  ring: {
    shadow: null,
    offsetShadow: null
  }
});

export const mediaQueries = {
  sm: 'screen and (min-width: 640px)',
  md: 'screen and (min-width: 768px)',
  lg: 'screen and (min-width: 1024px)',
  xl: 'screen and (min-width: 1280px)',
  dark: '(prefers-color-scheme: dark)'
};
