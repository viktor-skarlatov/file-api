import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useMemo } from 'react';
import { LoginFormFields, LoginFormSchema } from '../validation/loginFormSchema';
import { loginAction } from '../store/slices/authSlice';
import { appDispatch } from '../store/utils';

export function useLogin() {
  const { handleSubmit, reset, control } = useForm({
    resolver: yupResolver(LoginFormSchema),
    defaultValues: {
      username: '',
      password: ''
    },
  })

  const submit = useCallback((data: LoginFormFields) => {
    appDispatch(loginAction(data));
    reset()
  }, [reset])

  const login = useMemo(() => handleSubmit(submit), [handleSubmit, submit])

  return {
    formControl: control,
    login,
  };
}