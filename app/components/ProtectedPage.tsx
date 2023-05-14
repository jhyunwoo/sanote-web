"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import pb from "@/lib/pocketbase"
import { userInfo } from "@/lib/recoil"

export default function ProtectedPage() {
	const [user, setUser] = useRecoilState(userInfo)
	const router = useRouter()
	useEffect(() => {
		if (!pb.authStore.isValid) {
			router.replace("/auth/signin")
			console.log("work")
		} else if (!pb?.authStore?.model?.verified) {
			router.replace("/auth/confirm-verification")
		} else if (pb.authStore.model.type === "teacher") {
			router.replace("/teachers")
		}
	}, [router, user])

	useEffect(() => {
		async function updateUser() {
			if (typeof pb.authStore.model?.id === "string") {
				try {
					const authData = await pb.collection("users").getOne(pb.authStore.model?.id)
					setUser({
						id: authData?.id,
						username: authData?.username,
						email: authData?.email,
						name: authData?.name,
						avatar: authData?.avatar,
						type: authData?.type,
						studentId: authData?.studentId,
						year: authData?.year,
						class: authData?.class,
						department: authData?.department,
						valid: authData?.valid,
					})
				} catch (e) {
					console.log(e)
				}
			}
		}
		updateUser()
	}, [setUser])

	return <></>
}
