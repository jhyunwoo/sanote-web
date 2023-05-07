"use client"

import pb from "@/lib/pocketbase"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function NoteDetail() {
	const param = useParams()
	const [note, setNote] = useState<any>()
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
		<div className="w-full min-h-screen bg-orange-50/50 p-4 pt-16 flex flex-col">
			<div className="flex justify-between items-center w-full py-4">
				<div className="text-xl font-bold"> {note?.title}</div>
				<div>
					{note?.expand?.sender?.department} {note?.expand?.sender?.name}
				</div>
			</div>
			<div className="mt-4 font-medium text-base bg-white p-4 rounded-xl">{note?.content}</div>
		</div>
	)
}
