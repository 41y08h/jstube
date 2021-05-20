import { FC } from "react";
import { ReactComponent as SignInIcon } from "../../icons/signin.svg";

const SignInButton: FC = () => (
  <a
    href="/api/auth/google"
    className="uppercase text-sm font-medium flex items-center space-x-3 text-blue-500 border border-blue-500 p-2 px-4"
  >
    <SignInIcon className="h-6" />
    <span>Sign in</span>
  </a>
);

export default SignInButton;
