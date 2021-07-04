import React from "react";
import theme from "../lib/theme";
import type { AppProps } from "next/app";
import axios, { AxiosError } from "axios";
import queryFn from "../lib/queryFunction";
import { AuthProvider } from "../contexts/Auth";
import { ToastContainer, toast } from "react-toastify";
import { ThemeProvider } from "@material-ui/core/styles";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";

import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { queryFn, staleTime: 5 * 60 * 1000, refetchOnMount: "always" },
    mutations: {
      onError(err: AxiosError) {
        toast(err?.response?.data.message, {
          type: "dark",
          hideProgressBar: true,
        });
      },
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>

      <ToastContainer
        position="bottom-left"
        newestOnTop={true}
        style={{ maxWidth: "100%" }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
