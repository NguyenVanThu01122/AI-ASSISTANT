// app/providers.tsx
"use client";
import { AppProvider } from "@/context";
import { store } from "@/redux/store";
import "@/utils/i18n";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import theme from "./theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <Provider store={store}>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </Provider>
    </AppProvider>
  );
}
