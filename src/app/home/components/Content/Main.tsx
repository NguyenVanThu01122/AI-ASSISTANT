import { RootState } from "@/redux/store";
import { Box, Spinner } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import ExamplePrompt from "./ExamplePrompt";
import InputPrompt from "./InputPrompt";
import ListChat from "./ListChat";

export default function Main({ id }: { id: string }) {
  const loadingDetail = useSelector(
    (state: RootState) => state.appReducer.loadingDetail
  );
  const contents = useSelector((state: RootState) => state.appReducer.contents);

  return (
    <Box
      sx={{
        flex: 1,
        height: "calc(100vh - 52px)",
        padding: {
          base: "0px",
          md: "0px 16px",
        },
      }}
    >
      <Box
        sx={{
          maxWidth: "900px",
          margin: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {loadingDetail && (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner
              size="xl"
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="teal"
            />
          </Box>
        )}

        {!id && contents?.length === 0 && <ExamplePrompt />}

        {!loadingDetail && contents?.length > 0 && (
          <ListChat contents={contents} />
        )}

        <InputPrompt />
      </Box>
    </Box>
  );
}
