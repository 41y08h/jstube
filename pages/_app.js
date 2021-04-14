import "../styles/globals.css";
import AuthProvider from "../contexts/auth";
import { QueryClient, QueryClientProvider } from "react-query";
import queryFn from "../lib/queryFn";

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
    </QueryClientProvider>
  );
}
