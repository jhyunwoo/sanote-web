"use client"

import pb from "@/lib/pocketbase"
import { userInfo } from "@/lib/recoil"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, ReactNode } from "react"
import { useRecoilState } from "recoil"

type ComponentType = {
  children: ReactNode
}

export default function ProtectTeacherPage({ children }: ComponentType) {
  const [user, setUser] = useRecoilState(userInfo)
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

  return (
    <div>
      {user.isTeacher ? (
        <div>{children}</div>
      ) : (
        <div>
          <div>접근 권한이 없습니다.</div>
          <Link href={"/"}>홈 페이지</Link>
        </div>
      )}
    </div>
  )
}
