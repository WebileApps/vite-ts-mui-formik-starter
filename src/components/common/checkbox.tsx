import { Checkbox as MuiCheckbox, CheckboxProps, styled } from '@mui/material';
import * as ReactDOMServer from 'react-dom/server';

const tickIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.9801 4.42385C12.2983 4.68903 12.3413 5.16195 12.0762 5.48016L7.07617 11.4802C6.94127 11.642 6.74449 11.7397 6.53399 11.7492C6.32348 11.7588 6.11867 11.6794 5.96967 11.5303L3.46967 9.03035C3.17678 8.73746 3.17678 8.26258 3.46967 7.96969C3.76256 7.6768 4.23744 7.6768 4.53033 7.96969L6.4496 9.88896L10.9238 4.51988C11.189 4.20167 11.6619 4.15868 11.9801 4.42385Z"
      fill="white"
    />
  </svg>
);

const svgString = encodeURIComponent(ReactDOMServer.renderToStaticMarkup(tickIcon));

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: 'rgba(4, 149, 254, 1)',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: `url("data:image/svg+xml,${svgString}")`,
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: 'rgba(0, 129, 235, 1)',
  },
});

// Inspired by blueprintjs
export default function Checkbox(props: CheckboxProps) {
  return (
    <MuiCheckbox
      sx={{
        '&:hover': { bgcolor: 'transparent' },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ 'aria-label': 'checkbox input' }}
      {...props}
    />
  );
}
