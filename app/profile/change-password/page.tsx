"use client"

import pb from "@/lib/pocketbase"
import { userInfo } from "@/lib/recoil"
import { useRouter } from "next/navigation"
import { useRecoilState } from "recoil"

export default function ChangePassword() {
	const router = useRouter()

	const [user, setUser] = useRecoilState(userInfo)
	function logOut() {
		router.replace("/auth/confirm-password-reset")
		pb.authStore.clear()
		setUser({
			id: null,
			username: null,
			email: null,
			name: null,
			avatar: null,
			type: null,
			studentId: null,
			year: null,
			class: null,
			department: null,
			valid: null,
		})
	}

	async function requestResetPassword() {
		await pb.collection("users").requestPasswordReset(pb.authStore.model?.email)
		logOut()
	}

	return (
		<div className="w-full h-screen fixed top-0 right-0 left-0 bottom-0 flex flex-col justify-center items-center">
			<button
				onClick={requestResetPassword}
				className=" my-2  bg-orange-400 hover:bg-orange-300 p-1 px-4 rounded-full text-white font-semibold transition duration-200"
			>
				비밀번호 변경
			</button>
		</div>
	)
}
