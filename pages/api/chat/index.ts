import type { NextApiRequest, NextApiResponse } from "next"
import { client } from "../../../utils/client"
import { allPostsQuery } from "../../../utils/queries"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const document = req.body
      console.log(document)
      return res.status(201).json({ success: "data transfer succeeded" })
    } catch (error) {
      return res.status(200).json({ error: error })
    }
  }
}
