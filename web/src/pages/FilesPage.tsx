import {
  Card,
  Divider,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useGetFilesQuery } from "../store/api/filesApi";
import { useSelector } from "react-redux";
import { logOutAction, selectUser } from "../store/slices/authSlice";
import { useCallback, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { appDispatch } from "../store/utils";
import { DownloadButton } from "../components/DownloadButton";
import { selectDownloadRevisionFileInfo, selectUploadDialogVisible, setUploadDialogVisibleAction } from "../store/slices/filesSlice";
import { UploadFileDialog } from "../components/UploadFileDialog";
import { DownloadRevisionDialog } from "../components/DownloadRevisionDialog";

const FilesContainer = styled(Card)({
  minWidth: 400,
  padding: 8,
})

export function FilesPage() {
  const user = useSelector(selectUser);
  const { data, isFetching } = useGetFilesQuery();
  const isUploadDialogVisible = useSelector(selectUploadDialogVisible)
  const isDownloadRevisionDialogVisible = useSelector(selectDownloadRevisionFileInfo)

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, []);

  const onUpload = useCallback(() => {
    appDispatch(setUploadDialogVisibleAction(true))
    handleClose()
  }, [handleClose])

  const onLogOut = useCallback(() => {
    appDispatch(logOutAction())
  }, [])

  return (
    <Stack gap={3}>
      <FilesContainer>
        <Stack gap={2}>
          <Stack direction="row" alignItems="center">
            <Typography ml={1} flex={1} textAlign="start" justifySelf="flex-start" variant="h5">Files for {user?.username}</Typography>
            <IconButton onClick={handleClick}>
              <MenuIcon />
            </IconButton>
          </Stack>
          <Divider />
          <Stack>
            {data?.files?.map(url => <DownloadButton key={url} url={url} />)}
          </Stack>
        </Stack>
      </FilesContainer>
      <LinearProgress variant="indeterminate" sx={{ display: isFetching ? 'block' : 'none' }} />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={onUpload}>Upload file</MenuItem>
        <MenuItem onClick={onLogOut}>Logout</MenuItem>
      </Menu>

      { isUploadDialogVisible ? <UploadFileDialog /> : null }
      { isDownloadRevisionDialogVisible ? <DownloadRevisionDialog /> : null}
    </Stack>
  );
}
