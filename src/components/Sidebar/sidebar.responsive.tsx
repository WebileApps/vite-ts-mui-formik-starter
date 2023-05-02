import { AddCircle, ChevronLeft, Close } from '@mui/icons-material';
import { Box, CardMedia, Divider, Stack, Typography } from '@mui/material';
import { Fragment, useState } from 'react';

import { NavLink } from '../common';
import { useRootContext } from '../data/root.context';
import { useLoginContext } from '../login/data/login.context';

export const sections = {
  profile: {
    name: 'Profile',
    options: [
      {
        label: 'Personal Information',
        icon: <AddCircle />,
        path: '/profile/personal-information',
      },
      {
        label: 'Details of Related Person',
        icon: <AddCircle />,
        path: '/profile/nominee',
      },
      {
        label: 'Contact Details',
        icon: <AddCircle />,
        path: '/profile/contact-details',
      },
      {
        label: 'Additional KYC',
        icon: <AddCircle />,
        path: '/profile/additional-kyc',
      },
      {
        label: 'Nominee Details',
        icon: <AddCircle />,
        path: '/profile/nominee-details',
      },
      {
        label: 'FATCA Declaration',
        icon: <AddCircle />,
        path: '/profile/fatca-declaration',
      },
      {
        label: 'Bank Details',
        icon: <AddCircle />,
        path: '/profile/bank-details',
      },
      // {
      //   label: 'Documents',
      //   icon: <AddCircle />,
      //   path: '/profile/documents',
      // },
      // {
      //   label: 'Update Password',
      //   icon: <AddCircle />,
      //   path: '/profile/update-password',
      // },
    ],
  },
  reports: {
    name: 'Reports',
    options: [
      {
        label: 'Client Statement',
        icon: <AddCircle />,
        path: '/reports/client-statement',
      },
      {
        label: 'Transaction Statement',
        icon: <AddCircle />,
        path: '/reports/transaction-statement',
      },
      {
        label: 'Portfolio Summary',
        icon: <AddCircle />,
        path: '/reports/portfolio-summary',
      },
      {
        label: 'CG Statement',
        icon: <AddCircle />,
        path: '/reports/cg-statement',
      },
    ],
  },
};

export default function SideNavResponsive() {
  const {
    setShowSidebar,
    selectedPagesSection: selectedSection,
    setSelectedPagesSection: setSelectedSection,
  } = useRootContext();
  const [mainMenuVisible, setMainMenuVisible] = useState(selectedSection === undefined);
  const { userDetails: user, logout } = useLoginContext();

  return (
    <>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          className={'sidenav'}
          sx={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            transform: mainMenuVisible ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          <Box
            sx={{
              background:
                'url("/images/menu-bg-mobile.svg") local no-repeat right top, #163869',
              width: '100%',
              height: '100vh',
              position: 'relative',
              pt: 4,
              px: 3,
            }}
          >
            <Box
              onClick={() => setShowSidebar(false)}
              sx={{
                width: '34px',
                height: '34px',
                border: '1px solid rgba(255, 255, 255, 0.19)',
                borderRadius: '10px',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <Close
                sx={{
                  color: 'primary.light',
                }}
              />
            </Box>
            <Stack alignItems="center" sx={{ p: 3 }}>
              <CardMedia
                component="img"
                alt="avatar"
                src="/images/avatar.svg"
                sx={{ width: '60px' }}
              />
              <Typography
                sx={{
                  fontSize: '24px',
                  fontWeight: 600,
                  color: 'primary.light',
                  pt: 1.5,
                }}
              >
                {user?.name || ''}
              </Typography>
            </Stack>
          </Box>
          <Box
            sx={{
              bgcolor: 'primary.light',
              position: 'absolute',
              top: '220px',
              borderTopRightRadius: 40,
              borderTopLeftRadius: 40,
              width: '100%',
              overflow: 'auto',
              height: 'calc(100vh - 220px)',
              p: 4.5,
            }}
          >
            <NavLink
              to={'/dashboard'}
              onClick={() => {
                setShowSidebar(false);
                setSelectedSection(undefined);
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <CardMedia
                  component="img"
                  src="/images/dashboard-mobile.svg"
                  alt="dashboard"
                  sx={{ width: 34 }}
                />
                <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>
                  Dashboard
                </Typography>
              </Stack>
            </NavLink>
            <Divider sx={{ my: 2 }} />
            <Stack
              direction="row"
              onClick={() => {
                setMainMenuVisible(false);
                setSelectedSection(sections.reports);
              }}
              alignItems="center"
              spacing={2}
            >
              <CardMedia
                component="img"
                src="/images/reports-mobile.svg"
                alt="Reports"
                sx={{ width: 34 }}
              />
              <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>
                Reports
              </Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack
              direction="row"
              onClick={() => {
                setMainMenuVisible(false);
                setSelectedSection(sections.profile);
              }}
              alignItems="center"
              spacing={2}
            >
              <CardMedia
                component="img"
                src="/images/profile-mobile.svg"
                alt="Profile"
                sx={{ width: 34 }}
              />
              <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>
                Profile
              </Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />
            {/* <Stack
              direction="row"
              onClick={() => setShowContactRMDialog(true)}
              alignItems="center"
              spacing={2}
            >
              <CardMedia
                component="img"
                src="/images/contact-rm-mobile.svg"
                alt="ContactRM"
                sx={{ width: 34 }}
              />
              <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>
                Contact RM
              </Typography>
            </Stack> 
            <Divider sx={{ my: 2 }} /> */}
            <NavLink
              to="#"
              onClick={() => {
                setSelectedSection(undefined);
                setShowSidebar(false);
                logout();
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <CardMedia
                  component="img"
                  src="/images/logout-mobile.svg"
                  alt="logout"
                  sx={{ width: 34 }}
                />
                <Typography sx={{ fontWeight: 500 }}>Logout</Typography>
              </Stack>
            </NavLink>
          </Box>
        </Box>
        <Box
          className="sidenav-subsection"
          sx={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            transition: 'transform 0.3s ease-in-out',
            opacity: '1',
            transform: mainMenuVisible ? 'translateX(100%)' : 'translateX(0)',
          }}
        >
          <Box
            sx={{
              background:
                'url("/images/menu-bg-mobile.svg") local no-repeat right top, #163869',
              width: '100%',
              height: '100vh',
              position: 'relative',
              pt: 4,
              px: 3,
            }}
          >
            <Box
              onClick={() => setMainMenuVisible(true)}
              sx={{
                width: '34px',
                height: '34px',
                border: '1px solid rgba(255, 255, 255, 0.19)',
                borderRadius: '10px',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <ChevronLeft
                sx={{
                  color: 'primary.light',
                }}
              />
            </Box>
            <Stack alignItems="center" sx={{ p: 1 }}>
              <Typography
                sx={{
                  fontSize: '24px',
                  fontWeight: 600,
                  color: 'primary.light',
                  pt: 1.5,
                }}
              >
                {selectedSection?.name}
              </Typography>
            </Stack>
          </Box>
          <Box
            sx={{
              bgcolor: 'primary.light',
              position: 'absolute',
              top: '150px',
              borderTopRightRadius: 40,
              borderTopLeftRadius: 40,
              width: '100%',
              height: 'calc(100vh - 150px)',
              overflow: 'auto',
              p: 4.5,
            }}
          >
            {selectedSection?.options.map((option, index) => (
              <Fragment key={option.path}>
                <NavLink
                  to={option.path || ''}
                  sx={{
                    color: 'text.primary',
                  }}
                  onClick={() => {
                    setShowSidebar(false);
                  }}
                >
                  {option?.icon}
                  {option.label}
                </NavLink>
                {index < selectedSection?.options.length - 1 && (
                  <Divider sx={{ my: 2 }} />
                )}
              </Fragment>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
