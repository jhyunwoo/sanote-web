"use client"

import pb from "@/lib/pocketbase"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useRecoilValue } from "recoil"
import { authChaged } from "@/lib/recoil"

export default function ProtectedPage() {
  const auth = useRecoilValue(authChaged)
  const router = useRouter()
  useEffect(() => {
    if (!pb.authStore.isValid) {
      router.replace("/auth/signin")
    } else if (!pb?.authStore?.model?.verified) {
      router.replace("/auth/confirm-verification")
    }
  }, [auth])
  return <></>
}
