"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useRecoilState } from "recoil"
import pb from "@/lib/pocketbase"
import { userInfo } from "@/lib/recoil"

type Inputs = {
	email: string
	password: string
}

export default function SignInInputArea() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()
	const router = useRouter()
	const [user, setUser] = useRecoilState(userInfo)

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const authData = await pb.collection("users").authWithPassword(data.email, data.password)
		if (authData?.token) {
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
			router.replace("/")
		} else {
			alert("login error")
		}
	}

	return (
		<div className="w-full flex flex-col">
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
				<div className="text-base font-semibold">이메일</div>
				<input
					type="email"
					{...register("email", {
						required: { value: true, message: "이메일을 입력해주세요" },
					})}
					className="ring-2 ring-orange-400 hover:ring-offset-1 transition duration-200 p-1 px-2 rounded-lg mt-1 mb-2 outline-none"
				/>
				<div className="text-base font-semibold">비밀번호</div>
				<input
					type="password"
					{...register("password", {
						required: { value: true, message: "비밀번호를 입력해주세요." },
					})}
					className="ring-2 ring-orange-400 hover:ring-offset-1 transition duration-200 p-1 px-2 rounded-lg mt-1 mb-2 outline-none"
				/>
				{errors.password && <span>{errors.password.message}</span>}

				<button
					type="submit"
					className="bg-orange-400 p-2 text-white hover:bg-orange-500 transition duration-200 rounded-full mt-4"
				>
					로그인
				</button>
			</form>
		</div>
	)
}
