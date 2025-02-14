import { Button, Card, Divider, Modal, Stack, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { clearErrorsAction, selectAppErrors } from "../store/slices/commonSlice";
import { useCallback } from "react";
import { appDispatch } from "../store/utils";

const Container = styled(Card)({
  minWidth: 400,
})

const OkButton = styled(Button)({
  alignSelf: 'flex-end',
})

export function ErrorDialog() {
  const appErrors = useSelector(selectAppErrors)

  const onClose = useCallback(() => {
    appDispatch(clearErrorsAction())
  }, [])

  return (
    <Modal open={appErrors.length > 0}>
      <Stack height="100%" alignItems="center" justifyContent="center">
        <Container>
          <Stack gap={2} padding={2}>
            <Typography flex={1} variant="h5">Error</Typography>
            <Stack>
              {appErrors.map((message) => (
                <Typography key={message}>{message}</Typography>
              ))}
            </Stack>
            <Divider />
            <OkButton variant="contained" onClick={onClose}>
              OK
            </OkButton>
          </Stack>
        </Container>
      </Stack>
    </Modal>
  )
}
