import { Box, styled, Typography } from '@mui/material';

import DashboardHeader from './dashboard.header';

const MainLayout = styled(Box)(({ theme }) => ({
  width: '90%',
  margin: 'auto',
  boxSizing: 'border-box',
  padding: theme.spacing(4, 1),
  [theme.breakpoints.down('md')]: {
    width: '100%',
    margin: 'unset',
  },
}));

const Dashboard = () => {
  return (
    <>
      <MainLayout>
        <DashboardHeader />
        <Typography variant="h2">Dashboard</Typography>
      </MainLayout>
    </>
  );
};

export default Dashboard;
