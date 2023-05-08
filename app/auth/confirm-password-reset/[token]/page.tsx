"use client"

import pb from "@/lib/pocketbase"
import { useParams, useRouter } from "next/navigation"
import { useForm, SubmitHandler } from "react-hook-form"

type PasswordType = {
	password: string
	passwordConfirm: string
}

export default function ChangePassword() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PasswordType>()

	const router = useRouter()
	const param = useParams()

	const onSubmit: SubmitHandler<PasswordType> = async (data) => {
		if (data.password === data.passwordConfirm) {
			const record = await pb
				.collection("users")
				.confirmPasswordReset(param?.token, data.password, data.passwordConfirm)
			console.log(record)
		}
	}

	return (
		<div className="w-full min-h-screen bg-slate-50 p-4 pt-16 flex flex-col">
			<div className="text-lg font-semibold mb-4">비밀번호 변경</div>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
				<div className="text-base font-semibold mt-2 mb-1">새 비밀번호</div>
				<input
					className="outline-none ring-1 ring-orange-300 hover:ring-offset-1 transition duration-200 p-1 px-2 rounded-lg my-1"
					type="password"
					{...register("password", { required: { value: true, message: "새 비밀번호를 입력하세요." } })}
				/>
				{errors.password && <span>{errors.password.message}</span>}
				<div className="text-base font-semibold mt-2 mb-1">새 비밀번호 확인</div>
				<input
					className="outline-none ring-1 ring-orange-300 hover:ring-offset-1 transition duration-200 p-1 px-2 rounded-lg my-1"
					type="password"
					{...register("passwordConfirm", { required: { value: true, message: "새 비밀번호 확인을 입력하세요." } })}
				/>
				{errors.passwordConfirm && <span>{errors.passwordConfirm.message}</span>}
				<button
					type="submit"
					className=" my-2 bg-orange-400 hover:bg-orange-300 p-1 px-2 rounded-full text-white font-semibold transition duration-200"
				>
					비밀번호 변경
				</button>
			</form>
		</div>
	)
}
