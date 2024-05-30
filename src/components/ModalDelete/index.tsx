import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function ModalDelete({
  isOpen,
  onClose,
  ref,
  title,
  description,
  onDelete,
}: any) {
  const { t } = useTranslation();
  return (
    <AlertDialog
      isCentered
      isOpen={isOpen}
      leastDestructiveRef={ref}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {t(title)}
          </AlertDialogHeader>

          <AlertDialogBody>{t(description)}</AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose}>{t("Cancel")}</Button>
            <Button colorScheme="red" onClick={onDelete} ml={3}>
              {t("Delete")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
