import { useCallback } from "react"
import { appDispatch } from "../store/utils"
import { uploadFileAction } from "../store/slices/filesSlice"
import { UploadFormFields, UploadFormSchema } from "../validation/uploadFormSchema"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

export function useFileUpload() {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(UploadFormSchema),
    defaultValues: {
      url: '',
    },
  })

  const onUpload = useCallback((formData: UploadFormFields) => {
    appDispatch(uploadFileAction(formData))
  }, [])
  

  return {
    onUpload: handleSubmit(onUpload),
    formControl: control,
  }
}
