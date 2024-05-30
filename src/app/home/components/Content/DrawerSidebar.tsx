import { Drawer, DrawerContent, DrawerOverlay } from "@chakra-ui/react";

import Logo from "@/app/(auth)/login/components/Logo";
import {
  setChatId,
  setEmptyContents,
  setLoadingDetail,
} from "@/redux/slices/appSlice";
import { RootState } from "@/redux/store";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ListTitle from "../Sidebar/ListTitle";

export default function DrawerSidebar({ isOpen, onClose }: any) {
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.appReducer.chatId);
  const isLogin = useSelector((state: RootState) => state.appReducer?.isLogin);
  const loading = useSelector((state: RootState) => state.appReducer.loading);
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent
        sx={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              // height: "52px",
            }}
          >
            <Logo
              sx={{
                "& *": {
                  fontSize: "22px !important",
                },
                "& img": {
                  width: "35px",
                  height: "35px",
                },
              }}
            />
            <CloseIcon
              width="16px"
              height="16px"
              sx={{
                cursor: "pointer",
              }}
              onClick={() => {
                onClose();
              }}
            />
          </Box>
          <Button
            onClick={() => {
              dispatch(setChatId(""));
              dispatch(setEmptyContents());
              dispatch(setLoadingDetail(false));
              onClose();
              router.replace("/");
            }}
            rightIcon={<EditIcon />}
            colorScheme="teal"
            variant="outline"
            width="100%"
            mt={4}
            isDisabled={loading}
            // _hover={{ bg: "teal.100" }}
          >
            {t("New chat")}
          </Button>
        </Box>
        <ListTitle onClose={onClose} id={id} />
        {!isLogin && (
          <Box>
            <Button
              width="100%"
              colorScheme="teal"
              onClick={() => {
                router.push("/login");
              }}
            >
              {t("Login")}
            </Button>
            <Text textAlign="center">{t("Login to use more features")}</Text>
          </Box>
        )}
      </DrawerContent>
    </Drawer>
  );
}
