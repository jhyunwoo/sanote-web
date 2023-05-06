"use client"

import pb from "@/lib/pocketbase"

export default function ResendVerification() {
	async function resend() {
		await pb.collection("users").requestVerification(pb?.authStore?.model?.email)
	}
	return (
		<div>
			<button onClick={resend}>Resend Verification</button>
		</div>
	)
}
