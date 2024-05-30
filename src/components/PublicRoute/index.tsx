"use client";

import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";

const routesAuth = ["/login", "/register"];

export default function publicRoute(Component: any) {
  return function PublicRoute(props: any) {
    useLayoutEffect(() => {
      const token = localStorage.getItem("token");
      if (token && routesAuth.includes(window.location.pathname)) {
        redirect("/");
      }
    }, []);

    return <Component {...props} />;
  };
}
