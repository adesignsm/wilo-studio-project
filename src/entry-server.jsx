import { renderToString } from "react-dom/server";
import App from "./App.server";

export default function renderHydrogen(
  request,
  responseStatusCode,
  responseHeaders,
  context,
) {
  return renderToString(<App />);
}
