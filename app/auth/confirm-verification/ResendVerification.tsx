"use client"

import pb from "@/lib/pocketbase"

export default function ResendVerification() {
	async function resend() {
		try {
			await pb.collection("users").requestVerification(pb?.authStore?.model?.email)
			alert("이메일을 다시 확인해주세요.")
		} catch {
			alert("로그인 정보가 없어 메일을 보낼 수 없습니다.")
		}
	}
	return (
		<div className="bg-orange-400 hover:bg-orange-500 transition duration-200 p-2 px-6 rounded-full mt-4 text-white">
			<button onClick={resend}>인증 메일 다시 보내기</button>
		</div>
	)
}
