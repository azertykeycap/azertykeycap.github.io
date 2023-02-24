import { rawVars } from './../../../styles/vars.css';
import { convertHexToRGBA } from './../../../lib/utils';
import { animationTiming } from './../../../styles/common.css';
import { style, styleVariants } from '@vanilla-extract/css';
import { vars, mediaQueries } from '../../../styles/vars.css';

const buttonBase = style({
  width: '100%',
  flex: '1 1 0',
  padding: '0.5rem',
  borderRadius: '0.375rem',
  borderColor: 'transparent',
  textAlign: 'center',
  fontWeight: vars.fontWeight.semibold,
  transition: `all 0.15s ${animationTiming}`,
  ':focus': {
    outlineOffset: '2px',
    outline: `2px solid ${vars.color.indigo600}`
  }
});

const hr = style({
  height: '1px',
  backgroundColor: vars.color.slate100,
  border: 'none',
  '@media': {
    [mediaQueries.dark]: {
      backgroundColor: vars.color.slate700
    }
  }
});

const newBadge = {
  div: style({
    position: 'absolute',
    top: '-1rem',
    right: '-1rem',
    bottom: '-1rem',
    left: '-1rem',
    display: 'flex',
    height: 'fit-content',
    width: 'fit-content',
    flexShrink: 0,
    alignItems: 'center',
    columnGap: '0.5rem',
    borderRadius: '9999px',
    backgroundColor: vars.color.amber500,
    fill: vars.color.white,
    padding: '0.75rem',
    fontSize: vars.fontSize.xs,
    fontWeight: vars.fontWeight.bold,
    textTransform: 'uppercase',
    color: vars.color.white,

    '@media': {
      [mediaQueries.lg]: {
        padding: '0.5rem 1rem 0.5rem 0.75rem'
      }
    }
  }),

  svg: style({
    height: '1.5rem',
    width: '1.5rem'
  }),

  span: style({
    display: 'none',
    '@media': {
      [mediaQueries.lg]: {
        display: 'inline'
      }
    }
  })
};

const articleBase = style({
  position: 'relative',
  display: 'flex',
  height: 'fit-content',
  flexDirection: 'column',
  backgroundColor: vars.color.white,
  transition: `all 0.15s ${animationTiming}`,
  '@media': {
    [mediaQueries.dark]: {
      backgroundColor: vars.color.slate900
    }
  }
});

const article = {
  normal: style([
    articleBase,
    {
      borderRadius: '0.58rem',
      border: `1px solid ${vars.color.slate200}`,
      ':hover': {
        borderColor: vars.color.slate300
      },
      '@media': {
        [mediaQueries.dark]: {
          borderColor: vars.color.slate700,
          ':hover': {
            borderColor: vars.color.slate600
          }
        }
      }
    }
  ]),

  new: style([
    articleBase,
    {
      borderRadius: '0.72rem',
      border: `3px solid ${vars.color.amber500}`,
      '@media': {
        [mediaQueries.dark]: {
          borderColor: vars.color.amber500
        }
      }
    }
  ]),

  figure: {
    img: style({
      width: '100%',
      backgroundColor: vars.color.slate300,
      borderTopLeftRadius: '0.58rem',
      borderTopRightRadius: '0.58rem',
      borderBottom: `1px solid ${vars.color.slate100}`,
      objectFit: 'fill',
      '@media': {
        [mediaQueries.dark]: {
          borderBottom: `1px solid ${vars.color.slate800}`,
          backgroundColor: vars.color.slate700
        }
      }
    }),

    figcaption: {
      h4: style({
        padding: '1rem',
        textAlign: 'center',
        fontSize: vars.fontSize.base,
        fontWeight: vars.fontWeight.medium,
        color: vars.color.slate800,
        '@media': {
          [mediaQueries.dark]: {
            color: vars.color.slate100
          }
        }
      }),

      section: style({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '0.25rem',
        padding: '1rem',
        fontSize: vars.fontSize.sm,
        color: vars.color.slate700,
        '@media': {
          [mediaQueries.dark]: { color: vars.color.slate200 }
        }
      }),

      dl: {
        base: style({
          width: '100%',
          display: 'flex',
          alignItems: 'center'
        }),

        dt: style({
          flexBasis: '40%',
          fontWeight: vars.fontWeight.semibold,
          color: vars.color.slate900,
          fontSize: vars.fontSize.sm,
          '@media': {
            [mediaQueries.dark]: { color: vars.color.slate100 }
          }
        }),

        dd: style({
          flexBasis: '60%',
          color: vars.color.slate600,
          fontSize: vars.fontSize.sm,
          '@media': {
            [mediaQueries.dark]: { color: vars.color.slate300 }
          }
        }),

        status: {
          dd: style({
            display: 'flex',
            flexBasis: 'auto',
            alignItems: 'center',
            backgroundColor: vars.color.teal700,
            borderRadius: '0.25rem',
            padding: '0.25rem 0.5rem',
            fontSize: vars.fontSize.xs,
            fontWeight: vars.fontWeight.bold,
            textTransform: 'uppercase',
            color: vars.color.white,
            '@media': {
              [mediaQueries.dark]: {
                color: vars.color.teal100,
                borderColor: `1px border ${vars.color.teal700}`,
                backgroundColor: convertHexToRGBA(vars.color.indigo700, 0.1)
              }
            }
          })
        },

        warning: {
          span: style({
            display: 'inline-block',
            width: 'fit-content',
            borderRadius: '0.25rem',
            backgroundColor: vars.color.red600,
            padding: '0.25rem 0.5rem',
            fontWeight: vars.fontWeight.bold,
            color: vars.color.white,
            fontSize: vars.fontSize.sm,
            margin: '1rem',
            '@media': {
              [mediaQueries.dark]: {
                border: `1px solid ${vars.color.red700}`,
                backgroundColor: convertHexToRGBA(vars.color.red600, 0.1),
                color: vars.color.red100
              }
            }
          })
        },

        additionnalUrl: {
          div: style({
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            padding: '1rem',
            paddingTop: '1.5rem',
            fontSize: vars.fontSize.sm,
            '@media': {
              [mediaQueries.xl]: {
                flexDirection: 'row'
              }
            }
          }),

          button: styleVariants({
            primary: [
              buttonBase,
              {
                backgroundColor: vars.color.indigo600,
                color: vars.color.white,
                ':hover': {
                  backgroundColor: vars.color.indigo700
                },
                '@media': {
                  [mediaQueries.dark]: {
                    borderColor: vars.color.indigo600,
                    backgroundColor: convertHexToRGBA(
                      rawVars.color.indigo500,
                      0.1
                    ),
                    color: vars.color.indigo100,
                    ':hover': {
                      backgroundColor: convertHexToRGBA(
                        rawVars.color.indigo500,
                        0.2
                      )
                    }
                  }
                }
              }
            ],
            secondary: [
              buttonBase,
              {
                backgroundColor: vars.color.indigo50,
                color: vars.color.indigo800,
                ':hover': {
                  backgroundColor: convertHexToRGBA(
                    rawVars.color.indigo100,
                    0.5
                  )
                },
                '@media': {
                  [mediaQueries.dark]: {
                    borderColor: vars.color.indigo600,
                    backgroundColor: convertHexToRGBA(
                      rawVars.color.indigo100,
                      0.2
                    ),
                    color: vars.color.indigo200,
                    ':hover': {
                      backgroundColor: convertHexToRGBA(
                        rawVars.color.indigo100,
                        0.3
                      )
                    }
                  }
                }
              }
            ]
          })
        }
      }
    }
  }
};

export const styles = {
  article,
  hr,
  newBadge
};
