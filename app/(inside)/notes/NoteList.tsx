"use client"

import pb from "@/lib/pocketbase"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { userInfo } from "@/lib/recoil"
import { useRouter } from "next/navigation"
import { useForm, SubmitHandler } from "react-hook-form"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

type Inputs = {
	search: string
}

export default function NoteList() {
	const [notes, setNotes] = useState<any[]>()
	const [search, setSearch] = useState<string>()

	const user = useRecoilValue(userInfo)
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
		setSearch(data.search)
	}

	function getDate(isoDate: string) {
		if (isoDate) {
			const date = new Date(isoDate)
			return new Intl.DateTimeFormat("ko-KR").format(date)
		}
	}

	useEffect(() => {
		async function checkPush() {
			if (window.localStorage.getItem("pushInfo") !== "true" && pb.authStore.model?.id) {
				router.push("/setup")
			}
		}

		checkPush()
	}, [router])

	useEffect(() => {
		async function getNotes() {
			if (!search) {
				const resultList = await pb
					.collection("notes")
					.getList(1, 50, { expand: "sender", sort: "-created", filter: `receiver~"${pb.authStore.model?.id}"` })
				setNotes(resultList?.items)
			} else {
				const resultList = await pb.collection("notes").getList(1, 50, {
					expand: "sender",
					sort: "-created",
					filter: `receiver~"${pb.authStore.model?.id}"&&(title~"${search}"||content~"${search}")`,
				})
				setNotes(resultList?.items)
			}
		}
		getNotes()
	}, [search])

	return (
		<div>
			<div>
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
			</div>
			<div className="grid grid-cols-1 gap-2">
				{notes?.length === 0 && <div className="mx-auto mt-12 text-slate-600">아직 받은 쪽지가 없습니다.</div>}
				{notes?.map((data, key) => (
					<Link
						href={`/notes/${data.id}`}
						key={key}
						className={`${
							data.read.includes(user.id) ? "bg-slate-100 hover:bg-slate-200" : "bg-white hover:bg-orange-50"
						} p-3 rounded-xl flex justify-between items-center transition duration-200 relative shadow-sm`}
					>
						{data.read.includes(user.id) ? (
							""
						) : (
							<div className="bg-orange-400 animate-ping w-2 h-2 rounded-full absolute right-0 top-0"></div>
						)}
						<div className="font-bold text-md">{data.title}</div>
						<div className="flex flex-col items-end text-sm">
							<div>{getDate(data.created)}</div>
							<div>{data.expand?.sender?.name}</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
