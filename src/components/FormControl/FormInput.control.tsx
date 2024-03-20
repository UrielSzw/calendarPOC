import { useController, useFormContext } from "react-hook-form";
import {
  StyledTextInput,
  StyledTextInputProps,
} from "../UI/StyledComponents/StyledTextInput.component";

type Props = Omit<
  StyledTextInputProps,
  "value" | "onChange" | "onBlur" | "helperText"
> & {
  name: string;
};

const FormInput: React.FC<Props> = ({ name, ...rest }) => {
  const { control, formState } = useFormContext();
  const { field } = useController({
    name,
    control,
  });

  const ErrorMessage = formState.errors[name]?.message;
  const helperText = ErrorMessage?.toString();

  return (
    <StyledTextInput
      value={field.value as string}
      onChange={field.onChange}
      onBlur={field.onBlur}
      helperText={ErrorMessage && helperText}
      {...rest}
    />
  );
};

export default FormInput;
