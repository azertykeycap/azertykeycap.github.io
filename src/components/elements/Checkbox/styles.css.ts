import { styleVariants, style } from '@vanilla-extract/css';
import { vars } from '../../../styles/vars.css';

const inputBaseStyles = style({
  height: '1rem',
  width: '1rem',
  borderRadius: '0.25rem',
  outline: '2px solid transparent',
  outlineOffset: '2px'
});

const input = {
  label: style({
    height: '1.25rem',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '1rem'
  }),

  title: style({
    marginLeft: '0.75rem'
  }),

  span: style({
    paddingRight: '1rem',
    borderRight: `1px solid ${vars.color.slate300}`,
    color: vars.color.slate400
  }),

  styles: styleVariants({
    primary: [
      inputBaseStyles,
      {
        border: `1px solid ${vars.color.slate300}`,
        color: vars.color.indigo600,
        selectors: {
          '&:focus': {
            outlineColor: vars.color.indigo600,
            boxShadow: `0 0 0 1px ${vars.color.indigo600}`
          }
        }
      }
    ],
    secondary: [
      inputBaseStyles,
      {
        border: '',
        color: '',
        selectors: {
          '&:focus': {
            outlineColor: '',
            boxShadow: ''
          }
        }
      }
    ]
  })
};

export const styles = { input };
