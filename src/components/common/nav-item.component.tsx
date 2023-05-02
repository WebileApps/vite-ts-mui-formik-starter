import { Divider, styled } from '@mui/material';
import React from 'react';
import { NavLink as Link, NavLinkProps } from 'react-router-dom';

import { useRootContext } from '../data/root.context';

export const NavLink = styled(Link)((props: NavLinkProps & { active?: boolean }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  textDecoration: 'none',
  gap: '18px',
  color: 'white',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '16px',
  letterSpacing: '0.02em',
  '&.active': {
    color: props.active === false ? 'white' : '#0293FE !important',
  },
}));

const SectionLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '75%',
  fontWeight: 'normal',
  borderRadius: '8px',
  position: 'relative',
  margin: theme.spacing(2, 0),
  '& svg path': {
    fill: 'currentColor',
  },
  '&.active': {
    backgroundColor: theme.palette.text.activeLink,
    border: '0.5px solid rgba(67, 91, 111, 0.01)',
    '& svg path': {
      stroke: 'currentColor',
    },
    '& svg rect': {
      fill: 'rgb(227, 230, 248, 0.3)',
      stroke: 'none',
    },
  },
}));

type SectionLinkItemProps = {
  icon: React.ReactNode;
  title: string;
  isLast?: boolean;
};

export const SectionLinkItem = (props: SectionLinkItemProps & NavLinkProps) => {
  const { icon, title, isLast } = props;
  return (
    <>
      <SectionLink {...props}>
        {icon} {title}
      </SectionLink>
      {!isLast && <Divider sx={{ mt: 1, mb: 1, mr: 4 }} />}
    </>
  );
};

interface NavItemProps {
  activeIcon?: React.ReactElement;
  inactiveIcon?: React.ReactElement;
  title: string;
  active?: boolean;
}

export default function NavItem(props: NavItemProps & NavLinkProps) {
  let { activeIcon, inactiveIcon, ...rest } = props;
  let { title, active } = rest;
  activeIcon = activeIcon ? activeIcon : inactiveIcon;

  const { showSidebar } = useRootContext();
  return (
    <NavLink
      {...rest}
      sx={{
        '& span': {
          whiteSpace: 'nowrap',
          width: showSidebar ? '100%' : '0px',
          overflow: 'hidden',
        },
      }}
    >
      {active ? (
        active ? (
          <>
            {activeIcon}
            <span>{title}</span>
          </>
        ) : (
          <>
            {inactiveIcon}
            <span>{title}</span>
          </>
        )
      ) : (
        ({ isActive }) =>
          isActive ? (
            <>
              {activeIcon}
              <span>{title}</span>
            </>
          ) : (
            <>
              {inactiveIcon}
              <span>{title}</span>
            </>
          )
      )}
    </NavLink>
  );
}
