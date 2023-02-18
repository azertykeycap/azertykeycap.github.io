import { style } from '@vanilla-extract/css';

import { rawVars } from './../../../styles/vars.css';
import { convertHexToRGBA } from '../../../lib/utils';
import { vars, mediaQueries } from '../../../styles/vars.css';

const container = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '0.375rem',
  backgroundColor: vars.color.white,
  padding: '0.75rem 1.25rem',
  color: vars.color.slate600,
  width: 'fit-content',
  '@media': {
    [mediaQueries.dark]: {
      backgroundColor: convertHexToRGBA(rawVars.color.black, 0.3),
      color: vars.color.slate100
    }
  }
});

const title = style({
  marginTop: '2.5rem',
  marginBottom: '3rem',
  fontSize: '1.25rem',
  fontWeight: '600',
  '@media': {
    [mediaQueries.dark]: {
      color: vars.color.white
    }
  }
});

const grid = style({
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
});

export const styles = {
  container,
  title,
  grid
};
