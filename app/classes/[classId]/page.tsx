"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import pb from "@/lib/pocketbase"
import { TrashIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export default function ClassDetail() {
	const params = useParams()
	const router = useRouter()
	const [classInfo, setClassInfo] = useState<any>()
	const [classNotes, setClassNotes] = useState<any[]>()

	function getDate(isoDate: string) {
		const date = new Date(isoDate)
		return new Intl.DateTimeFormat("ko-KR").format(date)
	}

	async function unregisterClass() {
		let students = classInfo.students
		let leftStudents = students.filter((e: any) => {
			return e !== pb.authStore.model?.id
		})
		const result = await pb.collection("classes").update(params.classId, { students: leftStudents })
		if (result) {
			router.push("/classes")
		} else {
			alert("error")
		}
	}

	useEffect(() => {
		async function getClassDetail() {
			const record = await pb.collection("classes").getOne(params.classId, { expand: "teacher" })

			setClassInfo(record)
			const notes = await pb
				.collection("notes")
				.getFullList({ filter: `class.id="${record.id}"`, expand: "receiver, read" })
			setClassNotes(notes)
		}
		getClassDetail()
	}, [params.classId])

	return (
		<div className="flex flex-col">
			<div className="mt-2">
				<div className="text-xl font-bold">
					{classInfo?.title} {classInfo?.pac}팩
				</div>
				<div className="mt-2 text-md font-semibold">
					{classInfo?.year}년 {classInfo?.semister}학기
				</div>
				<div className="mt-2 text-md font-semibold">{classInfo?.expand?.teacher?.name} 선생님</div>
				<div className="my-4 font-semibold text-lg">받은 쪽지</div>

				<div className="grid grid-cols-1 gap-2 w-full ">
					{classNotes?.map((data, key) => (
						<Link
							href={`/notes/${data.id}`}
							key={key}
							className="flex justify-between items-center bg-white rounded-lg p-3"
						>
							<div className="text-base font-semibold mx-2">{data.title}</div>

							<div className="flex flex-col items-end text-sm">
								<div>{getDate(data.created)}</div>
							</div>
						</Link>
					))}
					{classNotes?.length === 0 ? <div className="mx-auto">받은 쪽지가 없습니다.</div> : ""}
				</div>
			</div>
			<button onClick={unregisterClass} className="text-sm mt-16 text-slate-600">
				교과목 나가기
			</button>
		</div>
	)
}
