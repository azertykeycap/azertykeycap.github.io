import { style, globalStyle } from '@vanilla-extract/css';
const svgToDataUri = require('mini-svg-data-uri');

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

globalStyle('input:checked', {
  backgroundImage: `url("${svgToDataUri(
    `<svg viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"/></svg>`
  )}")`,
  borderColor: 'transparent',
  backgroundColor: 'currentColor',
  backgroundSize: '100% 100%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
});
