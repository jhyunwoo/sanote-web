"use client"

import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { useRecoilState, useSetRecoilState } from "recoil"
import pb from "@/lib/pocketbase"
import { loading, userInfo } from "@/lib/recoil"
import { useEffect, useState } from "react"
import Loading from "@/app/components/Loading"

type Inputs = {
	email: string
	password: string
}

export default function SignInInput() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()
	const router = useRouter()
	const setUser = useSetRecoilState(userInfo)
	const [isLoading, setIsLoading] = useRecoilState(loading)
	const [error, setError] = useState("")

	const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
		setIsLoading(true)

		try {
			const authData = await pb.collection("users").authWithPassword(data.email, data.password)
			if (authData.token) {
				setUser({
					id: authData.record.id,
					username: authData.record.username,
					email: authData.record.email,
					name: authData.record.name,
					avatar: authData.record.avatar,
					type: authData.record.type,
					studentId: authData.record.studentId,
					year: authData.record.year,
					class: authData.record.class,
					department: authData.record.department,
					valid: authData.record.valid,
				})
				router.replace("/teachers")
			}
		} catch {
			setError("이메일 또는 비밀번호가 일치하지 않습니다.")
		}
		setIsLoading(false)
	}

	return (
		<div className="w-5/6 flex flex-col items-center bg-white p-4  rounded-xl shadow-xl">
			{isLoading ? <Loading /> : ""}
			<div className="text-xl font-bold m-4">로그인</div>
			<form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
				<div className="font-semibold text-base">이메일</div>
				<input
					type="email"
					{...register("email", {
						required: {
							value: true,
							message: "이메일을 입력해주세요.",
						},
					})}
					className="outline-none ring-1 ring-orange-300 hover:ring-offset-1 transition duration-200 p-1 px-2 rounded-lg my-1"
				/>
				{errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
				<div className="font-semibold text-base">비밀번호</div>
				<input
					type="password"
					{...register("password", {
						required: {
							value: true,
							message: "비밀번호를 입력해주세요.",
						},
					})}
					className="outline-none ring-1 ring-orange-300 hover:ring-offset-1 transition duration-200 p-1 px-2 rounded-lg my-1"
				/>
				{errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
				<div className="text-sm text-red-500">{error}</div>
				<button
					type="submit"
					className=" my-2 bg-orange-400 hover:bg-orange-300 p-1 px-2 rounded-full text-white font-semibold transition duration-200"
				>
					로그인
				</button>
			</form>
		</div>
	)
}
