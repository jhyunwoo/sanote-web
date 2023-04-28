import { NextResponse } from "next/server"
import webpush from "web-push"

import { headers } from "next/headers"

export async function POST(request: Request) {
  //   webpush.setVapidDetails(
  //     "mailto:jhyunwoo0228@gmail.com",
  //     process.env.PUSH_PUBLIC_KEY,
  //     process.env.PUSH_PRIVATE_KEY,
  //   )
  const res = await request.json()

  console.log(res)
  return NextResponse.json("hello")
}
