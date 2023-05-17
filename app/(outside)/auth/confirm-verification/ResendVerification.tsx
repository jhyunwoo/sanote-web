"use client"

import pb from "@/lib/pocketbase"
import { userInfo } from "@/lib/recoil"
import { useRecoilValue } from "recoil"

export default function ResendVerification() {
	const user = useRecoilValue(userInfo)
	async function resend() {
		if (user.email) {
			try {
				await pb.collection("users").requestVerification(user?.email)
				alert("이메일 전송을 완료했습니다.")
			} catch {
				alert("로그인 정보가 없어 메일을 보낼 수 없습니다.")
			}
		} else {
			alert("로그인 정보가 없어 메일을 보낼 수 없습니다.")
		}
	}
	return (
		<div className="text-orange-400 hover:text-orange-500 transition duration-200 p-2 px-6 rounded-full mt-4 text-sm">
			<button onClick={resend}>인증 메일 다시 보내기</button>
		</div>
	)
}
