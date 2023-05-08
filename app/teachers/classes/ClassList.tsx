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
		<div className="w-full">
			<div className=" flex justify-start space-x-2 p-2">
				<button
					className={`${year === date.getFullYear() - 1 ? "bg-orange-300 text-white" : ""} p-1 px-4 rounded-full`}
					onClick={() => setYear(date.getFullYear() - 1)}
				>
					{date.getFullYear() - 1}년
				</button>
				<button
					className={`${year === date.getFullYear() ? "bg-orange-300 text-white" : ""} p-1 px-4 rounded-full`}
					onClick={() => setYear(date.getFullYear())}
				>
					{date.getFullYear()}년
				</button>
				<button
					className={`${year === date.getFullYear() + 1 ? "bg-orange-300 text-white" : ""} p-1 px-4 rounded-full`}
					onClick={() => setYear(date.getFullYear() + 1)}
				>
					{date.getFullYear() + 1}년
				</button>
			</div>
			<div className="flex justify-start space-x-2 p-2">
				<button
					className={`${semister === 1 ? "bg-orange-300 text-white" : ""} p-1 px-4 rounded-full`}
					onClick={() => setSemister(1)}
				>
					1학기
				</button>
				<button
					className={`${semister === 2 ? "bg-orange-300 text-white" : ""} p-1 px-4 rounded-full`}
					onClick={() => setSemister(2)}
				>
					2학기
				</button>
			</div>
			<div className="grid grid-cols-1 gap-3 mt-4">
				{classList.map((data, key) => (
					<Link href={`/teachers/classes/${data.id}`} key={key} className="flex justify-between  p-3 rounded-lg">
						<div className="flex space-x-2">
							<div className="font-semibold">{data.title}</div>
							<div className="font-semibold">{data.pac}팩</div>
						</div>
						<div>{data?.students?.length}명</div>
					</Link>
				))}
			</div>
		</div>
	)
}
