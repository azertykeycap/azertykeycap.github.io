import { style } from '@vanilla-extract/css';

export const animationTiming = 'cubic-bezier(0.4, 0, 0.2, 1)';

export const srOnly = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0
});
