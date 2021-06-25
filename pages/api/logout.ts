import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Set-Cookie", cookie.serialize("token", ""));
  res.redirect("/");
};
