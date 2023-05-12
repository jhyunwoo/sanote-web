"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import pb from "@/lib/pocketbase"
import { useEffect, useState } from "react"

type Inputs = {
	search: string
}
type YearType = number | null
type SemisterType = number | null

export default function AddClass() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()
	function getCurrentSemister() {
		if (date.getMonth() > 6) {
			return 2
		} else {
			return 1
		}
	}
	const date = new Date()
	const [classList, setClassList] = useState<any[]>([])
	const [year, setYear] = useState<YearType>(date.getFullYear())
	const [semister, setSemister] = useState<SemisterType>(getCurrentSemister())

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		console.log(data)
	}

	useEffect(() => {
		async function getAllClasses() {
			const records = await pb.collection("classes").getList(1, 50)
			console.log(records)
			setClassList(records?.items)
		}
		getAllClasses()
	}, [])

	return (
		<div className={"w-full min-h-screen flex flex-col"}>
			<div className="flex justify-start space-x-2 p-2">
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
			<form onSubmit={handleSubmit(onSubmit)}>
				<input {...register("search")} />
				<button type={"submit"}>검색</button>
			</form>
		</div>
	)
}
