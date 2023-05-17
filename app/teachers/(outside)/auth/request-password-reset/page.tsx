"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import pb from "@/lib/pocketbase"
import { useRouter } from "next/navigation"

type Inputs = {
	email: string
}

export default function RequestPasswordReset() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()
	const router = useRouter()

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		await pb.collection("users").requestPasswordReset(data.email)
		router.push("/auth/confirm-password-reset")
	}

	return (
		<div className="m-auto flex flex-col justify-center items-center w-full">
			<div className="flex flex-col p-4 rounded-lg bg-white items-center w-5/6">
				<div className="text-xl font-semibold m-4">비밀번호 초기화 요청</div>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
					<div className="text-base font-semibold">이메일</div>
					<input
						type="email"
						{...register("email", { required: { value: true, message: "이메일을 입력해주세요." } })}
						className="ring-2 ring-orange-400 hover:ring-offset-1 transition duration-200 p-1 px-2 rounded-lg mt-1 mb-2 outline-none"
					/>
					{errors.email && <span className="text-red-400">{errors.email.message}</span>}
					<button
						type="submit"
						className="p-1 mx-4 bg-orange-400 hover:bg-orange-500 transition duration-200 rounded-full text-white font-semibold mt-4"
					>
						초기화 메일 요청
					</button>
				</form>
			</div>
		</div>
	)
}
