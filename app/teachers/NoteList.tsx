"use client"

import { useEffect, useState } from "react"
import pb from "@/lib/pocketbase"
import Link from "next/link"
import { useRecoilValue } from "recoil"
import { userInfo } from "@/lib/recoil"

export default function NoteList() {
	const [notes, setNotes] = useState<any[]>()
	function getDate(isoDate: string) {
		const date = new Date(isoDate)
		return new Intl.DateTimeFormat("ko-KR").format(date)
	}

	const user = useRecoilValue(userInfo)

	useEffect(() => {
		async function getNotes() {
			const records = await pb.collection("notes").getFullList({
				filter: `receiver~"${pb.authStore.model?.id}"`,
				expand: "sender",
				sort: "-created",
			})
			setNotes(records)
		}
		getNotes()
	}, [])

	return (
		<div className="w-full">
			<div className="grid grid-cols-1 gap-3">
				{notes?.map((data, key) => (
					<Link
						href={`/teachers/notes/${data.id}`}
						key={key}
						className={`${
							data.read.includes(user.id) ? "bg-orange-100" : "bg-white"
						} p-4 rounded-lg flex justify-between items-center`}
					>
						<div className="font-bold text-md">{data.title}</div>
						<div className="flex space-x-2">
							<div>{getDate(data.created)}</div>
							<div>{data.expand?.sender?.name}</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
