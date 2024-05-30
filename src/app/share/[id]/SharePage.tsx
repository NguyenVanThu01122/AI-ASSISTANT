"use client";
import publicRoute from "@/components/PublicRoute";
import { Avatar, Box, Button, Divider, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

function SharePage({ chat }: any) {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <Box
      sx={{
        background: "content",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "auto",
          height: "100%",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Text sx={{ fontSize: "32px", fontWeight: "medium" }}>
          {chat?.title}
        </Text>
        <Text>{dayjs(chat?.createdAt).format("DD/MM/YYYY HH:mm")}</Text>
        <Divider sx={{ marginTop: "10px", marginBottom: "20px" }} />
        <Box sx={{ flex: 1, overflowY: "auto", paddingRight: "10px" }}>
          {chat?.messages?.map((item: any, index: number) => {
            return (
              <Box
                key={index}
                sx={{ display: "flex", gap: "12px", mb: "24px" }}
              >
                {item?.ai ? (
                  <Avatar src="/images/logo-ai-assistant.png" />
                ) : (
                  <Avatar src="" />
                )}
                <Box sx={{ flex: 1 }}>
                  <Text sx={{ fontWeight: "bold" }}>
                    {item?.ai ? "AI Assistant" : "User"}
                  </Text>
                  {item?.text ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item?.text?.replace(/\\n/g, "<br />"),
                        // __html: item?.text,
                      }}
                    />
                  ) : (
                    <Text color="red.400">
                      {t("An error occurred. Please try again.")}
                    </Text>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button colorScheme="teal" size="lg" onClick={() => router.push("/")}>
            {t("Start with AI Assistant")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default publicRoute(SharePage);
