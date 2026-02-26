import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie" 

type Data = {
  name: string;
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body : {
    token : string
  }
}

export default function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>,
) {

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("shop-token", req.body.token , {
      httpOnly : true,
      path : "/",
      maxAge : 3600 * 24 * 30,
      sameSite : "lax"
    })
  )

  res.status(200).json({ name: "John Doe" });
}
