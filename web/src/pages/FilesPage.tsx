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
import { logOutAction } from "../store/slices/authActions";
import { useCallback, useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { appDispatch } from "../store/utils";
import { DownloadButton } from "../components/DownloadButton";
import { selectDownloadRevisionFileInfo, selectUploadDialogVisible, setUploadDialogVisibleAction } from "../store/slices/filesSlice";
import { UploadFileDialog } from "../components/UploadFileDialog";
import { DownloadRevisionDialog } from "../components/DownloadRevisionDialog";
import { selectUser } from "../store/slices/authSlice";

const FilesContainer = styled(Card)({
  minWidth: 400,
  padding: 8,
})

export function FilesPage() {
  const user = useSelector(selectUser);
  const { data, isFetching, refetch } = useGetFilesQuery();
  const isUploadDialogVisible = useSelector(selectUploadDialogVisible)
  const isDownloadRevisionDialogVisible = useSelector(selectDownloadRevisionFileInfo)

  useEffect(() => {
    refetch()
  }, [user, refetch])

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

  const renderFiles = () => {
    const fileCount = data?.payload?.files?.length ?? 0
    if (!data || fileCount === 0) {
      return <Typography>No files uploaded yet.</Typography>
    }

    return data.payload.files.map(url => <DownloadButton key={url} url={url} />)
  }

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
            {renderFiles()}
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
