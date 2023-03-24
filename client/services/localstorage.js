export const getStorage = (key) => {
  if (typeof window !== "undefined") return localStorage?.getItem(key);
  return null;
}

export const setStorage = (key, value) => {
  window?.localStorage?.setItem(
    key,
    typeof value === 'string' ? value : JSON.stringify(value)
  );
}