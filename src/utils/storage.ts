const getLocalStorage = (key: string) => {
  if (typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};

export { getLocalStorage };
