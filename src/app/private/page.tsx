import { Metadata } from "next/types";
import PrivatePage from "./PrivatePage";

export const metadata: Metadata = {
  title: "Private",
  description: "Explore the world of AI with our AI assistant.",
};

export default function Private() {
  return <PrivatePage />;
}
