import { Input, InputProps, Stack, styled, Typography } from "@mui/material";
import { type Control, Controller, FieldPath, FieldValues } from "react-hook-form";

const ErrorText = styled(Typography)({
  alignSelf: 'flex-start',
  fontSize: 13
})

interface Props<T extends FieldValues> extends InputProps {
  control: Control<T>;
  name: FieldPath<T>;
}

export function FormInput<T extends FieldValues>({ control, name, ...inputProps }: Props<T>) {
  return <Controller 
    control={control}
    name={name}
    render={({field: { value, onChange }, fieldState: { error } }) => (
      <Stack gap={1}>
        <Input {...inputProps} value={value} onChange={onChange} />
        <ErrorText color="error">{error?.message}</ErrorText>
      </Stack>
    )}
  />
}
