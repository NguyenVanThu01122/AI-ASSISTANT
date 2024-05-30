"use client";
import publicRoute from "@/components/PublicRoute";
import { Box } from "@chakra-ui/react";
import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import FormLogin from "./components/FormLogin";
import Introduce from "./components/Introduce";

function LoginPage() {
  const { i18n } = useTranslation();
  useLayoutEffect(() => {
    if (localStorage.getItem("language")) {
      i18n.changeLanguage(localStorage.getItem("language") as string);
    }
  }, []);
  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Introduce />
      <FormLogin />
    </Box>
  );
}

export default publicRoute(LoginPage);
