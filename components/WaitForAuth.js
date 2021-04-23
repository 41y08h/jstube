import { useAuth } from "../contexts/auth";

export default function WaitForAuth({ children }) {
  const { isLoading } = useAuth();

  return isLoading ? null : children;
}
