"use client"

import pb from "@/lib/pocketbase"

export default function Push() {
	async function pushInfo(subscription: PushSubscription) {
		if (pb.authStore.model?.id) {
			const jsonPushInfo = JSON.stringify(subscription)
			const pushInfo = JSON.parse(jsonPushInfo)
			const data = {
				endpoint: pushInfo.endpoint,
				expirationTime: pushInfo.expirationTime,
				auth: pushInfo.keys.auth,
				p256dh: pushInfo.keys.p256dh,
				user: pb.authStore.model.id,
			}

			try {
				await pb.collection("pushInfos").create(data)
			} catch (e) {
				alert("이미 등록되었습니다.")
			}
		}
	}

	function register() {
		navigator.serviceWorker.ready.then((registration) => {
			registration.pushManager.getSubscription().then(async (subscription) => {
				if (subscription) {
					pushInfo(subscription)
				} else {
					registration.pushManager
						.subscribe({
							userVisibleOnly: true,
							applicationServerKey:
								"BCVNyyitZCQORywJsVmjfM4nd1Ptr4t9wbiYS4oUADsw79qKnL7mzezHbgQLXqnBbICpL8ayuLO5WH2wDwyXkIE",
						})
						.then(async (subscription) => {
							pushInfo(subscription)
						})
				}
			})
		})
	}
	return (
		<div className="flex flex-col">
			<button onClick={register}>Register Push</button>
		</div>
	)
}
