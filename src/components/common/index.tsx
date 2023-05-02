import { Box, keyframes, styled } from '@mui/material';

export const slide = keyframes`
0% {
  transform: translateY(20px);
  visibility: visible;
}
100% {
  transform: translateY(0);
}
`;

export const AnimatedBox = styled(Box)({
  '&.slideInUp': {
    animationName: slide,
    animationDuration: '0.1s',
    animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
    animationFillMode: 'both',
  },
});

export * from './nav-item.component';
