import { style, globalStyle } from '@vanilla-extract/css';
import { vars, mediaQueries } from '../styles/vars.css';

globalStyle('html', {
  height: '100%',
  scrollBehavior: 'smooth',
  backgroundColor: vars.color.slate50,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  '@media': {
    [mediaQueries.dark]: {
      backgroundColor: vars.color.slate900
    }
  }
});

globalStyle('body', {
  minHeight: '100%'
});

const layout = {
  main: style({
    display: 'flex',
    rowGap: '0.5rem',
    flexDirection: 'column',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '1rem',
    marginBottom: '3rem',
    maxWidth: '80rem',
    padding: '1.5rem',
    '@media': {
      [mediaQueries.lg]: {
        rowGap: '1rem',
        paddingLeft: '2rem',
        paddingRight: '2rem'
      }
    }
  })
};

export const styles = { layout };
