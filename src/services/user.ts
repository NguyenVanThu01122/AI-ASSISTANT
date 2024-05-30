import { getApi } from "./config/axios";

const userService = {
  getInfo: () => {
    return getApi("/user");
  },
};

export default userService;
