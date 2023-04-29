import pb from "@/lib/pocketbase"
import { NextResponse } from "next/server"
import webPush from "web-push"

type ResponseData = {
  message: string
}

export async function POST(request:Request ) {
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

  const userList = await request.json()
  const pushList: any[] = []
  userList.map(async (data: any) => {
    const records = await pb.collection("pushInfos").getFullList({
      filter: `user.id="${data.id}"`,
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
            title: "안녕하세요",
            message: "메세지 전송 테스트",
            tag: "message-tag",
          })
        )
        .catch(e => console.log(e))
    }
  })

  return NextResponse.json({ message: 'Hello from Next.js!' })
}
