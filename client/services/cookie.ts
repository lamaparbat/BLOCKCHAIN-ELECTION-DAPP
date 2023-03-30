export const setCookie = (key: string, value: string) => {
  document.cookie = `${key}=${value}`;
}

export const getCookieValue = (cookies: string, key: string) => {
  const extractCookieByColon = cookies?.includes(";") ? cookies?.split(";") : cookies;

  if (typeof extractCookieByColon === "string" && extractCookieByColon.includes(key)) return extractCookieByColon.split("=")[1];
  if (typeof extractCookieByColon === "object") extractCookieByColon?.find((d: string) => d.includes(key))?.split("=")[1];

  return null;
}
