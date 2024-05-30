import {
  addContents,
  setChatId,
  setEmptyContents,
  setLoading,
  setPrompt,
} from "@/redux/slices/appSlice";
import { RootState } from "@/redux/store";
import chatService from "@/services/chat";
import useToastMessage from "@/utils/useToastMessage";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./styles.module.scss";

export default function InputPrompt() {
  const { t, i18n } = useTranslation();
  const isLogin = useSelector((state: RootState) => state.appReducer.isLogin);
  const loading = useSelector((state: RootState) => state.appReducer.loading);
  const id = useSelector((state: RootState) => state.appReducer.chatId);
  const prompt = useSelector((state: RootState) => state.appReducer.prompt);
  const contents = useSelector((state: RootState) => state.appReducer.contents);

  const { showError } = useToastMessage();
  const dispatch = useDispatch();

  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<any>(null);

  const createNewChat = () => {
    dispatch(addContents([{ ai: false, text: prompt }]));
    dispatch(setLoading(true));
    chatService
      .createNewChat({ prompt }, isLogin)
      .then((res: any) => {
        dispatch(addContents([{ ai: true, text: res?.result }]));
        dispatch(setChatId(res?.id));
        if (isLogin) {
          router.push(`${pathname}/?id=${res?.id}`);
        }
      })
      .catch((err) => {
        dispatch(setEmptyContents());
        showError(
          "Error",
          err?.response?.data?.message ||
            err?.response?.data?.error?.message ||
            err?.message
        );
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
    dispatch(setPrompt(""));
  };

  const continueChat = () => {
    dispatch(setLoading(true));
    dispatch(addContents([{ ai: false, text: prompt }]));

    chatService
      .continueChat({ prompt, id })
      .then((res: any) => {
        dispatch(addContents([{ ai: true, text: res?.result }]));
      })
      .catch((err) => {
        dispatch(addContents([{ ai: true, text: null }]));
        showError(
          "Error",
          err?.response?.data?.message ||
            err?.response?.data?.error?.message ||
            err?.message
        );
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
    dispatch(setPrompt(""));
  };

  const handleSubmit = () => {
    if (contents?.length === 0) {
      createNewChat();
    } else {
      continueChat();
    }
  };

  useEffect(() => {
    ref.current.focus();
  }, [id, loading]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          gap: "4px",
          border: "1px solid",
          borderColor: "teal",
          padding: "10px",
          borderRadius: "20px",
        }}
      >
        <TextareaAutosize
          disabled={loading}
          ref={ref}
          onChange={(e) => dispatch(setPrompt(e.target.value))}
          value={prompt}
          maxRows={8}
          className={styles.textarea}
          placeholder={t("Type your prompt here")}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              ref.current.blur();
              handleSubmit();
            }
          }}
        />
        <IconButton
          isLoading={loading}
          isRound={true}
          variant="solid"
          colorScheme="teal"
          aria-label="Done"
          fontSize="20px"
          icon={<ArrowUpIcon />}
          onClick={handleSubmit}
        />
      </Box>
      <Text sx={{ textAlign: "center", fontSize: "13px", mt: 1 }}>
        {t(
          "AI Assistant can make mistakes. Please check important information."
        )}
      </Text>
    </Box>
  );
}
