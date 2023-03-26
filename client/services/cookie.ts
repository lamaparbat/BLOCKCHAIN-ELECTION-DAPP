export const setCookie = (key:string, value:string) => {
  document.cookie= `${key}=${value}`;
}

export const getCookie = (key) => {
  return document.cookie.split(";")?.find((d:string) => d.includes(key))?.split("=") ?? null;
}
