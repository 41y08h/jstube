import AuthProvider from "../contexts/auth";
import { QueryClient, QueryClientProvider } from "react-query";
import queryFn from "../lib/queryFn";
import "../styles/tailwind.css";
import "../styles/globals.css";

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
