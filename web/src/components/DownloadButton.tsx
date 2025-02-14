import { Box, Button, IconButton, Menu, MenuItem, Stack } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useCallback, useState } from "react";
import { appDispatch } from "../store/utils";
import { downloadFileAction, setDownloadRevisionInfoAction } from "../store/slices/filesSlice";

interface Props {
  url: string;
}

export function DownloadButton({ url }: Props) {
  const onDownload = useCallback(async (url: string) => {
    appDispatch(downloadFileAction({ url }))
  }, [])

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const onShowMenu: React.MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const onDownloadRevision = useCallback(() => {
    appDispatch(setDownloadRevisionInfoAction({ url }))
    handleClose()
  }, [handleClose, url])

  return (
    <Stack direction="row" flex={1}>
      <Button onClick={() => onDownload(url)}>
        {url}
      </Button>
      <Box flex={1} />
      <IconButton onClick={onShowMenu}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={onDownloadRevision}>Download Revision</MenuItem>
      </Menu>
    </Stack>
  )
}
