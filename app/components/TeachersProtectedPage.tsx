"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import pb from "@/lib/pocketbase"
import { userInfo } from "@/lib/recoil"

export default function TeachersProtectedPage() {
	const [user, setUser] = useRecoilState(userInfo)
	const router = useRouter()
	useEffect(() => {
		if (!pb.authStore.isValid) {
			router.replace("/teachers/signin")
		} else if (!pb?.authStore?.model?.verified) {
			router.replace("/auth/confirm-verification")
		} else if (pb.authStore.model.type === "student") {
			router.replace("/")
		}
	}, [router, user])
	useEffect(() => {
		async function getUserDate() {
			if (pb.authStore.model?.id) {
				if (user.id === null) {
					const record = await pb.collection("users").getOne(pb.authStore.model?.id)
					setUser({
						id: record.id,
						username: record.username,
						email: record.email,
						name: record.name,
						avatar: record.avatar,
						type: record.type,
						studentId: record.studentId,
						year: record.year,
						class: record.class,
						department: record.department,
						valid: record.valid,
					})
				}
			}
		}
		getUserDate()
	}, [setUser, user.id])
	return <></>
}
