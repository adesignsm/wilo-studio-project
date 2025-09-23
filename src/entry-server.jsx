import { renderToString } from "react-dom/server";
import App from "./App.server";
import { ShopifyProvider } from "@shopify/hydrogen/server";

export default function renderHydrogen(
  request,
  responseStatusCode,
  responseHeaders,
  context,
) {
  return renderToString(
    <ShopifyProvider {...context}>
      <App />
    </ShopifyProvider>,
  );
}
