import { ChevronLeft } from '@mui/icons-material';
import { Box, Stack, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { useRootContext } from '../data/root.context';
import { sections } from '../Sidebar/sidebar.responsive';

const DashboardResponsiveHeader = () => {
  const { setShowSidebar, setSelectedPagesSection } = useRootContext();
  const theme = useTheme();
  const location = useLocation();
  const section = Object.values(sections).find((option) =>
    option.options.find((each) => each.path === location.pathname),
  );
  const subSection = section?.options.find((each) => each.path === location.pathname);
  return (
    <>
      <Box
        sx={{
          display: ['flex', 'flex', 'none'],
          bgcolor: 'primary.light',
          pl: 3,
          pr: 2,
          py: 2,
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0px 1px 4px #DEE2EE',
          position: 'fixed',
          width: '100%',
          zIndex: '300',
        }}
      >
        {subSection ? (
          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
              textTransform: 'uppercase',
              color: 'text.primary',
              padding: theme.spacing(1, 0),
            }}
          >
            <ChevronLeft
              onClick={() => {
                setSelectedPagesSection(section);
                setShowSidebar(true);
              }}
            />
            {subSection?.label}
          </Box>
        ) : (
          <>
            <Stack
              direction="row"
              onClick={() => {
                setShowSidebar(true);
              }}
              spacing={2}
            >
              <img src="/images/mobile-menu.svg" alt="Menu" />
            </Stack>
          </>
        )}
      </Box>
    </>
  );
};

export default DashboardResponsiveHeader;
