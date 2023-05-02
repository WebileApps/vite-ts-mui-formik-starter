import ChevronLeftSharpIcon from '@mui/icons-material/ChevronLeftSharp';
import { Box, Stack, Typography } from '@mui/material';

export default function SideSubNavResponsive() {
  return (
    <>
      <Box
        sx={{
          bgcolor: 'primary.main',
          width: '100%',
          height: '100vh',
          position: 'relative',
          pt: 4,
          px: 3,
        }}
      >
        <Stack direction="row" alignItems="baseline" spacing={5}>
          <Box
            sx={{
              width: '34px',
              height: '34px',
              border: '1px solid rgba(255, 255, 255, 0.19)',
              borderRadius: '10px',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <ChevronLeftSharpIcon
              sx={{
                color: 'primary.light',
              }}
            />
          </Box>
          <Typography
            sx={{
              fontSize: '21px',
              color: 'text.lightPrimary',
              textTransform: 'uppercase',
            }}
          >
            Reports
          </Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          bgcolor: 'primary.light',
          position: 'absolute',
          top: '110px',
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          width: '100%',
          height: '100vh',
          p: 4.5,
        }}
      >
        <p>Reports/profile layout goes here</p>
      </Box>
    </>
  );
}
