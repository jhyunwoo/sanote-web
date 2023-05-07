"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import pb from "@/lib/pocketbase"

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
			if (classList.includes(note.expand.read[i].id)) {
				readList.push(note.expand.read[i])
			}
		}
		return readList ? readList.length : 0
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
		<div>
			<div>Class Detail Page</div>
			<div>
				<div>
					{classInfo?.year}년 {classInfo?.semister}학기
				</div>
				<div>{classInfo?.title}</div>
				<div>{classInfo?.pac}팩</div>
				<div>
					{classInfo?.expand?.students?.map((data: any, key: number) => (
						<div key={key} className="flex">
							<div>{data.name}</div>
							<div>{data.studentId ? data.studentId : ""}</div>
							<button onClick={() => deleteStudent(data.id)}>삭제</button>
						</div>
					))}
				</div>
				<div>쪽지</div>
				<div>
					{classNotes?.map((data, key) => (
						<div key={key}>
							<div>{data.title}</div>
							<div>{data.content}</div>
							<div>
								읽은 사람: {getReadList(data)}/{classInfo.students?.length}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
