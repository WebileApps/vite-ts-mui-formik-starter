import { SvgIcon } from '@mui/material';

const DropdownArrow = (props: any) => {
  return (
    <SvgIcon
      width="13"
      height="8"
      viewBox="0 0 13 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M1 1L6.5 6.5L12 1" fill="none" stroke="#011E33" strokeWidth="1.5" />
    </SvgIcon>
  );
};

export default DropdownArrow;
