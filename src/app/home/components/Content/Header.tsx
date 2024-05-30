import { RootState } from "@/redux/store";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Text,
  useColorMode,
} from "@chakra-ui/react";

import {
  resetValues,
  setLanguage,
  setOpenSidebar,
  setTheme,
} from "@/redux/slices/appSlice";
import { ExternalLinkIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillMoon, AiOutlineSun } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import DrawerSidebar from "./DrawerSidebar";

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { colorMode, toggleColorMode } = useColorMode();
  const isLogin = useSelector((state: RootState) => state.appReducer.isLogin);
  const openSidebar = useSelector(
    (app: RootState) => app.appReducer.openSidebar
  );
  const infoUser: any = useSelector(
    (state: RootState) => state?.appReducer?.infoUser
  );

  const language = useSelector((app: RootState) => app.appReducer.language);

  const theme = useSelector((app: RootState) => app.appReducer.theme);

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "52px",
        // border: "1px solid black",
      }}
    >
      {!openSidebar && (
        <HamburgerIcon
          width="22px"
          height="22px"
          sx={{
            cursor: "pointer",
            display: {
              base: "none",
              md: "block",
            },
          }}
          onClick={() => {
            localStorage.setItem("openSidebar", "true");
            dispatch(setOpenSidebar(true));
          }}
        />
      )}

      <HamburgerIcon
        width="22px"
        height="22px"
        sx={{
          cursor: "pointer",
          display: {
            base: "block",
            md: "none",
          },
        }}
        onClick={() => {
          setOpenDrawer(true);
        }}
      />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <IconButton
          aria-label="Change theme"
          onClick={() => {
            localStorage.setItem(
              "theme",
              colorMode === "light" ? "dark" : "light"
            );
            dispatch(setTheme(colorMode === "light" ? "dark" : "light"));
            toggleColorMode();
          }}
          fontSize="20px"
          // variant="outline"
          colorScheme="teal"
          icon={theme === "light" ? <AiOutlineSun /> : <AiFillMoon />}
        />
        <Select
          borderColor="teal"
          variant="outline"
          width="150px"
          value={language}
          onChange={(e) => {
            // setLanguage(e?.target?.value);
            localStorage.setItem("language", e?.target?.value);
            dispatch(setLanguage(e?.target?.value));
            i18n.changeLanguage(e?.target?.value);
          }}
        >
          <option value="en">English</option>
          <option value="vi">Vietnamese</option>
        </Select>
        {isLogin && (
          <Menu>
            <MenuButton>
              <Avatar src={infoUser?.avatar} />
            </MenuButton>
            <MenuList>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 12px",
                }}
              >
                <Avatar src={infoUser?.avatar} />
                <Text fontWeight="medium">
                  {infoUser?.firstName || ""} {infoUser?.lastName || ""}
                </Text>
              </Box>
              <Divider sx={{ marginTop: "6px", marginBottom: "8px" }} />
              <MenuItem
                sx={{ display: "flex", gap: "6px" }}
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("refreshToken");
                  localStorage.removeItem("infoUser");
                  localStorage.removeItem("openSidebar");
                  dispatch(resetValues());
                  router.push("/login");
                }}
              >
                <ExternalLinkIcon width="18px" height="18px" />
                {t("Log out")}
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Box>

      <DrawerSidebar isOpen={openDrawer} onClose={() => setOpenDrawer(false)} />
    </Box>
  );
}
