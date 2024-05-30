import { useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const useToastMessage = () => {
  const toast = useToast();
  const { t } = useTranslation();

  const showSuccess = (title: string, message: string) => {
    return toast({
      position: "top-right",
      title: t(title),
      description: t(message),
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const showError = (title: string, message: string) => {
    return toast({
      position: "top-right",
      title: t(title),
      description: t(message),
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  };

  return {
    showSuccess,
    showError,
  };
};
export default useToastMessage;
