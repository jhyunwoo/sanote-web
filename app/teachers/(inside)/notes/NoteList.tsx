"use client"

import { useEffect, useState } from "react"
import pb from "@/lib/pocketbase"
import Link from "next/link"
import { useRecoilValue } from "recoil"
import { userInfo } from "@/lib/recoil"
import { useRouter } from "next/navigation"

export default function NoteList() {
	const [notes, setNotes] = useState<any[]>()
	function getDate(isoDate: string) {
		const date = new Date(isoDate)
		return new Intl.DateTimeFormat("ko-KR").format(date)
	}

	const router = useRouter()
	const user = useRecoilValue(userInfo)

	useEffect(() => {
		async function checkPush() {
			if (window.localStorage.getItem("pushInfo") !== "true" && pb.authStore.model?.id) {
				router.push("/teachers/setup")
			}
		}
		async function getNotes() {
			const records = await pb.collection("notes").getFullList({
				filter: `receiver~"${pb.authStore.model?.id}"`,
				expand: "sender",
				sort: "-created",
			})
			setNotes(records)
		}
		getNotes()
		checkPush()
	}, [router])

	return (
		<div className="w-full">
			<div className="grid grid-cols-1 gap-3">
				{notes?.length === 0 && <div className="mx-auto mt-12 text-slate-600">아직 받은 쪽지가 없습니다.</div>}
				{notes?.map((data, key) => (
					<Link
						href={`/teachers/notes/${data.id}`}
						key={key}
						className={`${
							data.read.includes(user.id) ? "bg-slate-100 hover:bg-slate-200" : "bg-white hover:bg-orange-50"
						} p-3 rounded-xl flex justify-between items-center transition duration-200 relative shadow-sm`}
					>
						{data.read.includes(user.id) ? (
							""
						) : (
							<div className="bg-orange-400 animate-ping w-2 h-2 rounded-full absolute right-0 top-0"></div>
						)}
						<div className="font-bold text-md">{data.title}</div>
						<div className="flex flex-col items-end text-sm">
							<div>{getDate(data.created)}</div>
							<div>{data.expand?.sender?.name}</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
