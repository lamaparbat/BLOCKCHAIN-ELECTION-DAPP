
export const getStorage = (key) => {
  if (typeof window !== "undefined") {
    return localStorage?.getItem(key);
  }
}

export const setStorage = (key, value) => {
  localStorage.setItem(
    key,
    typeof value === 'string' ? value : JSON.stringify(value)
  );
}