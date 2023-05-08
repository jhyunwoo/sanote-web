"use client"

import pb from "@/lib/pocketbase"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function NoteDetail() {
	const param = useParams()
	const [note, setNote] = useState<any>()

	function getDate(isoDate: string) {
		if (isoDate) {
			const date = new Date(isoDate)
			return new Intl.DateTimeFormat("ko-KR").format(date)
		}
	}

	useEffect(() => {
		async function getNoteInfo() {
			const record = await pb.collection("notes").getOne(param.noteId, { expand: "sender" })
			setNote(record)
			let readList = record.read
			if (!readList.includes(pb.authStore.model?.id)) {
				readList.push(pb.authStore.model?.id)
			}
			const update = await pb.collection("notes").update(record.id, { read: readList })
		}
		getNoteInfo()
	}, [param.noteId])

	return (
		<div className="w-full min-h-screen  p-4 pt-16 flex flex-col">
			<div className="flex flex-col  w-full py-4">
				<div className="text-xl font-bold"> {note?.title}</div>
				<div className="ml-auto">{getDate(note?.created)}</div>
				<div className="ml-auto">
					{note?.expand?.sender?.department} {note?.expand?.sender?.name}
				</div>
			</div>
			<div className="mt-4 font-medium text-base  p-4 rounded-xl bg-white ">{note?.content}</div>
		</div>
	)
}
