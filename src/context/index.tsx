"use client";
import { getLocalStorage } from "@/utils/storage";
import { ReactNode, createContext, useState } from "react";

const AppContext = createContext<{
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  infoUser: any;
  setInfoUser: React.Dispatch<React.SetStateAction<any>>;
} | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(!!getLocalStorage("token"));
  const [infoUser, setInfoUser] = useState<any>();

  return (
    <AppContext.Provider
      value={{
        isLogin,
        setIsLogin,
        infoUser,
        setInfoUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
