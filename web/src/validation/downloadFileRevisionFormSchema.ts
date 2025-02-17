import { object, number, InferType } from 'yup';

export const DownloadFileRevisionFormSchema = object({
  revision: number().min(1).required('Revision is required.'),
})

export type DownloadFileRevisionFormFields = InferType<typeof DownloadFileRevisionFormSchema>
