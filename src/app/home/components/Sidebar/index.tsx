import Logo from "@/app/(auth)/login/components/Logo";
import {
  setChatId,
  setEmptyContents,
  setListTitle,
  setLoadingDetail,
  setOpenSidebar,
} from "@/redux/slices/appSlice";
import { RootState } from "@/redux/store";
import chatService from "@/services/chat";
import { EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ListTitle from "./ListTitle";
import styles from "./styles.module.scss";

export default function Sidebar({ id }: { id: string }) {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();

  const isLogin = useSelector((state: RootState) => state.appReducer?.isLogin);
  const loading = useSelector((state: RootState) => state.appReducer.loading);

  const openSidebar = useSelector(
    (app: RootState) => app.appReducer.openSidebar
  );

  useEffect(() => {
    if (isLogin) {
      chatService.getListTitleChat().then((res) => {
        dispatch(setListTitle(res?.data));
      });
    }
  }, [id, isLogin]);

  return (
    <Box
      className={`${styles.sidebar} ${
        openSidebar ? styles.showSidebar : styles.hiddenSidebar
      }`}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
          <HamburgerIcon
            width="24px"
            height="24px"
            sx={{ cursor: "pointer", display: openSidebar ? "block" : "none" }}
            onClick={() => {
              localStorage.setItem("openSidebar", "false");
              dispatch(setOpenSidebar(false));
            }}
          />
        </Box>
        <Button
          onClick={() => {
            dispatch(setChatId(""));
            dispatch(setEmptyContents());
            dispatch(setLoadingDetail(false));
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
      <ListTitle id={id} />
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
    </Box>
  );
}
