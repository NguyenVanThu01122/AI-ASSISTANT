import { createSlice } from "@reduxjs/toolkit";
// import { authService } from "../services/authService";

// export const fetchUserData = createAsyncThunk(
//   "user/fetchUserData",
//   async (body) => {
//     const data = await authService.getProfile();
//     return data?.data;s
//   }
// );

const appSlice = createSlice({
  name: "app",
  initialState: {
    isLogin: false,
    infoUser: null,
    openSidebar: true,
    language: "en",
    theme: "light",
    chatId: "",
    prompt: "",
    loading: false,
    loadingDetail: false,
    contents: [],
    listTitle: [],
    reload: 0,
  },
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setInfoUser: (state, action) => {
      state.infoUser = action.payload;
    },
    setOpenSidebar: (state, action) => {
      state.openSidebar = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setChatId: (state, action) => {
      state.chatId = action.payload;
    },
    setPrompt: (state, action) => {
      state.prompt = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addContents: (state, action) => {
      const currentContents: any = state.contents;
      state.contents = [...currentContents, ...action.payload] as any;
    },
    setContents: (state, action) => {
      state.contents = action.payload;
    },
    setEmptyContents: (state) => {
      state.contents = [];
    },
    resetValues: (state) => {
      state.isLogin = false;
      state.infoUser = null;
      state.openSidebar = true;
      state.chatId = "";
      state.prompt = "";
      state.loading = false;
      state.contents = [];
    },
    setListTitle: (state, action) => {
      state.listTitle = action.payload;
    },
    setLoadingDetail: (state, action) => {
      state.loadingDetail = action.payload;
    },
    setReload: (state) => {
      state.reload += 1;
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(fetchUserData.pending, (state) => {
  //         state.loading = "pending";
  //       })
  //       .addCase(fetchUserData.fulfilled, (state, action) => {
  //         state.loading = "fulfilled";
  //         state.userData = action.payload;
  //       })
  //       .addCase(fetchUserData.rejected, (state, action) => {
  //         state.loading = "rejected";
  //         // state.error = action.error.message;
  //       });
  //   },
});

export const {
  setLogin,
  setInfoUser,
  setOpenSidebar,
  setTheme,
  setLanguage,
  setChatId,
  setPrompt,
  setLoading,
  addContents,
  setEmptyContents,
  setContents,
  resetValues,
  setListTitle,
  setLoadingDetail,
  setReload,
} = appSlice.actions;
export default appSlice.reducer;
