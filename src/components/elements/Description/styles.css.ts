import { style } from '@vanilla-extract/css';

import { mediaQueries, vars } from './../../../styles/vars.css';

const description = style({
  color: vars.color.slate600,
  fontSize: '1.5rem',
  lineHeight: '2.5rem',
  fontWeight: vars.fontWeight.medium,

  '@media': {
    [mediaQueries.dark]: {
      color: vars.color.slate300
    }
  }
});

export const styles = {
  description
};
