import nookies from "nookies";

export default function AuthComplete() {
  return null;
}

export async function getServerSideProps(ctx) {
  console.log("hit auth complete");
  const { token } = ctx.query;
  if (token)
    nookies.set(ctx, "token", token, {
      path: "/",
      httpOnly: true,
    });

  return { redirect: { destination: "/", permanent: false } };
}
