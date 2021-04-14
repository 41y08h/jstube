import { useAuth } from "../contexts/auth";
import { useRouter } from "next/router";

export default function AuthPage({ children }) {
  const router = useRouter();
  const { isLoading, user } = useAuth();

  // Checking auth status
  if (isLoading) return null;

  // Authenticated
  if (user) {
    router.push("/");
    return null;
  }

  // Not Authenticated
  return children;
}
