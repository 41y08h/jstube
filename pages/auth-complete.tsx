import { GetServerSideProps } from "next";
import nookies from "nookies";

export default function AuthComplete() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.query.token;

  if (token) {
    const authCookie = {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 1000 * 60 * 24 * 30,
      sameSite: "strict",
    };
    nookies.set(context, "token", token as string, authCookie);
  }

  return { redirect: { destination: "/", permanent: false } };
};
