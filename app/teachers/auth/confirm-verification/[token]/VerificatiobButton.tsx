"use client"

import { useParams, useRouter } from "next/navigation"
import { useRecoilState } from "recoil"
import pb from "@/lib/pocketbase"
import { userInfo } from "@/lib/recoil"

export default function VerificationButton() {
	const params = useParams()
	const router = useRouter()
	const [user, setUser] = useRecoilState(userInfo)
	async function verification() {
		try {
			if (params?.token && typeof params.token === "string") {
				const result = await pb.collection("users").confirmVerification(params.token)

				if (result) {
					if (user.type === "teacher") {
						router.replace("/teachers/auth/confirm-verification/success")
					} else {
						router.replace("/auth/confirm-verification/success")
					}
					setUser({
						id: user.id,
						username: user.username,
						email: user.email,
						name: user.name,
						avatar: user.avatar,
						type: user.type,
						studentId: user.studentId,
						year: user.year,
						class: user.class,
						department: user.department,
						valid: result,
					})
				}
			}
		} catch {
			alert("이메일을 인증할 수 없습니다.")
		}
	}
	return (
		<div className="bg-orange-400 hover:bg-orange-500 transition duration-200 p-1 px-4 rounded-full text-white font-semibold">
			<button onClick={verification}>인증</button>
		</div>
	)
}
