import pb from "@/lib/pocketbase"
import type { NextApiRequest, NextApiResponse } from "next"
import webPush from "web-push"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  webPush.setVapidDetails(
    `mailto:jhyunwoo0228@gmail.com`,
    "BCVNyyitZCQORywJsVmjfM4nd1Ptr4t9wbiYS4oUADsw79qKnL7mzezHbgQLXqnBbICpL8ayuLO5WH2wDwyXkIE",
    "eHZEE5_HN6ccCv2xUotmnkMmjmMZNEUjviHvB3exLyQ",
  )
  webPush.setGCMAPIKey("1073585647206")
  const { userInfo, push } = req.body
  let userList = userInfo

  userList.map(async (data: any) => {
    data.students.map(async (id: string) => {
      const records = await pb.collection("pushInfos").getFullList({
        filter: `user.id="${id}"`,
      })
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
    })
  })
  res.status(200)
}
