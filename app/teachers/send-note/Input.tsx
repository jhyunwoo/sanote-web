"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import axios from "axios"
import pb from "@/lib/pocketbase"
import { useRouter } from "next/navigation"
import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/outline"

type Inputs = {
	search: string
}

type NoteType = {
	title: string
	content: string
}

type SearchResultType = {
	users: any[]
	classes: any[]
}

export default function Input() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const {
		register: register2,
		handleSubmit: handleSubmit2,
		formState: { errors: errors2 },
	} = useForm<NoteType>()

	const router = useRouter()

	const [searchResult, setSearchResult] = useState<SearchResultType>({
		users: [],
		classes: [],
	})

	const [receiver, setReceiver] = useState<any[]>([])
	const [receiveClass, setReceiveClass] = useState<any[]>([])

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const users = await pb.collection("users").getFullList({
			filter: `name~"${data.search}" || studentId="${data.search}"`,
			expand: "pushInfos(user)",
		})
		const classes = await pb.collection("classes").getFullList({
			filter: `title~"${data.search}"`,
			expand: "students.pushInfos(user)",
		})
		const results = {
			users,
			classes,
		}
		setSearchResult(results)
	}

	const onSubmitNote: SubmitHandler<NoteType> = async (data) => {
		if (receiver?.length > 0 || receiveClass?.length > 0) {
			let pushInfos: any[] = []
			for (let i = 0; i < receiver?.length; i++) {
				for (let j = 0; j < receiver[i].expand["pushInfos(user)"]?.length; j++) {
					pushInfos.push(receiver[i].expand["pushInfos(user)"][j])
				}
			}
			for (let k = 0; k < receiveClass?.length; k++) {
				for (let l = 0; l < receiveClass[k]?.expand?.students?.length; l++) {
					for (let m = 0; m < receiveClass[k]?.expand?.students[l]?.expand["pushInfos(user)"]?.length; m++) {
						if (
							pushInfos.filter((e) => {
								return e.endpoint === receiveClass[k]?.expand?.students[l]?.expand["pushInfos(user)"][m].endpoint
							}).length < 1
						)
							pushInfos.push(receiveClass[k]?.expand?.students[l]?.expand["pushInfos(user)"][m])
					}
				}
			}
			let receiverInfo = []
			console.log(receiver, receiveClass)
			for (let n = 0; n < receiver?.length; n++) {
				receiverInfo.push(receiver[n].id)
			}

			for (let o = 0; o < receiveClass?.length; o++) {
				for (let p = 0; p < receiveClass[o].expand.students?.length; p++) {
					if (
						receiverInfo.filter((e) => {
							return e === receiveClass[o]?.expand?.students[p].id
						}).length < 1
					)
						receiverInfo.push(receiveClass[o]?.expand?.students[p].id)
				}
			}

			let classIds = []
			for (let q = 0; q < receiveClass?.length; q++) {
				classIds.push(receiveClass[q].id)
			}

			const noteData = {
				title: data.title,
				content: data.content,
				sender: pb.authStore.model?.id,
				receiver: receiverInfo,
				class: classIds,
			}

			const record = await pb.collection("notes").create(noteData)
			console.log(record)
			const result = await axios.post("/teachers/send-note/send-push", {
				note: data,
				users: pushInfos,
			})
			console.log(result)
			router.push("/teachers")
		}
	}

	function addReceiver(data: any) {
		if (!receiver.includes(data)) {
			setReceiver([...receiver, data])
		}
	}

	function addReceiverClass(data: any) {
		if (!receiveClass.includes(data)) {
			setReceiveClass([...receiveClass, data])
		}
	}

	function deleteReceiver(data: any) {
		const list = receiver
		const filtered = list.filter((element) => element !== data)
		setReceiver(filtered)
	}

	function deleteReceiverClass(data: any) {
		const list = receiveClass
		const filtered = list.filter((element) => element !== data)
		setReceiveClass(filtered)
	}

	return (
		<div className="w-full flex flex-col">
			<form onSubmit={handleSubmit(onSubmit)} className="flex my-2 space-x-2">
				<input
					{...register("search")}
					className=" p-2 px-4 rounded-full ring-2 ring-orange-400 outline-none focus:ring-offset-1 transition duration-200"
				/>
				<button type="submit" className="bg-orange-400 rounded-full p-2">
					<MagnifyingGlassIcon className="w-6 h-6 text-white" />
				</button>
			</form>

			<div className=" grid grid-cols-1 gap-2 p-2 rounded-lg">
				{searchResult.classes?.map((data, key) => (
					<button onClick={() => addReceiverClass(data)} key={key} className="flex space-x-2">
						<div>{data.title}</div>
						<div>{data.pac}팩</div>
						<div>
							{data.year}년 {data.semister}학기
						</div>
					</button>
				))}
				{searchResult.users?.map((data, key) => (
					<button onClick={() => addReceiver(data)} key={key} className="flex items-center w-full ">
						{data.type === "student" ? (
							<div className="flex space-x-1">
								<div>{data.studentId ? data.studentId : ""}</div>
								<div>{data.name}</div>
							</div>
						) : (
							<div className="flex space-x-1">
								<div>
									{data.department} {data.name} 선생님
								</div>
							</div>
						)}
					</button>
				))}
			</div>
			<div className="text-lg font-semibold mt-4">수신자</div>
			<div className=" w-full p-2">
				<div className="grid grid-cols-1">
					{receiver.map((data, key) => (
						<div key={key} className="flex justify-between my-1 items-center border-b-2">
							{data.type === "student" ? (
								<div className="flex space-x-1">
									<div>{data.studentId ? data.studentId : ""}</div>
									<div>{data.name}</div>
								</div>
							) : (
								<div className="flex space-x-1">
									<div>
										{data.department} {data.name} 선생님
									</div>
								</div>
							)}
							<button onClick={() => deleteReceiver(data)}>
								<TrashIcon className="w-6 h-6 p-1 rounded-lg bg-red-500 text-white" />
							</button>
						</div>
					))}
					{receiveClass.map((data, key) => (
						<div key={key} className="flex justify-between my-1 items-center border-b-2">
							<div className="flex space-x-2">
								<div>{data.title}</div>
								<div>{data.pac}팩</div>
								<div>
									{data.year}년 {data.semister}학기
								</div>
							</div>
							<button onClick={() => deleteReceiverClass(data)}>
								<TrashIcon className="w-6 h-6 p-1 rounded-lg bg-red-500 text-white" />
							</button>
						</div>
					))}
				</div>
			</div>
			<div className="mt-8 flex  w-full ">
				<form onSubmit={handleSubmit2(onSubmitNote)} className="flex flex-col  w-full">
					<div className="font-semibold text-lg">제목</div>
					<input
						{...register2("title", {
							required: {
								value: true,
								message: "제목을 입력하세요.",
							},
						})}
						className="p-2  rounded-lg outline-none"
					/>
					{errors2?.title ? <p>{errors2.title.message}</p> : ""}
					<div className="font-semibold text-lg mt-4">내용</div>
					<textarea
						{...register2("content", {
							required: {
								value: true,
								message: "내용을 입력하세요.",
							},
						})}
						className="p-2 h-40 rounded-lg outline-none"
					/>
					{errors2?.content ? <p>{errors2.content.message}</p> : ""}
					<button
						className="bg-orange-400 p-2 px-6 rounded-full text-white font-semibold mt-8 hover:0 transition duration-200"
						type="submit"
					>
						보내기
					</button>
				</form>
			</div>
		</div>
	)
}
