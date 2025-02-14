import { Button, Card, Divider, Modal, Stack, styled, Typography } from "@mui/material";
import { useCallback } from "react";
import { appDispatch } from "../store/utils";
import { setUploadDialogVisibleAction } from "../store/slices/filesSlice";
import { TextInput } from "./TextInput";
import { useFileUpload } from "../hooks/useFileUpload";
import { FileInput } from "./FileInput";

const Container = styled(Card)({
  minWidth: 400,
})

const OkButton = styled(Button)({
  alignSelf: 'flex-end',
})

export function UploadFileDialog() {
  const { formControl, onUpload } = useFileUpload()

  const onClose = useCallback(() => {
    appDispatch(setUploadDialogVisibleAction(false))
  }, [])

  return (
    <Modal open={true}>
      <Stack height="100%" alignItems="center" justifyContent="center">
        <Container>
          <Stack gap={2} padding={2}>
            <Typography flex={1} variant="h5">Upload File</Typography>
            <Stack gap={2}>
              <TextInput autoFocus placeholder="Url" control={formControl} name="url" />
              <FileInput control={formControl} name="file" />
            </Stack>
            <Divider />

            <Stack direction="row" gap={2} alignSelf="flex-end">
              <OkButton onClick={onClose}>
                Cancel
              </OkButton>
              <OkButton variant="contained" onClick={onUpload}>
                Upload
              </OkButton>
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </Modal>
  )
}
