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
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
				<div>email</div>
				<input
					type="email"
					{...register("email", {
						required: { value: true, message: "이메일을 입력해주세요" },
					})}
				/>
				<div>password</div>
				<input
					type="password"
					{...register("password", {
						required: { value: true, message: "비밀번호를 입력해주세요." },
					})}
				/>
				{errors.password && <span>{errors.password.message}</span>}

				<button type="submit">로그인</button>
			</form>
		</div>
	)
}
