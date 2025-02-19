import { useCallback } from "react"
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { appDispatch } from "../store/utils"
import { selectDownloadRevisionFileInfo } from "../store/slices/fileSelectors"
import { DownloadFileRevisionFormFields, DownloadFileRevisionFormSchema } from "../validation/downloadFileRevisionFormSchema"
import { downloadFileAction } from "../store/slices/fileActions"

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
