import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
export default function CustomTextInput({
  label,
  placeholder,
  error,
  helperText,
  register,
  isRequired,
  size = "lg",
}: {
  label?: string;
  placeholder?: string;
  error?: any;
  helperText?: string;
  register?: any;
  isRequired?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const { t } = useTranslation();
  return (
    <FormControl
      isInvalid={!!error}
      sx={{ mb: "16px" }}
      isRequired={isRequired}
    >
      {label && <FormLabel>{t(label)}</FormLabel>}

      <Input
        type="text"
        placeholder={t(placeholder as string)}
        {...register}
        size={size}
        focusBorderColor="green.600"
      />
      {helperText && <FormHelperText>{t(helperText)}</FormHelperText>}
      {error && <FormErrorMessage>{t(error.message)}</FormErrorMessage>}
    </FormControl>
  );
}
