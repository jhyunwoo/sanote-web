"use client"

import { userInfo } from "@/lib/recoil"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useRecoilValue } from "recoil"

export default function ProtectedPage() {
  const user = useRecoilValue(userInfo)
  const router = useRouter()
  useEffect(() => {
    if (!user?.id) {
      router.replace("/auth/signin")
    } else if (!user.verified) {
      router.replace("/auth/confirm-verification")
    }
  }, [user])
  return <></>
}
