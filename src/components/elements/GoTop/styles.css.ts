import { animationTiming } from './../../../styles/common.css';
import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/vars.css';

const button = {
  base: style({
    bottom: '0',
    right: '0',
    margin: '1rem',
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    borderRadius: '9999px',
    padding: '0.75rem',
    fontWeight: vars.fontWeight.semibold,
    color: vars.color.white,
    backgroundColor: vars.color.teal500,
    boxShadow:
      '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    transition: `background-color 0.15s ${animationTiming}`,
    selectors: {
      '&:hover': {
        backgroundColor: vars.color.teal600
      },
      '&:focus': {
        outlineColor: vars.color.teal500,
        outline: '2px solid transparent',
        outlineOffset: '2px'
      }
    }
  }),
  svg: style({
    height: '1.5rem',
    width: '1.5rem'
  })
};

export const styles = { button };
