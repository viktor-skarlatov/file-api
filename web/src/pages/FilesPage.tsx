import { Button, Card, IconButton, LinearProgress, Link, Menu, MenuItem, Stack, styled, Typography } from "@mui/material";
import { useGetFilesQuery, useLazyDownloadQuery } from "../store/api/filesApi";
import { useSelector } from "react-redux";
import { logOutAction, selectUser } from "../store/slices/authSlice";
import { useCallback, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { appDispatch } from "../store/utils";

const FilesContainer = styled(Card)({
  minWidth: 400,
  padding: 8
})

export function FilesPage() {
  const user = useSelector(selectUser);
  const { data, isFetching } = useGetFilesQuery();
  const [download] = useLazyDownloadQuery();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDownload = useCallback(async (url: string) => {
    const data = (await download(url).unwrap()) as BlobPart;
    const blob = new Blob([data], { type: 'application/octet-stream' })
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    const fileName = 'downloaded-doc.pdf';
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [download])

  const onUpload = useCallback(() => {}, [])
  const logOut = useCallback(() => {
    appDispatch(logOutAction())
  }, [])

  return (
    <Stack gap={3}>
      <Stack direction="row">
        <Typography flex={1} variant="h5">Files for {user?.username}</Typography>
        <IconButton onClick={handleClick}>
          <MenuIcon />
        </IconButton>
      </Stack>
      <FilesContainer>
        <Stack alignItems="flex-start" gap={1}>
          {
            data?.files?.map(url => (
              <Link key={url} component={Button} href="#" onClick={() => onDownload(url)}>{url}</Link>
            ))
          }
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
        <MenuItem onClick={logOut}>Logout</MenuItem>
      </Menu>
    </Stack>
  );
}
