import AuthContext from ".";
import { FC, useState } from "react";
import LoginModal from "../../components/LoginModal";
import { useQuery, UseQueryOptions } from "react-query";

const AuthProvider: FC = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const options: UseQueryOptions = {
    retry: false,
    refetchOnWindowFocus: false,
  };
  const { isLoading, error, data: user } = useQuery("/api/auth/user", options);

  function authenticatedAction(action: Function) {
    // The auth status is loading
    if (isLoading) return;

    // The user is authenticated
    const isUserAuthenticated = Boolean(user);
    if (isUserAuthenticated) return action();

    // The user is not authenticated
    setIsLoginModalOpen(true);
  }

  const value = {
    isLoading,
    error,
    user,
    authenticatedAction,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
