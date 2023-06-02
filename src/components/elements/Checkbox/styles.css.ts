import { styleVariants, style } from '@vanilla-extract/css';
import { vars } from '../../../styles/vars.css';

const inputBaseStyles = style({
  height: '1rem',
  width: '1rem',
  borderRadius: '0.2rem',
  cursor: 'pointer',
  backgroundColor: vars.color.white
});

const input = {
  label: style({
    display: 'flex',
    alignItems: 'center',
    marginLeft: '1rem'
  }),

  title: style({
    marginLeft: '0.75rem',
    cursor: 'pointer'
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
        '&:focus': {
          outline: `2px solid ${vars.color.indigo600}`,
          outlineOffset: '2px'
        },
        '&:checked': {
          backgroundColor: vars.color.indigo600
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
