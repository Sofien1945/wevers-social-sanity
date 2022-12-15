import { NextApiRequest, NextApiResponse } from "next"
import { v4 } from "uuid"
import { client } from "../../../utils/client"
import { searchPostsQuery } from "../../../utils/queries"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { searchItem } = req.query
  if (req.method === "GET") {
    const videosQuery = searchPostsQuery(searchItem)
    const videos = await client.fetch(videosQuery)

    return res.status(200).json(videos)
  }
}
