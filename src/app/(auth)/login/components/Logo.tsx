import { Box, Image, Text } from "@chakra-ui/react";

export default function Logo({ sx }: { sx?: any }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontWeight: "bold",
        ...sx,
      }}
    >
      <Image
        src="/images/logo-ai-assistant.png"
        alt="logo"
        sx={{ width: "70px", height: "70px" }}
      />
      <Text sx={{ fontSize: "36px" }}>
        <Text as="span" color="green.500">
          AI
        </Text>{" "}
        Assistant
      </Text>
    </Box>
  );
}
