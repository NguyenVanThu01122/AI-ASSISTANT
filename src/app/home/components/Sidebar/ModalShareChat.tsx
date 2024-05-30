import useToastMessage from "@/utils/useToastMessage";
import { LinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useTranslation } from "react-i18next";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

export default function ModalShareChat({ isOpen, onClose, id }: any) {
  const { showSuccess } = useToastMessage();
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("Share A Chat")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box sx={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <Text
              sx={{
                flex: 1,
                border: "2px solid teal",
                borderRadius: "20px",
                padding: "8px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {process.env.NEXT_PUBLIC_URL}/share/{id}
            </Text>
            <CopyToClipboard
              text={`${process.env.NEXT_PUBLIC_URL}/share/${id}`}
              onCopy={() => {
                showSuccess("Success", "Copied to clipboard");
              }}
            >
              <IconButton
                variant="outline"
                colorScheme="teal"
                aria-label="Call Sage"
                fontSize="20px"
                icon={<LinkIcon />}
              />
            </CopyToClipboard>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "6px",
              alignItems: "center",
              mt: "20px",
            }}
          >
            <FacebookShareButton
              hashtag="This is a fantastic chat!"
              url={`${process.env.NEXT_PUBLIC_URL}/share/${id}`}
            >
              <FacebookIcon round={true} size={44} />
            </FacebookShareButton>
            <EmailShareButton
              subject="This is a fantastic chat!"
              url={`${process.env.NEXT_PUBLIC_URL}/share/${id}`}
            >
              <EmailIcon round={true} size={44} />
            </EmailShareButton>
            <TelegramShareButton
              title="This is a fantastic chat!"
              url={`${process.env.NEXT_PUBLIC_URL}/share/${id}`}
            >
              <TelegramIcon round={true} size={44} />
            </TelegramShareButton>
            <LinkedinShareButton
              title="This is a fantastic chat!"
              url={`${process.env.NEXT_PUBLIC_URL}/share/${id}`}
            >
              <LinkedinIcon round={true} size={44} />
            </LinkedinShareButton>
            <TwitterShareButton
              title="This is a fantastic chat!"
              url={`${process.env.NEXT_PUBLIC_URL}/share/${id}`}
            >
              <TwitterIcon round={true} size={44} />
            </TwitterShareButton>
          </Box>
        </ModalBody>

        <ModalFooter sx={{ display: "flex", justifyContent: "center" }}>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            {t("Close")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
