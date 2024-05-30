import { deleteApi, getApi, postApi, putApi } from "./config/axios";

const chatService = {
  createNewChat: (body: { prompt: string }, isLogin: boolean) => {
    return postApi(
      isLogin
        ? "/chat-completion/create-new-chat"
        : "/chat-completion/public/create-new-chat",
      body
    );
  },
  continueChat: (body: { prompt: string; id: string }) => {
    return postApi("/chat-completion/continue-chat", body);
  },
  getDetailChat: (id: string) => {
    return getApi(`/chat-completion/get-detail-chat/${id}`);
  },
  getListTitleChat: () => {
    return getApi(`/chat-completion/get-list-title-chat`);
  },
  renameTitleChat: (id: string, body: { title: string }) => {
    return putApi(`/chat-completion/rename-title-chat/${id}`, body);
  },
  deleteChat: (id: string) => {
    return deleteApi(`/chat-completion/delete-chat/${id}`);
  },
};

export default chatService;
