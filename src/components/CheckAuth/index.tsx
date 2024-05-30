"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function CheckAuth() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/login");
    }
  }, []);

  return <></>;
}
