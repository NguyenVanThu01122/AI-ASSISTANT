import { Metadata } from "next";
import LoginPage from "./LoginPage";

export const metadata: Metadata = {
  title: "Login",
  description: "Login for your account",
};

export default function Login() {
  return <LoginPage />;
}
