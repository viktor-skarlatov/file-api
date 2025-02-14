import { object, string, InferType } from 'yup';

export const LoginFormSchema = object({
  username: string().required('Username is required.'),
  password: string().required('Password is required.')
})

export type LoginFormFields = InferType<typeof LoginFormSchema>
