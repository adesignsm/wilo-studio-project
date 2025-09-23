import { defineConfig, CookieSessionStorage } from "@shopify/hydrogen/config";

export default defineConfig({
  shopify: {
    storeDomain: "wilo-candles.myshopify.com",
    storefrontToken: "3619e2a77120857c6e57862b096710b6",
    storefrontApiVersion: "2022-07",
  },
  session: CookieSessionStorage("__session", {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  }),
});
