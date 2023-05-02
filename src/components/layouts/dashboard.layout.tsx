import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import DashboardResponsiveHeader from '../dashboard/dashboard.responsive.header';
import { useRootContext } from '../data/root.context';
import Sidebar from '../Sidebar/sidebar.component';
import SideNavResponsive from '../Sidebar/sidebar.responsive';

const DashboardLayout = () => {
  const [isMobileBreakpoint, setIsMobileBreakpoint] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 900) {
      setIsMobileBreakpoint(true);
    } else {
      setIsMobileBreakpoint(false);
    }
  };

  useEffect(() => {
    setIsMobileBreakpoint(window.innerWidth < 900);
    window.addEventListener('resize', handleResize);
  }, []);

  const { showSidebar } = useRootContext();
  return (
    <Box>
      <Grid container sx={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
        <Grid item md={'auto'} sx={{ display: ['none', 'none', 'block'] }}>
          <Sidebar />
        </Grid>
        <Grid
          item
          xs={12}
          md
          sx={{
            minHeight: '100vh',
            overflow: ['hidden', 'hidden', 'auto'],
            maxWidth: { md: showSidebar ? '100vw' : 'unset' },
          }}
        >
          {showSidebar && isMobileBreakpoint ? (
            <>
              <SideNavResponsive />
            </>
          ) : (
            <>
              <DashboardResponsiveHeader />
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  paddingTop: ['4rem', '4rem', 0],
                }}
              >
                <Outlet />
              </Box>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardLayout;
