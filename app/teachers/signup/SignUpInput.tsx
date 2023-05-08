"use client"

import { useRouter } from "next/navigation"
import { useForm, SubmitHandler } from "react-hook-form"
import pb from "@/lib/pocketbase"

type Inputs = {
	email: string
	password: string
	passwordConfirm: string
	name: string
	department: string
}

export default function SignUpInput() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()
	const router = useRouter()

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const userData = {
			email: data.email,
			emailVisibility: true,
			password: data.password,
			passwordConfirm: data.passwordConfirm,
			name: data.name,
			type: "student",
			department: data.department,
		}

		const record = await pb.collection("users").create(userData)
		if (record.id) {
			await pb.collection("users").requestVerification(data.email)
			router.push("/auth/confirm-verification")
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>이메일</div>
				<input
					type="email"
					{...register("email", {
						required: { value: true, message: "이메일을 입력해주세요." },
					})}
				/>
				{errors.email && <span>{errors.email.message}</span>}
				<div>비밀번호</div>
				<input
					type="password"
					{...register("password", {
						required: { value: true, message: "비밀번호를 입력해주세요." },
					})}
				/>
				{errors.password && <span>{errors.password.message}</span>}
				<div>비밀번호 확인</div>
				<input
					type="password"
					{...register("passwordConfirm", {
						required: { value: true, message: "비밀번호를 입력해주세요." },
					})}
				/>
				{errors.passwordConfirm && <span>{errors.passwordConfirm.message}</span>}
				<div>이름</div>
				<input
					{...register("name", {
						required: { value: true, message: "이름을 입력해주세요." },
					})}
				/>
				{errors.name && <span>{errors.name.message}</span>}
				<div>학과</div>
				<input
					{...register("department", {
						required: { value: true, message: "학과를 입력해주세요." },
					})}
				/>
				{errors.department && <span>{errors.department.message}</span>}

				<button type="submit">회원가입</button>
			</form>
		</div>
	)
}
