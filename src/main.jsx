import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/router.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { HelmetProvider } from "react-helmet-async";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./providers/ThemeProvider.jsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <div className="">
            <RouterProvider router={router} />
          </div>
        </HelmetProvider>
      </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
