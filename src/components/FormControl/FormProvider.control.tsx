import { Keyboard, TouchableWithoutFeedback } from "react-native";
import {
  FormProvider as RHFormProvider,
  UseFormProps,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = Omit<UseFormProps, "defaultValues" | "resolver" | "values"> & {
  children: React.ReactNode;
  submitHandler: any;
  validationSchema: any;
  defaultValues: any;
  className?: string;
  style?: any;
};

export const FormProvider: React.FC<Props> = ({
  children,
  submitHandler,
  validationSchema,
  defaultValues,
  className,
  style,
  ...rest
}) => {
  const methods = useForm<any>({
    defaultValues,
    resolver: zodResolver(validationSchema),
    ...rest,
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <RHFormProvider {...methods}>
        <form
          className={className}
          style={style}
          onSubmit={methods.handleSubmit(submitHandler)}
        >
          {children}
        </form>
      </RHFormProvider>
    </TouchableWithoutFeedback>
  );
};
