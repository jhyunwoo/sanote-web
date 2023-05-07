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
		<div>
			<div>Note Detail</div>
			<div>제목: {note?.title}</div>
			<div>내용: {note?.content}</div>
			<div>
				보낸 사람: {note?.expand?.sender?.department} {note?.expand?.sender?.name}
			</div>
		</div>
	)
}
