import { Button, Card, Divider, Modal, Stack, styled, Typography } from "@mui/material";
import { useCallback } from "react";
import { appDispatch } from "../store/utils";
import { setDownloadRevisionInfoAction } from "../store/slices/filesSlice";
import { TextInput } from "./TextInput";
import { useDownloadFileRevision } from "../hooks/useDownloadFileRevision";

const Container = styled(Card)({
  minWidth: 400,
})

const OkButton = styled(Button)({
  alignSelf: 'flex-end',
})

export function DownloadRevisionDialog() {
  const { formControl, onDownload } = useDownloadFileRevision()

  const onClose = useCallback(() => {
    appDispatch(setDownloadRevisionInfoAction())
  }, [])

  return (
    <Modal open={true}>
      <Stack height="100%" alignItems="center" justifyContent="center">
        <Container>
          <Stack gap={2} padding={2}>
            <Typography flex={1} variant="h5">Upload File</Typography>
            <Stack gap={2}>
              <TextInput placeholder="Revision" control={formControl} name="revision" />
            </Stack>
            <Divider />

            <Stack direction="row" gap={2} alignSelf="flex-end">
              <OkButton onClick={onClose}>
                Cancel
              </OkButton>
              <OkButton variant="contained" onClick={onDownload}>
                Download
              </OkButton>
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </Modal>
  )
}
