import type { NextApiRequest, NextApiResponse } from "next"
import { postDetailQuery } from "../../../utils/queries"
import { client } from "../../../utils/client"
import { v4 } from "uuid"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id }: any = req.query

  if (req.method === "GET") {
    const query = postDetailQuery(id)
    const data = await client.fetch(query)
    return res.status(200).json(data[0])
  } else if (req.method === "PUT") {
    const { comment, userId } = req.body
    const data = await client
      .patch(id)
      .setIfMissing({ comments: [] })
      .insert("after", "comments[-1]", [
        {
          comment,
          _key: v4(),
          postedBy: { _type: "postedBy", _ref: userId },
        },
      ])
      .commit()

    return res.status(200).json(data)
  }
}
