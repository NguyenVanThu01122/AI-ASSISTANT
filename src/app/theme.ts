// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  // styles: {
  //   global: (props: { colorMode: string }) => ({
  //     body: {
  //       bg: props.colorMode === "dark" ? "gray.800" : "white",
  //       color: props.colorMode === "dark" ? "white" : "gray.800",
  //     },
  //   }),
  // },
  semanticTokens: {
    colors: {
      error: "red.500",
      success: "green.500",
      primary: {
        default: "black.500",
        _dark: "red.400",
      },
      secondary: {
        default: "red.800",
        _dark: "red.700",
      },
      sidebar: {
        default: "#F9F9F9",
        _dark: "#181818",
      },
      content: {
        default: "white",
        _dark: "#212121",
      },
    },
  },
});

export default theme;
