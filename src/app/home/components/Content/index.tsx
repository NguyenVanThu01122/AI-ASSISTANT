import { RootState } from "@/redux/store";
import { Box } from "@chakra-ui/react";

import { useSelector } from "react-redux";
import Header from "./Header";
import Main from "./Main";
import styles from "./styles.module.scss";

export default function Content({ id }: { id: string }) {
  const openSidebar = useSelector(
    (app: RootState) => app.appReducer.openSidebar
  );

  return (
    <Box
      className={`${styles.content} ${!openSidebar && styles.noPaddingLeft}`}
    >
      <Header />
      <Main id={id} />
    </Box>
  );
}
