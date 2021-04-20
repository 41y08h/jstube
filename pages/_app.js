import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import AuthProvider from "../contexts/auth";
import queryFn from "../lib/queryFn";
import "../styles/tailwind.css";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn,
    },
  },
});

export default function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <ToastContainer />
    </QueryClientProvider>
  );
}
