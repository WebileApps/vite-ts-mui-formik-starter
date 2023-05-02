import { Box, Typography } from '@mui/material';
import { Outlet } from 'react-router';

function LoginLayout() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        overflow: 'auto',
        pb: 12,
        pt: [18, 18, 12],
      }}
    >
      <Box
        sx={{
          width: ['96%', '96%', '70%'],
          maxWidth: '700px',
          mx: 'auto',
          boxSizing: 'border-box',
          bgcolor: 'primary.light',
          borderRadius: 5,
          px: [3.5, 3.5, 20],
          pt: [3.5, 3.5, 5],
          pb: [3.5, 3.5, 10],
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>
      </Box>
      <Typography
        sx={{
          textAlign: 'center',
          width: ['96%', '96%', '70%'],
          margin: '50px auto',
          fontSize: ['10px', '10px', '14px'],
          color: 'text.themePrimary',
        }}
      >
        Footer | © 2021 All Rights Reserved
      </Typography>
    </Box>
  );
}

export default LoginLayout;
