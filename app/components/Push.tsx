"use client"

import pb from "@/lib/pocketbase"
import { BellIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

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
				window.localStorage.setItem("pushInfo", "true")
				console.log("push new")
			} catch (e) {
				window.localStorage.setItem("pushInfo", "true")
				console.log("push old")
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
	if (Notification !== undefined) {
		return (
			<div className="w-full">
				{Notification?.permission !== "granted" ? (
					<button
						onClick={register}
						className="p-1 bg-orange-400 hover:bg-orange-500 transition duration-200 text-white flex items-center justify-center rounded-full mt-2 px-4 mx-auto"
					>
						<BellIcon className="w-6 h-6" />
						<div className="font-semibold">알림 등록</div>
					</button>
				) : (
					""
				)}
			</div>
		)
	} else {
		return <div></div>
	}
}
