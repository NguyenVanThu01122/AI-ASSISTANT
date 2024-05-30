import { ColorModeScript, theme } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Assistant - Explore the world of AI",
  description: "Explore the world of AI with our AI assistant.",
  openGraph: {
    title: "AI Assistant - Explore the world of AI",
    description: "Explore the world of AI with our AI assistant.",
    url: process.env.NEXT_PUBLIC_URL,
    siteName: "AI Assistant",
    images: [
      {
        url: "https://assets-global.website-files.com/645523c36dce1ac1ed9106e2/64dde1726d446b169fb8d05d_GPT-3%20Personal%20Assistant.png", // Must be an absolute URL
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/images/logo-ai-assistant.png"
          type="image/png"
        />
      </head>
      <body className={inter.className}>
        {/* Add ColorModeScript to use the color mode feature of Chakra UI. */}
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
