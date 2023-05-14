"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import pb from "@/lib/pocketbase"
import { useEffect, useState } from "react"
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline"

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
	const [addedClasss, setAddedClasss] = useState<string[]>([])

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const classList = await pb
			.collection("classes")
			.getFullList({ filter: `title~"${data.search}"&&year="${year}"&&semister="${semister}"`, expand: "teacher" })
		setClassList(classList)
	}

	async function registerClass(classId: string, studentsList: string[]) {
		let stuList = studentsList
		const userId = pb.authStore.model?.id
		if (userId) {
			if (stuList.includes(userId)) {
				alert("이미 등록된 수업입니다.")
			} else {
				stuList.push(userId)
				const record = await pb.collection("classes").update(classId, { students: stuList })
				console.log(record)
				setAddedClasss([...addedClasss, classId])
			}
		}
	}

	useEffect(() => {
		async function getAllClasses() {
			const records = await pb
				.collection("classes")
				.getFullList({ expand: "teacher", filter: `semister="${semister}"&&year="${year}"` })
			setClassList(records)
		}
		getAllClasses()
	}, [semister, year])

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
			<form onSubmit={handleSubmit(onSubmit)} className="w-full flex justify-center items-center">
				<input
					className="p-2 outline-none rounded-lg w-5/6 ring-1 focus:ring-offset-1 ring-orange-400"
					{...register("search")}
				/>
				<button type={"submit"} className="w-1/6 flex justify-center items-center">
					<MagnifyingGlassCircleIcon className="w-8 h-8 text-orange-600" />
				</button>
			</form>
			<div className="grid grid-cols-1 gap-2 mt-4">
				{classList.map((data, key) => (
					<div key={key} className="flex flex-col bg-white p-4 rounded-lg justify-between items-start shadow-md">
						<div className="flex flex-col">
							<div className="flex space-x-3 ">
								<div className="text-sm text-slate-700">
									{data.year}년 {data.semister}학기 {data.expand?.teacher?.name} 선생님
								</div>
							</div>
							<div className="flex space-x-3 font-semibold my-2 text-lg">
								<div>
									{data.title} {data.pac}PAC
								</div>
							</div>
						</div>
						<div className="flex flex-col space-x-2 w-full items-center">
							{!data.students.includes(pb.authStore.model?.id) && !addedClasss.includes(data.id) ? (
								<button
									onClick={() => registerClass(data.id, data.students)}
									className="bg-orange-400 w-full text-white p-1 rounded-full hover:bg-orange-500 transition duration-200"
								>
									등록
								</button>
							) : (
								<div className="bg-slate-400 w-full text-center text-white p-1 rounded-full">등록됨</div>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
