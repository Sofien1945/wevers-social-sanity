import { NextApiRequest, NextApiResponse } from "next"
import { v4 } from "uuid"
import { client } from "../../../utils/client"
import {
  singleUserQuery,
  userCreatedPostsQuery,
  userLikedPostsQuery,
} from "../../../utils/queries"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query
  if (req.method === "GET") {
    const query = singleUserQuery(userId)
    const userVideosQuery = userCreatedPostsQuery(userId)
    const userLikedVideosQuery = userLikedPostsQuery(userId)

    const user = await client.fetch(query)
    const userVideos = await client.fetch(userVideosQuery)
    const userLikedVideos = await client.fetch(userLikedVideosQuery)

    const data = { user: user[0], userVideos, userLikedVideos }

    res.status(200).json(data)
  }
}
