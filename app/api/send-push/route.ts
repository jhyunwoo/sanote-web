import pb from "@/lib/pocketbase"
import { NextResponse } from "next/server"
import webpush from "web-push"

export async function POST(request: Request) {
  webpush.setVapidDetails(
    "mailto:jhyunwoo0228@gmail.com",
    "BCVNyyitZCQORywJsVmjfM4nd1Ptr4t9wbiYS4oUADsw79qKnL7mzezHbgQLXqnBbICpL8ayuLO5WH2wDwyXkIE",
    "eHZEE5_HN6ccCv2xUotmnkMmjmMZNEUjviHvB3exLyQ",
  )
  const userList = await request.json()
  let pushList: any[] = []
  userList.map(async (data: any) => {
    const records = await pb.collection("pushInfos").getFullList({
      filter: `user.id="${data.id}"`,
    })
    for (let i = 0; i < records.length; i++) {
      const result = webpush
        .sendNotification(
          {
            endpoint: records[i].endpoint,
            keys: {
              p256dh: records[i].p256dh,
              auth: records[i].auth,
            },
          },
          new Buffer(JSON.stringify("hello"), "utf8"),
        )
        .catch(e => console.log(e))
      console.log(result)
    }
  })
  // const list = await pb.collection("pushInfos").getFullList()
  // console.log(list)

  return NextResponse.json("hello")
}
