"use client";

import privateRoute from "@/components/PrivateRoute";
import { Box } from "@chakra-ui/react";

function PrivatePage() {
  return <Box>Private</Box>;
}

export default privateRoute(PrivatePage);
