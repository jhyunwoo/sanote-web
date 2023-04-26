"use client"

import pb from "@/lib/pocketbase"
import { userInfo } from "@/lib/recoil"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useRecoilValue } from "recoil"

export default function ConfirmVerification() {
  const user = useRecoilValue(userInfo)
  const router = useRouter()

  async function requestEmailVerification() {
    if (typeof user.email === "string") {
      await pb.collection("users").requestVerification(user?.email)
    }
  }

  useEffect(() => {
    if (!user.id) {
      router.replace("/auth/signin")
    }
  }, [user])

  return (
    <div>
      <div>이메일 인증이 필요합니다</div>
      <div>가입한 이메일을 확인해주세요.</div>
      <button onClick={requestEmailVerification}>이메일 인증 재요청</button>
    </div>
  )
}
