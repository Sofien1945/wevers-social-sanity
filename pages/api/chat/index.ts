import type { NextApiRequest, NextApiResponse } from "next"
import { client } from "../../../utils/client"
import { allChatQuery } from "../../../utils/queries"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const query = allChatQuery()
    const data = await client.fetch(query)
    res.status(200).json(data)
  } else if (req.method === "POST") {
    try {
      const document = req.body
      //console.log(document)

      await client.create(document)
      return res.status(201).json({ success: "data transfer succeeded" })
    } catch (error) {
      return res.status(200).json({ error: error })
    }
  } else if (req.method === "PUT") {
    const { _id, email, message } = req.body
    const data = await client
      .patch(_id)
      .setIfMissing({ messages: [] })
      .insert("after", "messages[-1]", [message])
      .commit()
    //console.log("result: ", data)

    return res.status(200).json(data)
  }
}
