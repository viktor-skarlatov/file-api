import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useMemo } from 'react';
import { LoginFormFields, LoginSchema } from '../validation/loginFormSchema';
import { loginAction } from '../store/slices/authSlice';
import { appDispatch } from '../store/utils';

export function useLogin() {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      username: 'skarlatov',
      password: 'pass123'
    },
  })

  const submit = useCallback((data: LoginFormFields) => {
    appDispatch(loginAction(data));
  }, [])

  const login = useMemo(() => handleSubmit(submit), [handleSubmit, submit])

  return {
    formControl: control,
    login,
  };
}