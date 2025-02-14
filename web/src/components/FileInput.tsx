import { Stack, styled, Typography } from "@mui/material";
import { type Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { MuiFileInput } from 'mui-file-input'

const ErrorText = styled(Typography)({
  alignSelf: 'flex-start',
  fontSize: 13
})

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
}

export function FileInput<T extends FieldValues>({ control, name }: Props<T>) {
  return <Controller 
    control={control}
    name={name}
    render={({field: { value, onChange }, fieldState: { error } }) => (
      <Stack gap={1}>
        <Stack direction="row" alignItems="center" gap={2}>
          <Typography>File:</Typography>
          <MuiFileInput placeholder="File" multiple={false} value={value} onChange={onChange} />
        </Stack>
        <ErrorText color="error">{error?.message}</ErrorText>
      </Stack>
    )}
  />
}
