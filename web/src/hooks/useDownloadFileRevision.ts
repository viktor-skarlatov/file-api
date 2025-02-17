import { useCallback } from "react"
import { appDispatch } from "../store/utils"
import { downloadFileAction, selectDownloadRevisionFileInfo } from "../store/slices/filesSlice"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { DownloadFileRevisionFormFields, DownloadFileRevisionFormSchema } from "../validation/downloadFileRevisionFormSchema"
import { useSelector } from "react-redux"

export function useDownloadFileRevision() {
  const fileInfo = useSelector(selectDownloadRevisionFileInfo)

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(DownloadFileRevisionFormSchema),
    defaultValues: {
      revision: 1,
    }
  })

  const onDownload = useCallback((formData: DownloadFileRevisionFormFields) => {
    if (!fileInfo?.url) {
      return
    }

    appDispatch(downloadFileAction({
      url: fileInfo.url,
      revision: formData.revision,
    }))
  }, [fileInfo?.url])
  

  return {
    onDownload: handleSubmit(onDownload),
    formControl: control,
  }
}
