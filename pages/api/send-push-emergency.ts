import pb from "@/lib/pocketbase"
import type { NextApiRequest, NextApiResponse } from "next"
import webPush from "web-push"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (
    !process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY ||
    !process.env.WEB_PUSH_EMAIL ||
    !process.env.WEB_PUSH_PRIVATE_KEY
  ) {
    throw new Error("Environment variables supplied not sufficient.")
  }
  webPush.setVapidDetails(
    `mailto:${process.env.WEB_PUSH_EMAIL}`,
    process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
    process.env.WEB_PUSH_PRIVATE_KEY,
  )
  webPush.setGCMAPIKey("1073585647206")
  const { push } = req.body
  const records = await pb.collection("pushInfos").getFullList()
  for (let i = 0; i < records.length; i++) {
    webPush
      .sendNotification(
        {
          endpoint: records[i].endpoint,
          keys: {
            p256dh: records[i].p256dh,
            auth: records[i].auth,
          },
        },

        JSON.stringify({
          title: push.title,
          message: push.message,
          tag: "message-tag",
        }),
      )
      .catch(e => console.log(e))
  }
  res.status(200)
}
