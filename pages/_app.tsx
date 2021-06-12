import axios, { AxiosError } from "axios";
import type { AppProps } from "next/app";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";
import { AuthProvider } from "../contexts/Auth";
import queryFn from "../lib/queryFunction";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <ToastContainer
        position="bottom-left"
        newestOnTop={true}
        style={{ maxWidth: "100%" }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
