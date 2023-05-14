"use client"

import pb from "@/lib/pocketbase"
import { isNoti } from "@/lib/recoil"
import { BellIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useRecoilState } from "recoil"

export default function Push() {
	const [noti, setNoti] = useRecoilState(isNoti)
	const router = useRouter()

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
				setNoti(true)
			} catch (e) {
				window.localStorage.setItem("pushInfo", "true")
				console.log("push old")
				setNoti(true)
			}
		}
	}

	function register() {
		navigator.serviceWorker.ready.then((registration) => {
			registration.pushManager.getSubscription().then(async (subscription) => {
				console.log(subscription)
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
	useEffect(() => {
		if ("standalone" in window.navigator) {
			try {
				if (Notification?.permission === "granted") {
					setNoti(true)
				} else {
					setNoti(false)
				}
			} catch {
				setNoti(false)
			}
		} else {
			const agent = navigator.userAgent.toLowerCase()
			console.log(agent)
			if (agent.includes("iphone") || agent.includes("ipad") || agent.includes("ipod") || agent.includes("macintosh")) {
				window.localStorage.setItem("pushInfo", "true")
				router.push("/notes")
			} else {
				try {
					if (Notification?.permission === "granted") {
						setNoti(true)
					} else {
						setNoti(false)
					}
				} catch {
					setNoti(false)
				}
			}
		}
	}, [router, setNoti])

	return (
		<div className="w-full">
			{!noti ? (
				<button
					onClick={register}
					className="p-1 bg-orange-400 hover:bg-orange-500 transition duration-200 text-white flex items-center justify-center rounded-full mt-2 mx-auto w-full"
				>
					<BellIcon className="w-6 h-6" />
					<div className="font-semibold">알림 등록</div>
				</button>
			) : (
				""
			)}
		</div>
	)
}
