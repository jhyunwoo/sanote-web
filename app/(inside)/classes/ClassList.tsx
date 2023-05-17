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
				filter: `students~"${pb.authStore.model?.id}"&&year="${year}"&&semister="${semister}"`,
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
					{date.getFullYear() - 1}
				</button>
				<button
					className={`${year === date.getFullYear() ? "bg-orange-300 text-white" : ""} p-1 px-4 rounded-full`}
					onClick={() => setYear(date.getFullYear())}
				>
					{date.getFullYear()}
				</button>
				<button
					className={`${year === date.getFullYear() + 1 ? "bg-orange-300 text-white" : ""} p-1 px-4 rounded-full`}
					onClick={() => setYear(date.getFullYear() + 1)}
				>
					{date.getFullYear() + 1}
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
				{classList.length === 0 && <div className="text-center">수업이 없습니다.</div>}
				{classList.map((data, key) => (
					<Link
						href={`/classes/${data.id}`}
						key={key}
						className="flex flex-col justify-between bg-white p-4 rounded-xl hover:bg-slate-100 transition duration-200"
					>
						<div className="flex space-x-2 text-lg">
							<div className="font-semibold">{data.title}</div>
							<div className="font-semibold">{data.pac} PAC</div>
						</div>
						<div className="ml-auto">{data?.students?.length}명</div>
					</Link>
				))}
			</div>
		</div>
	)
}
