import { keyframes } from '@emotion/react';
import {
  Box,
  CardMedia,
  Fade,
  Grid,
  Link,
  Slide,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useRootContext } from '../data/root.context';
import SubmitButton from '../forms/FormSubmitButton';
import FormTextInput, { FormPasswordInput } from '../forms/FormTextInput';
import { useLoginContext } from './data/login.context';
import Debt from './icons/debt';
import DirectEquity from './icons/direct-equity';
import LoginBgCircle from './icons/login-bg-circle';
import MutualFunds from './icons/mutual-funds';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const LoginBgCircleContainer = styled(Box)(() => ({
  height: '100%',
  width: '100%',
  overflow: 'hidden',
  '& .bg-circle': {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '18em',
    height: '14em',
  },
}));
const LoginLogoContainer = styled(Box)(({ theme }) => ({
  paddingBottom: theme.spacing(5),
}));

const LoginIconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-end',
  color: 'white',
  fontSize: '24px',
  fontWeight: 600,
  flexDirection: 'column',
  gap: theme.spacing(2),
  position: 'absolute',
  minWidth: '8em',
  bottom: 0,
  left: 15,
  '& svg': {
    width: 'auto',
    minHeight: '80px',
  },
}));

function LoginIconsAnimation() {
  const [iconId, setIconId] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (iconId < 3) {
        setIconId((prevId) => prevId + 1);
      } else {
        setIconId(1);
      }
    }, 2000);
  }, [iconId]);

  return (
    <Box
      sx={{ width: '100%', height: '100%', position: 'absolute', bottom: '0', left: '0' }}
    >
      <LoginBgCircleContainer
        sx={{
          '& .bg-circle path': {
            animation: `${fadeIn} 2s`,
            fill: `${
              iconId === 1
                ? 'url(#linear_gradient_turquoise)'
                : iconId === 2
                ? 'url(#linear_gradient_blue)'
                : 'url(#linear_gradient_violet)'
            }`,
          },
        }}
      >
        <LoginBgCircle className={'bg-circle'} />
        <Box
          sx={{
            display: 'flex',
            position: 'absolute',
            bottom: 50,
            left: 50,
            height: '100px',
          }}
          ref={containerRef}
        >
          <Fade in={iconId === 1} timeout={200} mountOnEnter unmountOnExit>
            <Box>
              <Slide
                {...(iconId === 1 ? { timeout: { enter: 500, exit: 500 } } : {})}
                in={iconId === 1}
                container={containerRef.current}
                mountOnEnter
                unmountOnExit
              >
                <LoginIconContainer>
                  <Debt />
                  DEBT
                </LoginIconContainer>
              </Slide>
            </Box>
          </Fade>
          <Fade in={iconId === 2} timeout={200} mountOnEnter unmountOnExit>
            <Box>
              <Slide
                direction="down"
                timeout={{ enter: 500, exit: 500 }}
                in={iconId === 2}
                container={containerRef.current}
                mountOnEnter
                unmountOnExit
              >
                <LoginIconContainer>
                  <DirectEquity />
                  DIRECT EQUITY
                </LoginIconContainer>
              </Slide>
            </Box>
          </Fade>
          <Fade in={iconId === 3} timeout={200} mountOnEnter unmountOnExit>
            <Box>
              <Slide
                // timeout={{ enter: 500, exit: 500 }}
                // style={{ transformOrigin: '0 0 0' }}
                {...(iconId === 3 ? { timeout: { enter: 500, exit: 500 } } : {})}
                in={iconId === 3}
                container={containerRef.current}
                mountOnEnter
                unmountOnExit
              >
                <LoginIconContainer>
                  <MutualFunds />
                  MUTUAL FUNDS
                </LoginIconContainer>
              </Slide>
            </Box>
          </Fade>
        </Box>
      </LoginBgCircleContainer>
    </Box>
  );
}

const PANSchema = Yup.object().shape({
  pan: Yup.string()
    .required('Enter your PAN as username')
    .matches(
      /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
      'Please enter a valid PAN number',
    ),
  password: Yup.string().required('Enter your password.'),
});

function LoginMobileNumberSection() {
  const { verifyLogin: login } = useLoginContext();
  const { showToast } = useRootContext();
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h4" sx={{ pb: 3 }}>
        Welcome
      </Typography>
      <Formik
        validationSchema={PANSchema}
        onSubmit={({ pan, password }) => {
          return login(pan, password).then(({ userDetails }) => {
            showToast('Logged in successfully', 'success');
            userDetails.isFirstTime ? navigate('verify-otp') : navigate('/dashboard');
          });
        }}
        initialValues={{ pan: '', password: '' }}
      >
        {() => (
          <Form>
            <FormTextInput name="pan" label="Username" placeholder="Enter Username" />
            <FormPasswordInput
              name="password"
              label="Password"
              placeholder="Enter Password"
            />
            <Stack sx={{ mb: 2 }}>
              <Link
                to="forgot-password"
                component={NavLink}
                sx={{
                  fontSize: 12,
                  textDecoration: 'none',
                  textAlign: 'end',
                }}
              >
                Forgot Password?
              </Link>
            </Stack>
            <SubmitButton label="Continue" />
          </Form>
        )}
      </Formik>
    </>
  );
}

function Login() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        pt: [0, 0, 10],
        pb: [2, 4, 4, 14],
      }}
    >
      <Box>
        <Box
          sx={{
            width: ['100%', '100%', '80%', '70%'],
            maxWidth: '1020px',
            mx: 'auto',
            display: 'flex',
            boxSizing: 'border-box',
          }}
        >
          <Grid container sx={{ position: 'relative' }}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                backgroundColor: 'primary.main',
                borderTopLeftRadius: [0, 0, 20],
                borderBottomLeftRadius: [0, 0, 20],
                boxShadow: 24,
                boxSizing: 'border-box',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                sx={{
                  color: 'primary.light',
                  fontSize: ['24px', '28px', '34px'],
                  fontWeight: 600,
                  padding: ['3rem 4rem', '3rem 4rem', '4rem 0 0 4rem'],
                  textAlign: ['center', 'center', 'unset'],
                }}
              >
                Track and manage <br /> All your Investments.
              </Typography>
              <CardMedia
                component="img"
                src="/images/login-mob-image.svg"
                alt="login image"
                sx={{ display: ['block', 'block', 'none'] }}
              />
              <Stack
                sx={{
                  display: ['none', 'none', 'block'],
                  position: 'relative',
                  width: '100%',
                  flex: 1,
                  height: 'auto',
                }}
              >
                <LoginIconsAnimation />
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                position: ['absolute', 'absolute', 'unset'],
                top: ['80%', '80%', '0'],
                px: [1, 1, 0],
                //left: ['3%', '3%', '0'],
              }}
            >
              <Box
                sx={{
                  bgcolor: 'common.white',
                  borderTopLeftRadius: [10, 10, 0],
                  borderBottomLeftRadius: [10, 10, 0],
                  borderTopRightRadius: [10, 10, 20],
                  borderBottomRightRadius: [10, 10, 20],
                  boxShadow: 24,
                  pt: [2, 2],
                  pb: [12, 12, '70px'],
                  px: [4, 8],
                  display: 'flex',
                  flexDirection: 'column',
                  boxSizing: 'border-box',
                }}
              >
                <LoginLogoContainer
                  sx={{ paddingTop: '2em', paddingBottom: '' }}
                ></LoginLogoContainer>
                <LoginMobileNumberSection />
              </Box>
              <Typography
                sx={{
                  textAlign: 'center',
                  //width: ['95%', '95%', '70%'],
                  margin: '50px auto',
                  fontSize: ['10px', '14px'],
                  color: 'text.themePrimary',
                  //pt: ['60%', '50%', 0],
                  display: ['block', 'block', 'none'],
                }}
              >
                Footer | © 2021 All Rights Reserved
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Typography
          sx={{
            textAlign: 'center',
            width: ['95%', '95%', '70%'],
            margin: '50px auto',
            fontSize: ['10px', '14px'],
            color: 'text.themePrimary',
            pt: ['60%', '50%', 0],
            display: ['none', 'none', 'block'],
          }}
        >
          Footer | © 2021 All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
