import { style } from '@vanilla-extract/css';

import { rawVars } from './../../../styles/vars.css';
import { convertHexToRGBA } from '../../../lib/utils';
import { vars, mediaQueries } from '../../../styles/vars.css';

const header = {
  base: style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: vars.color.slate600,
    gap: '1rem',
    flexDirection: 'column',
    marginBottom: '2rem',
    '@media': {
      [mediaQueries.lg]: {
        gap: '1.5rem'
      }
    }
  }),

  div: style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: '1rem',
    '@media': {
      [mediaQueries.md]: {
        flexDirection: 'row'
      }
    }
  }),

  checkbox: {
    container: style({
      position: 'relative',
      display: 'flex',
      height: 'fit-content',
      alignItems: 'center',
      borderRadius: '0.375rem',
      backgroundColor: vars.color.white,
      flexShrink: 1,
      padding: '0.75rem 1.25rem',
      color: vars.color.slate600,
      '@media': {
        [mediaQueries.dark]: {
          backgroundColor: convertHexToRGBA(rawVars.color.black, 0.3),
          color: vars.color.slate300
        }
      }
    })
  },

  p: style({
    fontSize: '1rem',
    lineHeight: '1.5rem',
    color: vars.color.slate600,
    '@media': {
      [mediaQueries.dark]: {
        color: vars.color.slate300
      }
    }
  })
};

const section = {
  base: style({
    scrollMarginTop: '5.5rem'
  }),

  title: style({
    marginTop: '2rem',
    marginBottom: '2.5rem',
    fontSize: '1.75rem',
    fontWeight: '600',
    '@media': {
      [mediaQueries.dark]: {
        color: vars.color.white
      }
    }
  }),

  grid: style({
    display: 'grid',
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    gap: '1.5rem',
    '@media': {
      [mediaQueries.sm]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
      },
      [mediaQueries.md]: {
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
      },
      [mediaQueries.lg]: {
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))'
      }
    }
  })
};

const results = {
  noresults: style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    fontWeight: vars.fontWeight.medium,
    fontSize: '1.25rem',
    color: vars.color.slate700,
    gap: '1rem',
    '@media': {
      [mediaQueries.dark]: {
        color: vars.color.slate300
      }
    }
  })
};

export const styles = {
  section,
  header,
  results
};
