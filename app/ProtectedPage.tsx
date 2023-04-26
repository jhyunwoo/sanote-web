"use client"

import { userInfo } from "@/lib/recoil"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useRecoilValue } from "recoil"

export default function ProtectedPage() {
  const user = useRecoilValue(userInfo)
  const router = useRouter()
  useEffect(() => {
    console.log(user)
    if (!user) {
      router.replace("/auth/signin")
    }
  }, [user])
  return <></>
}
