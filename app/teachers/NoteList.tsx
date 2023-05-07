"use client"

import { useEffect, useState } from "react"
import pb from "@/lib/pocketbase"
import Link from "next/link"

export default function NoteList() {
	const [notes, setNotes] = useState<any[]>()
	useEffect(() => {
		async function getNotes() {
			const records = await pb.collection("notes").getFullList({
				filter: `receiver~"${pb.authStore.model?.id}"`,
			})
			setNotes(records)
		}
		getNotes()
	}, [])
	return (
		<div>
			<div>
				{notes?.map((data, key) => (
					<Link href={`/teachers/notes/${data.id}`} key={key}>
						<div>{data.title}</div>
						<div>{data.content}</div>
					</Link>
				))}
			</div>
		</div>
	)
}
