import { postApi } from "./config/axios";

const authServices = {
  login: (payload: any) => {
    return postApi("/auth/login", payload);
  },
};

export default authServices;
