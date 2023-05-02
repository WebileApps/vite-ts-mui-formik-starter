import { Box, CardMedia, Stack } from '@mui/material';

import NavItem from '../common/nav-item.component';
import { useRootContext } from '../data/root.context';
import { useLoginContext } from '../login/data/login.context';

const Sidebar = () => {
  // const theme = useTheme();
  const { logout } = useLoginContext();
  const { showSidebar, setShowSidebar } = useRootContext();

  return (
    <Box
      sx={{
        height: '100%',
        backgroundColor: 'primary.main',
        maxWidth: showSidebar
          ? { md: '20vw', lg: '15vw', xl: '10vw' }
          : { md: '6.5vw', lg: '4.5vw', xl: '4vw' },
        transition: 'all 0.3s ease-out',
        overflow: 'hidden',
      }}
    >
      <Stack gap={'32px'} padding={'16px'}>
        <Box
          sx={{
            // padding: showSidebar ? theme.spacing(2) : theme.spacing(2, 0),
            // bgcolor: showSidebar ? 'background.default' : '',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
            height: '45px',
          }}
        >
          <Box sx={{ width: '175px', backgroundColor: 'unset' }}>
            {showSidebar ? (
              <CardMedia
                component="img"
                alt="logo"
                src="/images/logo.svg"
                sx={{ height: '35px' }}
              />
            ) : (
              <CardMedia component={'img'} alt="logo small" src="/images/logo.svg" />
            )}
          </Box>
        </Box>
        <Box onClick={() => setShowSidebar(!showSidebar)}>
          <img
            src="/images/collapse-menu.svg"
            alt="collapse"
            style={{ width: '20px', marginLeft: 1, cursor: 'pointer' }}
          />
        </Box>
        <NavItem
          title="Dashboard"
          to="dashboard"
          activeIcon={<img src="/images/dashboard-active.svg" alt="dashboard" />}
          inactiveIcon={<img src="/images/dashboard-inactive.svg" alt="dashboard" />}
        />
        <NavItem
          title="Logout"
          to="#"
          onClick={() => {
            logout();
          }}
          inactiveIcon={<img src="/images/logout-inactive.svg" alt="logout active" />}
        />
      </Stack>
    </Box>
  );
};

export default Sidebar;
