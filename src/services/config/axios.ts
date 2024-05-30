import axios from "axios";

axios.defaults.withCredentials = false;

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_URL || "https://be-open-ai.vercel.app";

async function getToken() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem("token");
}

axios.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response?.data,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = window.localStorage.getItem("refreshToken");
      return axios
        .post("/auth/generate-new-token", {
          refreshToken: refreshToken,
        })
        .then((res) => {
          if (res.status === 201) {
            const data = res?.data;
            localStorage.setItem("token", data?.token);
            localStorage.setItem("refreshToken", data?.refreshToken);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + data?.token;
            return axios(originalRequest);
          }
        })
        .catch((err) => {
          window?.localStorage?.clear();
          const pathNameLogin =
            window?.location?.protocol +
            "//" +
            window?.location?.host +
            "/login";
          window.location.replace(pathNameLogin);
        });
    }
    return Promise.reject(error);
  }
);

export function getApi(url: string, params = {}, other?: any) {
  return axios.get(url, {
    params,
    ...other,
  });
}

export function postApi(url: string, payload = {}, other?: any) {
  return axios.post(url, payload, {
    ...other,
  });
}

export function putApi(url: string, payload = {}, other?: any) {
  return axios.put(url, payload, {
    ...other,
  });
}

export function patchApi(url: string, payload = {}, config?: any) {
  return axios.patch(url, payload, config);
}

export function deleteApi(url: string, params = {}, other?: any) {
  return axios.delete(url, {
    params,
    ...other,
  });
}
