"use client"

import pb from "@/lib/pocketbase"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { userInfo } from "@/lib/recoil"

export default function NoteList() {
	const [notes, setNotes] = useState<any[]>()

	const user = useRecoilValue(userInfo)

	function getDate(isoDate: string) {
		if (isoDate) {
			const date = new Date(isoDate)
			return new Intl.DateTimeFormat("ko-KR").format(date)
		}
	}

	useEffect(() => {
		async function getNotes() {
			const resultList = await pb
				.collection("notes")
				.getList(1, 50, { expand: "sender", sort: "-created", filter: `receiver~"${pb.authStore.model?.id}"` })
			setNotes(resultList?.items)
		}
		getNotes()
	}, [])

	return (
		<div className="grid grid-cols-1 gap-2">
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
	)
}
