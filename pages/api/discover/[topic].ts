import { NextApiRequest, NextApiResponse } from "next"
import { v4 } from "uuid"
import { client } from "../../../utils/client"
import { topicPostsQuery } from "../../../utils/queries"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { topic } = req.query
  if (req.method === "GET") {
    const videosQuery = topicPostsQuery(topic)
    const videos = await client.fetch(videosQuery)

    return res.status(200).json(videos)
  }
}
