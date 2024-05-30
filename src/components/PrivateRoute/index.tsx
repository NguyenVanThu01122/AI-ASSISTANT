"use client";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";

export default function privateRoute(Component: React.FC) {
  return function PrivateRoute(props: any) {
    // const [isShow, setIsShow] = useState(false);
    useLayoutEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        redirect("/login");
      }
      // else {
      // setIsShow(true);
      // }
    }, []);

    // if (isShow) {
    return <Component {...props} />;
    // }
  };
}
