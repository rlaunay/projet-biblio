import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queries/client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const rootEl = document.getElementById("root");
const root = createRoot(rootEl);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
