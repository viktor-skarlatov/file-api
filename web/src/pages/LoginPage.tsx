import { Button, Card, LinearProgress, Stack, styled, Typography } from '@mui/material'
import { useLogin } from '../hooks/useLogin'
import { useSelector } from 'react-redux';
import { selectAuthLoading } from '../store/slices/authSlice';
import { TextInput } from '../components/TextInput';

const LoginContainer = styled(Card)({
  'minWidth': 500,
})

export function LoginPage() {
  const { formControl, login } = useLogin()
  const isLoading = useSelector(selectAuthLoading)

  return (
    <Stack>
      <LoginContainer>
        <Stack gap={2} padding={4}>
        <Typography>Cognizant File Manager Login</Typography>
          <TextInput autoFocus control={formControl} name="username" placeholder="Username" />
          <TextInput type="password" control={formControl} name="password" hidden placeholder="Password" />
          <Button data-testid="login-button" variant="contained" onClick={login}>
            Login
          </Button>
        </Stack>
      </LoginContainer>
      <LinearProgress variant="indeterminate" sx={{ display: isLoading ? 'block' : 'none' }} />
    </Stack>
  )
}