import { Close as CloseIcon } from '@mui/icons-material';
import { AlertColor } from '@mui/lab';
import { IconButton, Slide } from '@mui/material';
import { SnackbarKey, useSnackbar, VariantType } from 'notistack';
import React, { createContext, useCallback, useContext, useState } from 'react';

import { sections } from '../Sidebar/sidebar.responsive';

interface RootState {
  // eslint-disable-next-line no-unused-vars
  showToast(message: string, type: AlertColor, hideDuration?: number): void;
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPagesSection:
    | {
        name: string;
        options: { label: string; icon: JSX.Element; path: string }[];
      }
    | undefined;
  setSelectedPagesSection: React.Dispatch<
    React.SetStateAction<
      | {
          name: string;
          options: { label: string; icon: JSX.Element; path: string }[];
        }
      | undefined
    >
  >;
}

const RootContext = createContext<RootState>({
  showSidebar: false,
  setShowSidebar: () => {},
  showToast: () => {},
  selectedPagesSection: sections.profile,
  setSelectedPagesSection: () => {},
});

export const useRootContext = () => {
  return useContext(RootContext);
};

function RootContextProvider({ children }: { children: React.ReactElement }) {
  const isMobileBreakpoint = window.innerWidth < 900;
  const [showSidebar, setShowSidebar] = useState(isMobileBreakpoint ? false : true);
  const [selectedPagesSection, setSelectedPagesSection] = useState<
    | {
        name: string;
        options: { label: string; icon: JSX.Element; path: string }[];
      }
    | undefined
  >();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showToast = useCallback(
    (message: string, variant: VariantType, hideDuration?: number) => {
      enqueueSnackbar(message, {
        action: (snackbarId: SnackbarKey) => (
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={() => closeSnackbar(snackbarId)}
          >
            <CloseIcon />
          </IconButton>
        ),
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        TransitionComponent: (props) => <Slide {...props} direction="down" />,
        variant,
        autoHideDuration: hideDuration || 5000,
      });
    },
    [enqueueSnackbar],
  );

  return (
    <RootContext.Provider
      value={{
        showToast,
        showSidebar,
        setShowSidebar,
        selectedPagesSection,
        setSelectedPagesSection,
      }}
    >
      {children}
    </RootContext.Provider>
  );
}

export default RootContextProvider;
