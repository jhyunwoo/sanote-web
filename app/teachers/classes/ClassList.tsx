"use client"

import pb from "@/lib/pocketbase"
import Link from "next/link"
import { useEffect, useState } from "react"

type YearType = number | null
type SemisterType = number | null

export default function ClassList() {
	const date = new Date()
	const [classList, setClassList] = useState<any[]>([])
	const [year, setYear] = useState<YearType>(date.getFullYear())
	const [semister, setSemister] = useState<SemisterType>(getCurrentSemister())

	function getCurrentSemister() {
		if (date.getMonth() > 6) {
			return 2
		} else {
			return 1
		}
	}

	useEffect(() => {
		async function getFullClassList() {
			const records = await pb.collection("classes").getFullList({
				filter: `teacher.id="${pb.authStore.model?.id}"&&year="${year}"&&semister="${semister}"`,
			})
			setClassList(records)
		}
		getFullClassList()
	}, [year, semister])

	return (
		<div>
			<div>
				<div>
					<button onClick={() => setYear(date.getFullYear() - 1)}>{date.getFullYear() - 1}년</button>
					<button onClick={() => setYear(date.getFullYear())}>{date.getFullYear()}년</button>
					<button onClick={() => setYear(date.getFullYear() + 1)}>{date.getFullYear() + 1}년</button>
				</div>
				<div>
					<button onClick={() => setSemister(1)}>1학기</button>
					<button onClick={() => setSemister(2)}>2학기</button>
				</div>
				{classList.map((data, key) => (
					<Link href={`/teachers/classes/${data.id}`} key={key} className="flex">
						<div>{data.title}</div>
						<div>{data.pac}팩</div>
						<div>
							{data.year}년 {data.semister}학기
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
