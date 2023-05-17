"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"
import pb from "@/lib/pocketbase"
import { useSetRecoilState } from "recoil"
import { loading, userInfo } from "@/lib/recoil"
import Link from "next/link"

type Inputs = {
	email: string
	password: string
	passwordConfirm: string
	name: string
	studentId: number
	year: number
	class: number
	privacy: boolean
}

export default function SignUpInputArea() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()
	const router = useRouter()
	const setUser = useSetRecoilState(userInfo)
	const setIsLoading = useSetRecoilState(loading)
	const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
		if (data.password === data.passwordConfirm) {
			setIsLoading(true)
			const checkStudentId = await pb.collection("users").getFullList({ filter: `studentId="${data.studentId}"` })
			if (checkStudentId.length === 0) {
				const userData = {
					email: data.email,
					emailVisibility: true,
					password: data.password,
					passwordConfirm: data.passwordConfirm,
					name: data.name,
					type: "student",
					studentId: Number(data.studentId),
					year: Number(data.year),
					class: Number(data.class),
				}
				const record = await pb.collection("users").create(userData)
				if (record?.id) {
					setUser({
						id: record.id,
						username: record.username,
						email: record.email,
						name: record.name,
						avatar: record.avatar,
						type: record.type,
						studentId: record.studentId,
						year: record.year,
						class: record.class,
						department: record.department,
						valid: record.valid,
					})
					await pb.collection("users").requestVerification(data.email)
					router.replace("/auth/confirm-verification")
				} else {
					console.log("error")
				}
			} else {
				alert("이미 등록한 학번입니다.")
			}
			setIsLoading(false)
		} else {
			alert("비밀번호가 일치하지 않습니다.")
		}
	}

	return (
		<div className="w-full">
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
				<div className="text-base font-semibold mt-2 mb-1">이메일</div>
				<input
					type="email"
					{...register("email", {
						required: { value: true, message: "이메일을 입력해주세요" },
					})}
					className="ring-2 ring-orange-400 hover:ring-offset-1 transition duration-200 p-1 px-2 rounded-lg mt-1 mb-2 outline-none"
				/>
				{errors.email && <span className="text-sm text-red-400">{errors.email.message}</span>}
				<div className="text-base font-semibold mt-2 mb-1">비밀번호</div>
				<input
					type="password"
					{...register("password", {
						required: { value: true, message: "비밀번호를 입력해주세요." },
						minLength: {
							value: 8,
							message: "비밀번호는 8자리 이상으로 설정해야합니다.",
						},
					})}
					className="ring-2 ring-orange-400 hover:ring-offset-1 transition duration-200 p-1 px-2 rounded-lg mt-1 mb-2 outline-none"
				/>
				{errors.password && <span className="text-sm text-red-400">{errors.password.message}</span>}
				<div className="text-base font-semibold mt-2 mb-1">비밀번호 확인</div>
				<input
					type="password"
					{...register("passwordConfirm", {
						required: { value: true, message: "비밀번호를 입력해주세요." },
						minLength: {
							value: 8,
							message: "비밀번호는 8자리 이상으로 설정해야합니다.",
						},
					})}
					className="ring-2 ring-orange-400 hover:ring-offset-1 transition duration-200 p-1 px-2 rounded-lg mt-1 mb-2 outline-none"
				/>
				{errors.passwordConfirm && <span className="text-sm text-red-400">{errors.passwordConfirm.message}</span>}
				<div className="text-base font-semibold mt-2 mb-1">이름</div>
				<input
					{...register("name", {
						required: { value: true, message: "이름을 입력해주세요." },
					})}
					className="ring-2 ring-orange-400 hover:ring-offset-1 transition duration-200 p-1 px-2 rounded-lg mt-1 mb-2 outline-none"
				/>
				{errors.name && <span className="text-sm text-red-400">{errors.name.message}</span>}

				<div className="text-base font-semibold mt-2 mb-1">학번 (6자리)</div>
				<input
					type="number"
					{...register("studentId", {
						required: { value: true, message: "학번을 입력해주세요." },
					})}
					className="ring-2 ring-orange-400 hover:ring-offset-1 transition duration-200 p-1 px-2 rounded-lg mt-1 mb-2 outline-none"
				/>
				{errors.studentId && <span className="text-sm text-red-400">{errors.studentId.message}</span>}
				<div className="text-base font-semibold mt-2 mb-1">학년</div>
				<select {...register("year")} className="outline-none p-2 rounded-lg focus:ring-2 ring-orange-400">
					<option className="p-1 rounded-lg" value={1}>
						1학년
					</option>
					<option className="p-1 rounded-lg" value={2}>
						2학년
					</option>
					<option className="p-1 rounded-lg" value={3}>
						3학년
					</option>
				</select>
				<div className="text-base font-semibold mt-2 mb-1">반</div>
				<select {...register("class")} className="outline-none p-2 rounded-lg focus:ring-2 ring-orange-400">
					<option className="p-1 rounded-lg" value={1}>
						1반
					</option>
					<option className="p-1 rounded-lg" value={2}>
						2반
					</option>
					<option className="p-1 rounded-lg" value={3}>
						3반
					</option>
					<option className="p-1 rounded-lg" value={4}>
						4반
					</option>
					<option className="p-1 rounded-lg" value={5}>
						5반
					</option>
					<option className="p-1 rounded-lg" value={6}>
						6반
					</option>
					<option className="p-1 rounded-lg" value={7}>
						7반
					</option>
					<option className="p-1 rounded-lg" value={8}>
						8반
					</option>
					<option className="p-1 rounded-lg" value={9}>
						9반
					</option>
					<option className="p-1 rounded-lg" value={10}>
						10반
					</option>
					<option className="p-1 rounded-lg" value={11}>
						11반
					</option>
					<option className="p-1 rounded-lg" value={12}>
						12반
					</option>
				</select>
				<div className="text-base font-semibold mt-2">서비스 이용 약관</div>
				<Link href={"/privacy"} className="text-orange-500">
					약관 보기
				</Link>
				<div className="flex space-x-1">
					<input
						type="checkbox"
						{...register("privacy", { required: { value: true, message: "약관에 동의해야합니다." } })}
					/>
					<div>동의</div>
				</div>
				{errors.privacy && <span className="text-sm text-red-400">{errors.privacy.message}</span>}

				<button
					type="submit"
					className="bg-orange-400 p-2 text-white hover:bg-orange-500 transition duration-200 rounded-full mt-4"
				>
					회원가입
				</button>
			</form>
		</div>
	)
}
