import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import AuthProvider from "../contexts/auth/Provider";
import queryFn from "../lib/queryFunction";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { queryFn } },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <ToastContainer />
    </QueryClientProvider>
  );
}
