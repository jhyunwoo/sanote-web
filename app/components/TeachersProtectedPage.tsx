"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useRecoilValue } from "recoil"
import pb from "@/lib/pocketbase"
import { userInfo } from "@/lib/recoil"

export default function TeachersProtectedPage() {
	const user = useRecoilValue(userInfo)
	const router = useRouter()
	useEffect(() => {
		if (!pb.authStore.isValid) {
			router.replace("/teachers/signin")
		} else if (!pb?.authStore?.model?.verified) {
			router.replace("/auth/confirm-verification")
		} else if (pb.authStore.model.type === "student") {
			router.replace("/")
		}
	}, [user])
	return <></>
}
