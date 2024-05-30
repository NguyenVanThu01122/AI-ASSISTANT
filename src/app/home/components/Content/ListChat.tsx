import { RootState } from "@/redux/store";
import { Avatar, Box, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function ListChat({ contents }: any) {
  const { t } = useTranslation();
  const loading = useSelector((state: RootState) => state.appReducer.loading);
  const infoUser: any = useSelector(
    (state: RootState) => state.appReducer.infoUser
  );

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [contents]);

  return (
    <Box
      ref={containerRef}
      sx={{
        flex: 1,
        overflowY: "auto",
        p: "6px 0px",
        paddingRight: "10px",
      }}
    >
      {contents?.map((item: any, index: number) => {
        return (
          <Box key={index} sx={{ display: "flex", gap: "12px", mb: "24px" }}>
            {item?.ai ? (
              <Avatar src="/images/logo-ai-assistant.png" />
            ) : (
              <Avatar src={infoUser?.avatar} />
            )}
            <Box sx={{ flex: 1 }}>
              <Text sx={{ fontWeight: "bold" }}>
                {item?.ai ? "AI Assistant" : "You"}
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
      {loading && (
        <Box sx={{ display: "flex", gap: "12px", mb: "24px" }}>
          <Avatar src="/images/logo-ai-assistant.png" />
          <Box sx={{ flex: 1 }}>
            <Text sx={{ fontWeight: "bold" }}>AI Assistant</Text>
            <Spinner size="sm" mt={1} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
