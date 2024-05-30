import ModalDelete from "@/components/ModalDelete";
import {
  setChatId,
  setEmptyContents,
  setListTitle,
} from "@/redux/slices/appSlice";
import { RootState } from "@/redux/store";
import chatService from "@/services/chat";
import useToastMessage from "@/utils/useToastMessage";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";

import { useTranslation } from "react-i18next";
import { FaPencilAlt, FaRegShareSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ModalShareChat from "./ModalShareChat";

export default function ListTitle({ onClose, id }: any) {
  const { t } = useTranslation();
  const { showSuccess } = useToastMessage();
  const refInput = useRef<any>(null);
  const [idEdit, setIdEdit] = useState("");
  const [titleEdit, setTitleEdit] = useState("");
  const [idDelete, setIdDelete] = useState("");
  const [idShare, setIdShare] = useState("");
  const listTitle: any = useSelector(
    (state: RootState) => state.appReducer?.listTitle
  );
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const { colorMode } = useColorMode();

  const handleRenameTitle = () => {
    chatService
      .renameTitleChat(idEdit, { title: titleEdit })
      .then(() => {
        setIdEdit("");
        setTitleEdit("");

        const clone = [...listTitle];
        const index = clone?.findIndex((item: any) => item?.id === idEdit);
        clone[index] = {
          ...clone[index],
          title: titleEdit,
        };
        dispatch(setListTitle([...clone]));

        // dispatch(setReload());
      })
      .then(() => {
        showSuccess("Success", "Rename title success");
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <Box sx={{ flex: 1, overflowY: "auto", padding: "10px 0px" }}>
      {listTitle?.map((item: any) =>
        item?.id !== idEdit ? (
          <Box
            key={item?.id}
            sx={{
              border: "1px solid transparent",
              borderRadius: "10px",
              padding: "6px",
              mb: "6px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
              background:
                item?.id === id
                  ? colorMode === "light"
                    ? "gray.200"
                    : "teal"
                  : "transparent",
            }}
            _hover={{
              backgroundColor: colorMode === "light" ? "gray.200" : "teal",
              "& .icon": {
                display: "block !important",
              },
            }}
            onClick={() => {
              if (onClose) {
                onClose();
              }
              router.push(`${pathname}?id=${item?.id}`);
            }}
          >
            <Text
              sx={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {item?.title}
            </Text>
            <Menu>
              <MenuButton
                sx={{
                  position: "absolute",
                  padding: "0px 5px",
                  backgroundColor: colorMode === "light" ? "gray.200" : "teal",
                  right: "5px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Icon
                  width={5}
                  height={5}
                  as={AiOutlineEllipsis}
                  sx={{ display: "none" }}
                  className="icon"
                />
              </MenuButton>
              <MenuList
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <MenuItem
                  icon={<FaPencilAlt />}
                  onClick={() => {
                    setIdEdit(item?.id);
                    setTitleEdit(item?.title);
                    setTimeout(() => {
                      refInput?.current?.focus();
                    }, 300);
                  }}
                >
                  {t("Rename")}
                </MenuItem>
                <MenuItem
                  icon={<FaRegShareSquare />}
                  onClick={() => {
                    setIdShare(item?.id);
                  }}
                >
                  {t("Share")}
                </MenuItem>
                <MenuItem
                  icon={<DeleteIcon />}
                  onClick={() => {
                    setIdDelete(item?.id);
                  }}
                >
                  {t("Delete")}
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        ) : (
          <Input
            onBlur={() => {
              handleRenameTitle();
            }}
            ref={refInput}
            sx={{
              padding: "6px",
              background:
                item?.id === id
                  ? colorMode === "light"
                    ? "gray.200"
                    : "teal"
                  : "transparent",
            }}
            key={item?.id}
            value={titleEdit}
            onChange={(e) => {
              setTitleEdit(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleRenameTitle();
              }
            }}
          />
        )
      )}
      {idDelete && (
        <ModalDelete
          isOpen={!!idDelete}
          onClose={() => setIdDelete("")}
          ref={null}
          title="Delete Chat"
          description="Are you sure you want to delete this chat?"
          onDelete={() => {
            chatService.deleteChat(idDelete).then(() => {
              const clone = [...listTitle];
              const index = clone?.findIndex(
                (item: any) => item?.id === idDelete
              );
              clone.splice(index, 1);
              dispatch(setListTitle([...clone]));
              showSuccess("Success", "Delete this chat success");
              setIdDelete("");
              if (idDelete === id) {
                router.push(`${pathname}`);
                dispatch(setChatId(""));
                dispatch(setEmptyContents());
              }
            });
          }}
        />
      )}

      {idShare && (
        <ModalShareChat
          id={idShare}
          isOpen={!!idShare}
          onClose={() => {
            setIdShare("");
          }}
        />
      )}
    </Box>
  );
}
