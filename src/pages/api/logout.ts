import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie" 

type Data = {
  status: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("shop-token", "" , {
      httpOnly : true,
      path : "/",
      maxAge : 0,
      sameSite : "lax"
    })
  )

  res.status(200).json({ status: "success" });
}