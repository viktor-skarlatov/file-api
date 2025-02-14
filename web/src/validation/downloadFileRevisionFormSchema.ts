import { object, string, InferType } from 'yup';

export const DownloadFileRevisionFormSchema = object({
  revision: string().required('Revision is required.'),
})

export type DownloadFileRevisionFormFields = InferType<typeof DownloadFileRevisionFormSchema>
