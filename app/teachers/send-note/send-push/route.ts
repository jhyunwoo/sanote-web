import { NextResponse } from "next/server"
import webPush from "web-push"

export async function POST(request: Request) {
	if (
		!process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY ||
		!process.env.WEB_PUSH_EMAIL ||
		!process.env.WEB_PUSH_PRIVATE_KEY
	) {
		throw new Error("Environment variables supplied not sufficient.")
	}
	webPush.setVapidDetails(
		`mailto:${process.env.WEB_PUSH_EMAIL}`,
		process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
		process.env.WEB_PUSH_PRIVATE_KEY,
	)
	webPush.setGCMAPIKey("1073585647206")
	const requestData = await request.json()
	for (let i = 0; i < requestData?.users?.length; i++) {
		webPush
			.sendNotification(
				{
					endpoint: requestData.users[i].endpoint,
					keys: {
						p256dh: requestData.users[i].p256dh,
						auth: requestData.users[i].auth,
					},
				},

				JSON.stringify({
					title: requestData.note.title,
					message: requestData.note.content,
					tag: "message-tag",
				}),
			)
			.catch((e) => console.log(e))
	}

	return NextResponse.json({ status: "Good" })
}
