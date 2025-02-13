import { Button, Card, LinearProgress, Stack, styled, Typography } from '@mui/material'
import { useLogin } from '../hooks/useLogin'
import { useSelector } from 'react-redux';
import { selectAuthLoading } from '../store/slices/authSlice';
import { FormInput } from '../components/FormInput';

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
          <Typography>File Manager</Typography>
          <FormInput control={formControl} name="username" placeholder="Username" />
          <FormInput control={formControl} name="password" hidden placeholder="Password" />
          <Button variant="contained" onClick={login}>
            Login
          </Button>
        </Stack>
      </LoginContainer>
      <LinearProgress variant="indeterminate" sx={{ display: isLoading ? 'block' : 'none' }} />
    </Stack>
  )
}