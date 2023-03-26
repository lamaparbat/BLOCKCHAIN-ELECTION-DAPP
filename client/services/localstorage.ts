export const getStorage = (key:string) => {
  if (typeof window !== "undefined") return localStorage?.getItem(key);
  return null;
}

export const setStorage = (key:string, value:string) => {
  window?.localStorage?.setItem(
    key,
    typeof value === 'string' ? value : JSON.stringify(value)
  );
}