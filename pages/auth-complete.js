import nookies from "nookies";

export default function AuthComplete() {
  return null;
}

export async function getServerSideProps(ctx) {
  const { token } = ctx.query;
  if (token)
    nookies.set(ctx, "token", token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 1000 * 60 * 24 * 7,
    });

  return { redirect: { destination: "/", permanent: false } };
}
