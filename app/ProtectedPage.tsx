"use client"

import pb from "@/lib/pocketbase"
import { userInfo } from "@/lib/recoil"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useRecoilState } from "recoil"

export default function ProtectedPage() {
  const [user, setUser] = useRecoilState(userInfo)
  const router = useRouter()
  useEffect(() => {
    if (pb.authStore.model) {
      setUser({
        avatar: pb.authStore.model.avatar,
        class: pb.authStore.model.class,
        collectionId: pb.authStore.model.collectionId,
        collectionName: pb.authStore.model.collectionName,
        created: pb.authStore.model.created,
        email: pb.authStore.model.email,
        emailVisibility: pb.authStore.model.emailVisibility,
        id: pb.authStore.model.id,
        isTeacher: pb.authStore.model.isTeacher,
        name: pb.authStore.model.name,
        studentId: pb.authStore.model.studentId,
        updated: pb.authStore.model.updated,
        username: pb.authStore.model.username,
        verified: pb.authStore.model.verified,
        year: pb.authStore.model.year,
      })
    }
  }, [])

  useEffect(() => {
    if (!pb.authStore.model?.id) {
      router.replace("/auth/signin")
    } else if (!pb.authStore.model?.verified) {
      router.replace("/auth/confirm-verification")
    }
  }, [user])
  return <></>
}
