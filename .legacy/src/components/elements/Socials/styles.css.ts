import { style } from '@vanilla-extract/css';
import { vars, mediaQueries } from '../../../styles/vars.css';
import { animationTiming } from './../../../styles/common.css';

const common = style({
  display: 'flex',
  columnGap: '0.5rem',
  '@media': {
    [mediaQueries.lg]: {
      marginLeft: '0.75rem',
      alignItems: 'center'
    }
  }
});

const section = {
  base: style([
    common,
    {
      display: 'flex',
      flexDirection: 'column',
      rowGap: '0.75rem',
      marginTop: '0.25rem',
      paddingBottom: '1.5rem',
      '@media': {
        [mediaQueries.lg]: {
          marginTop: 0,
          flexDirection: 'row',
          columnGap: '0.5rem',
          paddingBottom: 0
        }
      }
    }
  ]),

  div: style([
    common,
    {
      marginLeft: '0.75rem'
    }
  ]),

  a: style({
    display: 'block',
    borderRadius: '0.375rem',
    padding: '0.5rem 0.75rem',
    fontSize: '1rem',
    fontWeight: vars.fontWeight.medium,
    color: vars.color.slate900,
    width: 'fit-content',
    transition: `color 0.15s ${animationTiming}`,
    ':hover': {
      backgroundColor: vars.color.slate100
    },
    '@media': {
      [mediaQueries.lg]: {
        width: 'auto',
        color: vars.color.slate500,
        ':hover': {
          color: vars.color.slate900
        }
      },
      [mediaQueries.dark]: {
        color: vars.color.slate100,
        ':hover': {
          backgroundColor: vars.color.slate900
        }
      },
      [`${mediaQueries.lg} and ${mediaQueries.dark}`]: {
        color: vars.color.slate300,
        ':hover': {
          color: vars.color.slate100
        }
      }
    }
  }),

  svg: style({
    width: '1.5rem',
    height: '1.5rem',
    cursor: 'pointer',
    verticalAlign: '-0.125rem',
    transition: `color 0.15s ${animationTiming}`,
    color: vars.color.slate600,
    ':hover': {
      color: vars.color.slate800
    },
    '@media': {
      [mediaQueries.dark]: {
        color: vars.color.slate400,
        ':hover': {
          color: vars.color.slate100
        }
      }
    }
  })
};

export const styles = { section };
