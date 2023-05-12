"use client"

import pb from "@/lib/pocketbase"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function NoteList() {
	const [notes, setNotes] = useState<any[]>()

	function getDate(isoDate: string) {
		if (isoDate) {
			const date = new Date(isoDate)
			return new Intl.DateTimeFormat("ko-KR").format(date)
		}
	}

	useEffect(() => {
		async function getNotes() {
			const resultList = await pb.collection("notes").getList(1, 50, { expand: "sender", sort: "-created" })
			console.log(resultList)
			setNotes(resultList?.items)
		}
		getNotes()
	}, [])

	return (
		<div className="grid grid-cols-1 gap-2">
			{notes?.map((data, key) => (
				<Link
					href={`/notes/${data.id}`}
					key={key}
					className="flex justify-between items-center p-2 px-4 rounded-lg bg-white"
				>
					<div className="font-semibold">{data.title}</div>
					<div className="flex flex-col items-end">
						<div>{data.expand?.sender?.name}</div>
						<div>{getDate(data.created)}</div>
					</div>
				</Link>
			))}
		</div>
	)
}
