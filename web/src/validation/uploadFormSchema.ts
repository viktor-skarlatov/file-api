import { object, string, InferType, mixed } from 'yup';

export const UploadFormSchema = object({
  url: string().required('Url is required.'),
  file: mixed<File>().required('File is required.')
})

export type UploadFormFields = InferType<typeof UploadFormSchema>
