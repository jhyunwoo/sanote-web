"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import axios from "axios"
import pb from "@/lib/pocketbase"
import { useRouter } from "next/navigation"
import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/outline"
import { loading } from "@/lib/recoil"
import { useSetRecoilState } from "recoil"

type Inputs = {
	search: string
}

type NoteType = {
	title: string
	content: string
}

type SearchResultType = {
	users: any[]
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
	})

	const [receiver, setReceiver] = useState<any[]>([])

	const setIsLoading = useSetRecoilState(loading)

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const users = await pb.collection("users").getFullList({
			filter: `name~"${data.search}" || studentId="${data.search}"`,
			expand: "pushInfos(user)",
		})

		const results = {
			users,
		}
		setSearchResult(results)
	}

	const onSubmitNote: SubmitHandler<NoteType> = async (data) => {
		setIsLoading(true)
		if (receiver?.length > 0) {
			let pushInfos: any[] = []
			for (let i = 0; i < receiver?.length; i++) {
				for (let j = 0; j < receiver[i].expand["pushInfos(user)"]?.length; j++) {
					pushInfos.push(receiver[i].expand["pushInfos(user)"][j])
				}
			}

			let receiverInfo = []
			for (let n = 0; n < receiver?.length; n++) {
				receiverInfo.push(receiver[n].id)
			}

			const noteData = {
				title: data.title,
				content: data.content,
				sender: pb.authStore.model?.id,
				receiver: receiverInfo,
			}

			const record = await pb.collection("notes").create(noteData)
			const result = await axios.post("/teachers/send-note/send-push", {
				note: data,
				users: pushInfos,
			})
			router.push("/notes")
		}
		setIsLoading(false)
	}

	function addReceiver(data: any) {
		if (!receiver.includes(data)) {
			setReceiver([...receiver, data])
		}
	}

	function deleteReceiver(data: any) {
		const list = receiver
		const filtered = list.filter((element) => element !== data)
		setReceiver(filtered)
	}

	return (
		<div className="w-full flex flex-col">
			<form onSubmit={handleSubmit(onSubmit)} className="flex my-2 space-x-2 w-full justify-between">
				<input
					{...register("search")}
					className=" p-2 px-4 rounded-full ring-2 ring-orange-400 outline-none focus:ring-offset-1 transition duration-200 w-5/6"
				/>
				<button
					type="submit"
					className="bg-orange-400 rounded-full p-2 w-1/6 justify-center items-center flex hover:bg-orange-500 transition duration-200"
				>
					<MagnifyingGlassIcon className="w-6 h-6 text-white" />
				</button>
			</form>

			<div className=" grid grid-cols-1 gap-2 p-2 rounded-lg">
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
					{receiver.length === 0 ? <div className="mx-auto">아직 수신자가 없습니다.</div> : ""}
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
