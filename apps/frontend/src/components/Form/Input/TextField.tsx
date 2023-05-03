import { Controller, Control } from "react-hook-form";
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";
import { ComponentProps } from "react";

type TextFieldProps = Omit<
  MuiTextFieldProps,
  | "name"
  | "error"
  | "helperText"
  | "onChange"
  | "onBlur"
  | "value"
  | "inputRef"
  | "defaultValue"
> &
  Pick<ComponentProps<typeof Controller>, "name" | "rules"> & {
    control: Control<any, any>;
  };

export function TextField({ name, control, rules, ...props }: TextFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, error },
      }) => {
        return (
          <MuiTextField
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            defaultValue={value}
            inputRef={ref}
            error={invalid}
            helperText={error?.message}
            {...props}
          />
        );
      }}
    />
  );
}
