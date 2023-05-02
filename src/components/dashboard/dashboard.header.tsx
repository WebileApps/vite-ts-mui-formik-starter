import { Stack, styled, Typography, useTheme } from '@mui/material';

const DashboardNavItem = styled(Typography)(({ theme }) => ({
  border: 'none',
  borderRadius: 50,
  fontSize: 16,
  fontWeight: 400,
  color: theme.palette.text.disabled,
  textTransform: 'uppercase',
  letterSpacing: '0.01em',
  padding: theme.spacing(1, 2),
  cursor: 'not-allowed',
  '&.active': {
    cursor: 'pointer',
    border: '1px solid #0393FE',
    color: '#0293FE !important',
  },
  [theme.breakpoints.down('lg')]: {
    fontSize: 14,
    whiteSpace: 'nowrap',
  },
}));

const DashboardHeader = () => {
  const theme = useTheme();
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            [theme.breakpoints.down('md')]: {
              width: '100%',
              justifyContent: 'space-around',
            },
          }}
        >
          <DashboardNavItem className="active">Heading 1</DashboardNavItem>
          <DashboardNavItem>Heading 2</DashboardNavItem>
        </Stack>
      </Stack>
    </>
  );
};

export default DashboardHeader;
