import { style } from '@vanilla-extract/css';

import { srOnly, animationTiming } from './../../../styles/common.css';
import { rawVars, mediaQueries, vars } from './../../../styles/vars.css';
import { convertHexToRGBA } from './../../../lib/utils';

const img = style({
  height: '2rem',
  width: 'auto'
});

const header = {
  base: style({
    position: 'relative',
    zIndex: 10,
    width: '100%'
  }),

  section: style({
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: convertHexToRGBA(rawVars.color.white, 0.7),
    backdropFilter: 'blur(40px)',

    '@media': {
      [mediaQueries.dark]: {
        backgroundColor: convertHexToRGBA(rawVars.color.black, 0.3)
      }
    },

    selectors: {
      '&#mobile-menu': {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        margin: '0.5rem',
        padding: '0.5rem',
        transformOrigin: 'top',
        transform: '0',
        overflow: 'hidden',
        borderRadius: '0.5rem',
        transition: `all 0.15s ${animationTiming}`
      }
    }
  }),

  nav: {
    base: style({
      '@media': {
        [mediaQueries.lg]: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }
      }
    }),

    desktop: {
      base: style({
        maxWidth: '80rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.5rem 1rem 1.5rem',
        '@media': {
          [mediaQueries.xl]: {
            paddingLeft: '2rem',
            paddingRight: '2rem'
          }
        }
      })
    },

    mobile: {
      base: style({
        display: 'flex',
        alignItems: 'center',
        marginRight: '-0.5rem',
        '@media': { [mediaQueries.lg]: { display: 'none' } }
      })
    },

    div: style({
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0,
      gap: '0.5rem',
      justifyContent: 'space-between',
      width: '100%',
      ':last-child': {
        display: 'none'
      },
      '@media': {
        [mediaQueries.lg]: {
          width: 'auto',
          justifyContent: 'flex-start',
          ':last-child': {
            display: 'flex'
          }
        }
      }
    }),

    button: {
      base: style({
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '0.375rem',
        backgroundColor: vars.color.white,
        padding: '0.5rem',
        color: vars.color.slate400,
        transition: `background-color 0.15s ${animationTiming}`,
        outline: 'none',
        border: 'transparent',
        ':hover': {
          backgroundColor: vars.color.slate50
        },
        ':focus': {
          outline: 'none'
        },
        '@media': {
          [mediaQueries.dark]: {
            backgroundColor: vars.color.slate500,
            color: vars.color.slate100,
            ':hover': {
              backgroundColor: vars.color.slate900
            }
          }
        }
      })
    },

    span: srOnly
  },

  svg: style({
    height: '1.5rem',
    width: '1.5rem',
    cursor: 'pointer',
    color: vars.color.slate600,
    transition: `color 0.15s ${animationTiming}`,
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
  }),

  mobile: {
    base: style({
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 30,
      margin: '0.5rem',
      padding: '0.5rem',
      transformOrigin: 'top',
      transform: '0',
      overflow: 'hidden',
      borderRadius: '0.5rem',
      transition: `all 0.15s ${animationTiming}`
    }),

    button: style({
      marginRight: '-0.5rem'
    }),

    nav: {
      base: style({
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '1rem 1.25rem 0 1.25rem'
      }),

      div: style({
        marginBottom: '1rem'
      })
    }
  }
};

const common = {
  ul: {
    base: style({
      display: 'none',
      '@media': {
        [mediaQueries.lg]: {
          marginLeft: '2.5rem',
          display: 'flex',
          flexDirection: 'row',
          columnGap: '0.5rem',
          fontWeight: 500
        }
      }
    }),

    mobile: {
      base: style({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '0.25rem',
        paddingRight: '0.5rem'
      })
    },

    li: style({
      width: 'fit-content'
    })
  },

  a: style({
    display: 'block',
    borderRadius: '0.375rem',
    padding: '0.5rem 0.75rem',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontWeight: 500,
    color: vars.color.slate900,
    transition: `all 0.15s ${animationTiming}`,
    ':hover': {
      backgroundColor: vars.color.slate100
    },
    '@media': {
      [mediaQueries.dark]: {
        color: vars.color.slate100,
        ':hover': {
          backgroundColor: vars.color.slate900
        }
      },
      [mediaQueries.lg]: {
        color: vars.color.slate500,
        ':hover': {
          color: vars.color.slate900
        }
      },
      [`${mediaQueries.lg} and ${mediaQueries.dark}`]: {
        color: vars.color.slate300,
        ':hover': {
          color: vars.color.slate100
        }
      }
    }
  })
};

export const styles = {
  img,
  header,
  common
};
