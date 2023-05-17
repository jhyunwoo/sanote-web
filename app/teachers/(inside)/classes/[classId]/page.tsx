"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import pb from "@/lib/pocketbase"

import { TrashIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export default function ClassDetail() {
	const params = useParams()
	const [classInfo, setClassInfo] = useState<any>()
	const [classNotes, setClassNotes] = useState<any[]>()

	async function deleteStudent(studentId: string) {
		let studentList = classInfo.expand?.students
		let leftStudents = studentList.filter((e: any) => {
			return e.id !== studentId
		})
		const data = {
			students: leftStudents.map((data: any) => data.id),
		}
		setClassInfo((prevData: any) => ({
			...prevData,
			expand: {
				students: leftStudents,
			},
		}))

		const record = await pb.collection("classes").update(params.classId, data)
	}

	function getReadList(note: any) {
		let classList = classInfo.expand?.students?.map((data: any) => data.id)
		let readList = []
		for (let i = 0; i < note.expand?.read?.length; i++) {
			if (classList?.includes(note.expand.read[i].id)) {
				readList.push(note.expand.read[i])
			}
		}
		return readList ? readList.length : 0
	}
	function getDate(isoDate: string) {
		const date = new Date(isoDate)
		return new Intl.DateTimeFormat("ko-KR").format(date)
	}

	useEffect(() => {
		async function getClassDetail() {
			const record = await pb.collection("classes").getOne(params.classId, { expand: "students" })

			setClassInfo(record)
			const notes = await pb
				.collection("notes")
				.getFullList({ filter: `class.id="${record.id}"`, expand: "receiver, read" })
			setClassNotes(notes)
		}
		getClassDetail()
	}, [params.classId])

	return (
		<div className="w-full flex flex-col">
			<div className="mt-2">
				<div className="text-xl font-bold">
					{classInfo?.title} {classInfo?.pac}팩
				</div>
				<div className="mt-2 text-md font-semibold">
					{classInfo?.year}년 {classInfo?.semister}학기
				</div>
				<div className="my-4 font-semibold text-lg">보낸 쪽지</div>

				<div className="grid grid-cols-1 gap-2 w-full ">
					{classNotes?.map((data, key) => (
						<Link
							href={`/teachers/notes/${data.id}`}
							key={key}
							className="flex justify-between items-center bg-white rounded-lg p-3"
						>
							<div className="text-base font-semibold mx-2">{data.title}</div>

							<div className="flex flex-col items-end text-sm">
								<div>{getDate(data.created)}</div>
								<div>
									{getReadList(data)}/{classInfo.students?.length}
								</div>
							</div>
						</Link>
					))}
				</div>
				<div className="my-4 font-semibold text-lg">학생</div>
				<div className="rounded-xl flex flex-col">
					{classInfo?.expand?.students?.map((data: any, key: number) => (
						<div key={key} className="flex justify-between font-base bg-white p-3 rounded-xl">
							<div>
								<div>{data.studentId ? data.studentId : ""}</div>
								<div>{data.name}</div>
							</div>
							<button onClick={() => deleteStudent(data.id)}>
								<TrashIcon className="w-6 h-6 bg-red-500 hover:bg-red-600 transition duration-200 text-white p-1 rounded-lg" />
							</button>
						</div>
					))}
					{classInfo?.expand?.students ? "" : <div className="mx-auto font-medium">학생이 없습니다.</div>}
				</div>
			</div>
		</div>
	)
}
