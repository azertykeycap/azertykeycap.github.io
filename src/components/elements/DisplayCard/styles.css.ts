import { style, styleVariants } from '@vanilla-extract/css';
import { mediaQueries, rawVars, vars } from '../../../styles/vars.css';
import { animationTiming } from '../../../styles/common.css';
import { convertHexToRGBA } from '../../../lib/utils';

const gradientBase = style({
  position: 'absolute',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  zIndex: -10
});

const buttonBase = style({
  width: '100%',
  flex: '1 1 0',
  padding: '0.5rem',
  borderRadius: '0.375rem',
  textAlign: 'center',
  fontWeight: vars.fontWeight.semibold,
  transition: `background-color 0.15s ${animationTiming}`,
  ':focus': {
    outlineOffset: '2px',
    outline: `2px solid ${vars.color.indigo600}`
  }
});

const card = {
  base: style({
    display: 'flex',
    isolation: 'isolate',
    overflow: 'hidden',
    position: 'relative',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    paddingBottom: '2rem',
    paddingTop: '20rem',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    borderRadius: '1rem',
    rowGap: '0.5rem',
    transition: `all 0.15s ${animationTiming}`,
    color: vars.color.slate200,
    border: `1px solid ${vars.color.slate200}`,

    '@media': {
      [mediaQueries.dark]: {
        borderRadius: '0rem',
        borderColor: vars.color.slate800,
        ':hover': {
          borderColor: vars.color.slate700
        }
      },

      [mediaQueries.lg]: {
        paddingTop: '20rem'
      }
    }
  }),

  image: style({
    objectFit: 'cover',
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: -10
  }),

  gradient: styleVariants({
    top: [
      gradientBase,
      {
        backgroundImage:
          'linear-gradient(to top, #111827, rgb(17 24 39 / 0.4), rgb(17 24 39 / 0));'
      }
    ],

    bottom: [
      gradientBase,
      {
        boxShadow:
          'inset 0 0 0 0px #fff, inset 0 0 0 calc(1px) rgb(17 24 39 / 0.1), 0 0 #0000'
      }
    ]
  }),

  h2: style({
    marginTop: '0.75rem',
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    fontWeight: vars.fontWeight.semibold
  }),

  p: style({
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3
  }),

  span: style({
    position: 'absolute',
    inset: '0'
  }),

  button: styleVariants({
    primary: [
      buttonBase,
      {
        marginTop: '0.5rem',
        backgroundColor: vars.color.white,
        color: vars.color.slate600,
        ':hover': {
          backgroundColor: vars.color.slate50
        },
        '@media': {
          [mediaQueries.dark]: {
            border: `1px solid ${vars.color.white}`,
            ':hover': {
              backgroundColor: vars.color.slate50
            }
          }
        }
      }
    ]
  })
};

export const styles = { card };
