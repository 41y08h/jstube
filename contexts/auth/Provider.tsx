import { AxiosError } from "axios";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import User from "../../interfaces/User";
import AuthContext from ".";
import LoginModal from "../../components/LoginModal";

const AuthProvider: FC = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { isLoading, error, data } = useQuery<User, AxiosError>(
    "/api/auth/user",
    { retry: false, refetchOnWindowFocus: false }
  );

  const user = data;

  const authenticatedAction = (action: Function) => () => {
    // The auth status is loading
    if (isLoading) return;

    // The user is authenticated
    const isUserAuthenticated = Boolean(user);
    if (isUserAuthenticated) return action();

    // The user is not authenticated
    setIsLoginModalOpen(true);
  };

  const value = { isLoading, error, authenticatedAction, user };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
