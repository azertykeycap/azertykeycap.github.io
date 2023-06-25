import { style } from '@vanilla-extract/css';
import { mediaQueries, vars } from '../styles/vars.css';

const headingBase = style({
  fontSize: '3rem',
  lineHeight: '1',
  fontWeight: '700',
  letterSpacing: '-0.05em',

  '@media': {
    [mediaQueries.sm]: {
      fontSize: '4.5rem',
      lineHeight: '1'
    }
  }
});

const index = {
  base: style({
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '3.5rem'
  }),

  section: style({
    display: 'grid',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '2rem',
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    gap: '2rem',
    gridAutoRows: 'minmax(0, 1fr)',

    '@media': {
      [mediaQueries.lg]: {
        marginLeft: '0',
        marginRight: '0',
        maxWidth: 'none',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
      }
    }
  }),

  h1: {
    heading: style([
      headingBase,
      {
        color: vars.color.indigo600,

        '@media': {
          [mediaQueries.dark]: {
            color: vars.color.indigo400
          }
        }
      }
    ]),

    text: style([
      headingBase,
      {
        color: vars.color.slate800,

        '@media': {
          [mediaQueries.dark]: {
            color: vars.color.slate200
          }
        }
      }
    ])
  }
};

export const styles = { index };
