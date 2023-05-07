import { NextResponse } from "next/server"
import webPush from "web-push"

export async function POST(request: Request) {
	webPush.setVapidDetails(
		`mailto:jhyunwoo0228@gmail.com`,
		"BCVNyyitZCQORywJsVmjfM4nd1Ptr4t9wbiYS4oUADsw79qKnL7mzezHbgQLXqnBbICpL8ayuLO5WH2wDwyXkIE",
		"eHZEE5_HN6ccCv2xUotmnkMmjmMZNEUjviHvB3exLyQ",
	)
	webPush.setGCMAPIKey("1073585647206")
	const requestData = await request.json()
	let result = []
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
		result.push(requestData.users[i].id)
	}

	return NextResponse.json({ status: result })
}
